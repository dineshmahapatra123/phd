#!/usr/bin/env python3
"""Codex helper runner for the PhD vault.

This script wraps existing vault scripts without changing their behavior.
"""

from __future__ import annotations

import argparse
import os
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]

PATHS = {
    "raw": ROOT / "7 - Raw",
    "paper_notes": ROOT / "2 - Notes" / "Papers",
    "kb": ROOT / "9 - Knowledge_base",
    "sources": ROOT / "9 - Knowledge_base" / "sources",
    "concepts": ROOT / "9 - Knowledge_base" / "Concepts",
    "people": ROOT / "9 - Knowledge_base" / "People",
    "methods": ROOT / "9 - Knowledge_base" / "Methods",
    "topics": ROOT / "9 - Knowledge_base" / "Topics",
    "comparisons": ROOT / "9 - Knowledge_base" / "Comparisons",
    "queries": ROOT / "9 - Knowledge_base" / "Queries",
    "writings": ROOT / "6 - Writings",
    "scripts": ROOT / "scripts",
    "codex_scripts": ROOT / ".codex-phd" / "scripts",
    "venv_bin": ROOT / ".venv" / "bin",
    "odl_venv_bin": Path("/Users/dineshmahapatra/Downloads/Dinesh/Code/Knowledge_Repo/.venv-odl/bin"),
    "java_home": Path("/opt/homebrew/opt/openjdk@21"),
    "rough_annots": ROOT / "1 - Rough" / "Handy_notes_02",
}

PHD_NOTEBOOK_ID = "f802377d-2963-487f-8b74-5286f629eb91"


def run_existing(script_name: str) -> int:
    script = PATHS["scripts"] / script_name
    if not script.exists():
        print(f"Missing script: {script}", file=sys.stderr)
        return 1
    cmd = [sys.executable, str(script)]
    print("$ " + " ".join(cmd), flush=True)
    return subprocess.call(cmd, cwd=str(ROOT))


def run_with_venv(script: Path, args: list[str]) -> int:
    python = PATHS["venv_bin"] / "python"
    if not python.exists():
        print(f"Missing PhD .venv Python: {python}", file=sys.stderr)
        return 1
    if not script.exists():
        print(f"Missing script: {script}", file=sys.stderr)
        return 1
    cmd = [str(python), str(script), *args]
    print("$ " + " ".join(cmd), flush=True)
    return subprocess.call(cmd, cwd=str(ROOT))


def run_with_odl_venv(script: Path, args: list[str]) -> int:
    python = PATHS["odl_venv_bin"] / "python"
    if not python.exists():
        print(f"Missing OpenDataLoader .venv Python: {python}", file=sys.stderr)
        return 1
    if not script.exists():
        print(f"Missing script: {script}", file=sys.stderr)
        return 1
    env = dict(os.environ)
    env["JAVA_HOME"] = str(PATHS["java_home"])
    env["PATH"] = f"{PATHS['java_home'] / 'bin'}:{env.get('PATH', '')}"
    cmd = [str(python), str(script), *args]
    print("$ " + " ".join(cmd), flush=True)
    return subprocess.call(cmd, cwd=str(ROOT), env=env)


def run_notebooklm(args: list[str]) -> int:
    notebooklm = PATHS["venv_bin"] / "notebooklm"
    if not notebooklm.exists():
        print(f"Missing NotebookLM CLI: {notebooklm}", file=sys.stderr)
        print("Expected notebooklm-py to be installed in the PhD .venv.", file=sys.stderr)
        return 1
    cmd = [str(notebooklm), *args]
    print("$ " + " ".join(cmd), flush=True)
    return subprocess.call(cmd, cwd=str(ROOT))


def count_files(path: Path, pattern: str = "*") -> int:
    if not path.exists():
        return 0
    return sum(1 for p in path.glob(pattern) if p.is_file())


def cmd_status() -> int:
    print(f"Root: {ROOT}")
    print()
    print("Vault counts:")
    print(f"- Raw PDFs: {count_files(PATHS['raw'], '*.pdf')}")
    print(f"- Paper notes: {count_files(PATHS['paper_notes'], '*.md')}")
    print(f"- Knowledge base notes: {count_files(PATHS['kb'].resolve(), '**/*.md')}")
    print(f"- Sources: {count_files(PATHS['sources'], '*.md')}")
    print(f"- Concepts: {count_files(PATHS['concepts'], '*.md')}")
    print(f"- People: {count_files(PATHS['people'], '*.md')}")
    print(f"- Methods: {count_files(PATHS['methods'], '*.md')}")
    print(f"- Topics: {count_files(PATHS['topics'], '*.md')}")
    print(f"- Comparisons: {count_files(PATHS['comparisons'], '*.md')}")
    print(f"- Queries: {count_files(PATHS['queries'], '*.md')}")
    print(f"- Writing drafts: {count_files(PATHS['writings'], '*.md')}")
    return 0


def cmd_paths() -> int:
    print(f"root: {ROOT}")
    for name, path in PATHS.items():
        print(f"{name}: {path}")
    return 0


def cmd_notebooklm_status() -> int:
    return run_notebooklm(["status"])


def cmd_notebooklm_sources() -> int:
    return run_notebooklm(["source", "list", "-n", PHD_NOTEBOOK_ID])


def cmd_notebooklm_ask(question: str, json_output: bool = False) -> int:
    args = ["ask", "-n", PHD_NOTEBOOK_ID]
    if json_output:
        args.append("--json")
    args.append(question)
    return run_notebooklm(args)


def cmd_annots(pdf: str, output: str | None = None) -> int:
    args = [pdf]
    if output:
        args.extend(["--output", output])
    return run_with_venv(PATHS["scripts"] / "annots.py", args)


def cmd_pdf2md(
    input_path: str,
    output: str | None = None,
    fmt: str = "markdown",
    hybrid: str = "off",
    include_header_footer: bool = False,
) -> int:
    output_dir = output or str(PATHS["sources"])
    args = [
        "--input",
        input_path,
        "--output",
        output_dir,
        "--format",
        fmt,
        "--hybrid",
        hybrid,
    ]
    if include_header_footer:
        args.append("--include-header-footer")
    return run_with_odl_venv(PATHS["codex_scripts"] / "pdf2md_convert.py", args)


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Codex helper runner for the PhD vault")
    sub = parser.add_subparsers(dest="command", required=True)
    sub.add_parser("status", help="Print vault counts")
    sub.add_parser("paths", help="Print canonical vault paths")
    sub.add_parser("scaffold", help="Run scripts/scaffold.py")
    sub.add_parser("sync-bib", help="Run scripts/citation_spider.py")
    sub.add_parser("lint-wiki", help="Run scripts/lint_wiki.py")
    pdf2md = sub.add_parser("pdf2md", help="Convert PDF(s) to Markdown in 9 - Knowledge_base/sources")
    pdf2md.add_argument("input", help="Path to a PDF file or folder of PDFs")
    pdf2md.add_argument("--output", "-o", help="Output directory")
    pdf2md.add_argument("--format", "-f", default="markdown", help="Output format(s), comma-separated")
    pdf2md.add_argument("--hybrid", choices=["off", "docling-fast"], default="off")
    pdf2md.add_argument("--include-header-footer", action="store_true")
    annots = sub.add_parser("annots", help="Extract embedded PDF annotations to Markdown")
    annots.add_argument("pdf", help="Path to annotated PDF")
    annots.add_argument("--output", "-o", help="Output Markdown file")
    sub.add_parser("notebooklm-status", help="Show current NotebookLM context")
    sub.add_parser("notebooklm-sources", help="List sources in the PhD_Papers NotebookLM notebook")
    ask = sub.add_parser("notebooklm-ask", help="Ask the PhD_Papers NotebookLM notebook a question")
    ask.add_argument("question", help="Question to ask NotebookLM")
    ask.add_argument("--json", action="store_true", help="Return structured NotebookLM output with references")
    args = parser.parse_args(argv)

    if args.command == "status":
        return cmd_status()
    if args.command == "paths":
        return cmd_paths()
    if args.command == "scaffold":
        return run_existing("scaffold.py")
    if args.command == "sync-bib":
        return run_existing("citation_spider.py")
    if args.command == "lint-wiki":
        return run_existing("lint_wiki.py")
    if args.command == "pdf2md":
        return cmd_pdf2md(
            args.input,
            output=args.output,
            fmt=args.format,
            hybrid=args.hybrid,
            include_header_footer=args.include_header_footer,
        )
    if args.command == "annots":
        return cmd_annots(args.pdf, output=args.output)
    if args.command == "notebooklm-status":
        return cmd_notebooklm_status()
    if args.command == "notebooklm-sources":
        return cmd_notebooklm_sources()
    if args.command == "notebooklm-ask":
        return cmd_notebooklm_ask(args.question, json_output=args.json)

    parser.error(f"Unknown command: {args.command}")
    return 2


if __name__ == "__main__":
    raise SystemExit(main())

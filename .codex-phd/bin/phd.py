#!/usr/bin/env python3
"""Codex helper runner for the PhD vault.

This script wraps existing vault scripts without changing their behavior.
"""

from __future__ import annotations

import argparse
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
}


def run_existing(script_name: str) -> int:
    script = PATHS["scripts"] / script_name
    if not script.exists():
        print(f"Missing script: {script}", file=sys.stderr)
        return 1
    cmd = [sys.executable, str(script)]
    print("$ " + " ".join(cmd))
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


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Codex helper runner for the PhD vault")
    sub = parser.add_subparsers(dest="command", required=True)
    sub.add_parser("status", help="Print vault counts")
    sub.add_parser("paths", help="Print canonical vault paths")
    sub.add_parser("scaffold", help="Run scripts/scaffold.py")
    sub.add_parser("sync-bib", help="Run scripts/citation_spider.py")
    sub.add_parser("lint-wiki", help="Run scripts/lint_wiki.py")
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

    parser.error(f"Unknown command: {args.command}")
    return 2


if __name__ == "__main__":
    raise SystemExit(main())

#!/usr/bin/env python3
"""
PDF to Markdown converter — part of the pdf-to-markdown skill.
Uses opendataloader-pdf to convert PDFs to Markdown/JSON/HTML locally on CPU.

Usage:
    python3 convert.py --input <path> [--output <dir>] [--format markdown,json]

Requires:
    - Java 21+ on PATH (JAVA_HOME=/opt/homebrew/opt/openjdk@21)
    - opendataloader-pdf installed in the active venv
"""

import argparse
import os
import sys
import time
from pathlib import Path


def resolve_output_dir(input_path: str, output_arg: str | None) -> str:
    """Determine output directory. Default: <input_parent>/output/"""
    if output_arg:
        return output_arg
    p = Path(input_path)
    if p.is_dir():
        return str(p / "output")
    return str(p.parent / "output")


def gather_inputs(input_path: str) -> list[str]:
    """Expand folder to list of PDF paths, or return single path."""
    p = Path(input_path)
    if p.is_dir():
        pdfs = sorted(p.glob("**/*.pdf"))
        if not pdfs:
            print(f"[!] No PDF files found in folder: {input_path}", file=sys.stderr)
            sys.exit(1)
        return [str(f) for f in pdfs]
    if not p.exists():
        print(f"[!] File not found: {input_path}", file=sys.stderr)
        sys.exit(1)
    if not p.suffix.lower() == ".pdf":
        print(f"[!] Not a PDF file: {input_path}", file=sys.stderr)
        sys.exit(1)
    return [str(p)]


def main():
    print("[*] Script started")
    parser = argparse.ArgumentParser(
        description="Convert PDF(s) to Markdown/JSON/HTML using opendataloader-pdf"
    )
    parser.add_argument(
        "--input", "-i", required=True,
        help="Path to a PDF file or a folder containing PDFs"
    )
    parser.add_argument(
        "--output", "-o", default=None,
        help="Output directory (default: <input_dir>/output/)"
    )
    parser.add_argument(
        "--format", "-f", default="markdown",
        help="Output format(s), comma-separated: markdown,json,html (default: markdown)"
    )
    args = parser.parse_args()

    # Resolve paths
    input_path = os.path.expanduser(args.input)
    output_dir = os.path.expanduser(resolve_output_dir(input_path, args.output))
    fmt = args.format.strip()

    # Gather input files
    inputs = gather_inputs(input_path)
    print(f"[✓] Found {len(inputs)} PDF(s) to convert")
    for f in inputs:
        print(f"    • {f}")
    print(f"[→] Output directory : {output_dir}")
    print(f"[→] Format(s)        : {fmt}")
    print()

    # Create output dir
    os.makedirs(output_dir, exist_ok=True)

    # Import and run conversion
    try:
        import opendataloader_pdf
    except ImportError:
        print(
            "[!] opendataloader-pdf not found.\n"
            "    Activate the venv first:\n"
            "    source /Users/dineshmahapatra/Downloads/Dinesh/Code/Knowledge_Repo/.venv-odl/bin/activate",
            file=sys.stderr
        )
        sys.exit(1)

    print(f"[*] Starting conversion of {len(inputs)} files...")
    start = time.time()
    try:
        opendataloader_pdf.convert(
            input_path=inputs,      # Batch everything in one call (avoids repeated JVM spawning)
            output_dir=output_dir,
            format=fmt,
        )
    except Exception as e:
        print(f"[!] Error during conversion: {e}")
        raise
    elapsed = time.time() - start
    print(f"[*] Conversion call finished in {elapsed:.2f}s")

    # Report results
    print()
    print(f"[✓] Conversion complete in {elapsed:.2f}s")
    print(f"[✓] Output saved to: {output_dir}")
    print()

    # Show generated files
    output_files = sorted(Path(output_dir).glob("*"))
    if output_files:
        print("Generated files:")
        for f in output_files:
            size_kb = f.stat().st_size / 1024
            print(f"  {f.name}  ({size_kb:.1f} KB)")

    # Preview first markdown file
    md_files = [f for f in output_files if f.suffix == ".md"]
    if md_files:
        print()
        print(f"── Preview: {md_files[0].name} (first 30 lines) ──")
        with open(md_files[0]) as fp:
            lines = fp.readlines()
        print("".join(lines[:30]))
        if len(lines) > 30:
            print(f"  ... ({len(lines) - 30} more lines)")


if __name__ == "__main__":
    main()

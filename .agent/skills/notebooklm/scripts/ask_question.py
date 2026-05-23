#!/usr/bin/env python3
"""
Question Interface Adapter for NotebookLM.
Wraps the vault-local notebooklm-py CLI execution to keep the interface
consistent with Antigravity's expected commands.
"""

import argparse
import re
import subprocess
import sys
from pathlib import Path

# Paths
SKILL_DIR = Path(__file__).resolve().parent.parent
VAULT_ROOT = Path(__file__).resolve().parents[4]
NOTEBOOKLM_CLI = VAULT_ROOT / ".venv" / "bin" / "notebooklm"

FOLLOW_UP_REMINDER = (
    "\n\nEXTREMELY IMPORTANT: Is that ALL you need to know? "
    "You can always ask another question! Think about it carefully: "
    "before you reply to the user, review their original request and this answer. "
    "If anything is still unclear or missing, ask me another comprehensive question "
    "that includes all necessary context."
)


def extract_uuid_from_url(url: str) -> str:
    """Extracts a UUID from a NotebookLM URL"""
    match = re.search(r"notebook/([a-fA-F0-9\-]{36})", url)
    if match:
        return match.group(1)
    return url


def run_cli_command(args: list[str]) -> subprocess.CompletedProcess:
    """Executes notebooklm-py CLI in the vault .venv"""
    if not NOTEBOOKLM_CLI.exists():
        print(f"❌ NotebookLM CLI not found in vault environment: {NOTEBOOKLM_CLI}", file=sys.stderr)
        print("Please ensure you have set up the PhD vault virtual environment.", file=sys.stderr)
        sys.exit(1)

    cmd = [str(NOTEBOOKLM_CLI)] + args
    return subprocess.run(cmd, cwd=str(VAULT_ROOT), capture_output=True, text=True)


def ask_notebooklm(question: str, notebook_id: str) -> str:
    """Queries NotebookLM via the direct API CLI"""
    print(f"💬 Asking: {question}")
    print(f"📚 Notebook ID: {notebook_id}")
    print("  ⏳ Querying direct API (no browser launch)...")

    # Call notebooklm ask with explicit notebook ID
    args = ["ask", "-n", notebook_id, question]
    res = run_cli_command(args)

    if res.returncode != 0:
        print(f"❌ API Query failed: {res.stderr}", file=sys.stderr)
        return ""

    answer = res.stdout.strip()
    
    # Strip any potential command prefixes like "Answer:" if notebooklm returns it
    if answer.startswith("Answer:"):
        answer = answer[7:].strip()

    return answer + FOLLOW_UP_REMINDER


def main():
    parser = argparse.ArgumentParser(description='Ask NotebookLM a question (API adapter)')

    parser.add_argument('--question', required=True, help='Question to ask')
    parser.add_argument('--notebook-url', help='NotebookLM notebook URL')
    parser.add_argument('--notebook-id', help='Notebook ID from library')
    parser.add_argument('--show-browser', action='store_true', help='Ignored for adapter')

    args = parser.parse_args()

    # Determine Notebook ID
    notebook_id = None
    if args.notebook_id:
        notebook_id = args.notebook_id
    elif args.notebook_url:
        notebook_id = extract_uuid_from_url(args.notebook_url)

    if not notebook_id:
        # Fall back to checking the active notebook context
        print("🔍 Checking current active notebook context...")
        status_res = run_cli_command(["status"])
        output = status_res.stdout + status_res.stderr
        match = re.search(r"Notebook ID\s*│\s*([a-fA-F0-9\-]+)", output)
        if not match:
            match = re.search(r"Notebook:\s+.*?\s+\(([a-fA-F0-9\-]+)\)", output)
        if match:
            notebook_id = match.group(1).strip()
            print(f"📚 Found active notebook ID: {notebook_id}")
        else:
            print("❌ No active notebook set. Please specify --notebook-id or --notebook-url.")
            sys.exit(1)

    # Ask the question
    answer = ask_notebooklm(args.question, notebook_id)

    if answer:
        print("\n" + "=" * 60)
        print(f"Question: {args.question}")
        print("=" * 60)
        print()
        print(answer)
        print()
        print("=" * 60)
        sys.exit(0)
    else:
        print("\n❌ Failed to get answer from NotebookLM API")
        sys.exit(1)


if __name__ == "__main__":
    main()

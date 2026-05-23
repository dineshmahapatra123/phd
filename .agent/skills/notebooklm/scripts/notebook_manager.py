#!/usr/bin/env python3
"""
Notebook Library Management Adapter for NotebookLM.
Wraps the vault-local notebooklm-py CLI execution to keep the interface
consistent with Antigravity's expected commands.
"""

import json
import argparse
import subprocess
import sys
from pathlib import Path
from typing import Dict, List, Optional, Any

# Paths
SKILL_DIR = Path(__file__).resolve().parent.parent
VAULT_ROOT = Path(__file__).resolve().parents[4]
NOTEBOOKLM_CLI = VAULT_ROOT / ".venv" / "bin" / "notebooklm"


def run_cli_command(args: list[str]) -> subprocess.CompletedProcess:
    """Executes notebooklm-py CLI in the vault .venv"""
    if not NOTEBOOKLM_CLI.exists():
        print(f"❌ NotebookLM CLI not found in vault environment: {NOTEBOOKLM_CLI}", file=sys.stderr)
        print("Please ensure you have set up the PhD vault virtual environment.", file=sys.stderr)
        sys.exit(1)

    cmd = [str(NOTEBOOKLM_CLI)] + args
    return subprocess.run(cmd, cwd=str(VAULT_ROOT), capture_output=True, text=True)


def get_all_notebooks() -> List[Dict[str, Any]]:
    """Fetch all notebooks programmatically via JSON"""
    res = run_cli_command(["list", "--json"])
    if res.returncode != 0:
        return []
    try:
        data = json.loads(res.stdout)
        return data.get("notebooks", [])
    except Exception:
        return []


def get_active_notebook_info() -> Optional[Dict[str, Any]]:
    """Retrieve active notebook ID from notebooklm status"""
    res = run_cli_command(["status"])
    output = res.stdout + res.stderr
    # Locate active notebook name/ID in status output
    import re
    match = re.search(r"Notebook:\s+(.*?)\s+\(([a-fA-F0-9\-]+)\)", output)
    if match:
        return {"name": match.group(1), "id": match.group(2)}
    return None


def add_notebook(name: str, url: Optional[str] = None, description: str = "", topics: str = "") -> Optional[Dict[str, Any]]:
    """Creates a notebook and optionally adds a URL source"""
    print(f"🔧 Creating new NotebookLM notebook: '{name}'...")
    res = run_cli_command(["create", name])
    if res.returncode != 0:
        print(f"❌ Failed to create notebook: {res.stderr}")
        return None

    # Retrieve all notebooks to find the created one's ID
    notebooks = get_all_notebooks()
    target = None
    for nb in notebooks:
        if nb.get("title") == name:
            target = nb
            break

    if not target and notebooks:
        # Fallback to the newest notebook
        target = notebooks[0]

    if not target:
        print("❌ Could not locate newly created notebook ID")
        return None

    notebook_id = target["id"]
    print(f"✅ Created notebook: {name} (ID: {notebook_id})")

    # If URL is passed, ingest it as a source
    if url:
        print(f"🔗 Ingesting source URL: {url}...")
        source_res = run_cli_command(["source", "add", "-n", notebook_id, url])
        if source_res.returncode == 0:
            print("✅ Source URL successfully ingested!")
        else:
            print(f"⚠️ Warning: Source ingestion returned non-zero code: {source_res.stderr}")

    return {
        "id": notebook_id,
        "url": url or "",
        "name": name,
        "description": description,
        "topics": [t.strip() for t in topics.split(",") if t.strip()] if topics else [],
        "created_at": target.get("created_at", "")
    }


def main():
    parser = argparse.ArgumentParser(description='Manage NotebookLM library (API adapter)')
    subparsers = parser.add_subparsers(dest='command', help='Commands')

    # Add command
    add_parser = subparsers.add_parser('add', help='Add/Create a notebook')
    add_parser.add_argument('--url', help='NotebookLM URL (Optional source)')
    add_parser.add_argument('--name', required=True, help='Display name')
    add_parser.add_argument('--description', default="", help='Description (adapter metadata)')
    add_parser.add_argument('--topics', default="", help='Comma-separated topics (adapter metadata)')
    add_parser.add_argument('--use-cases', help='Ignored for adapter')
    add_parser.add_argument('--tags', help='Ignored for adapter')

    # List command
    subparsers.add_parser('list', help='List all notebooks')

    # Search command
    search_parser = subparsers.add_parser('search', help='Search notebooks')
    search_parser.add_argument('--query', required=True, help='Search query')

    # Activate command
    activate_parser = subparsers.add_parser('activate', help='Set active notebook')
    activate_parser.add_argument('--id', required=True, help='Notebook ID or Name')

    # Remove command
    remove_parser = subparsers.add_parser('remove', help='Remove/Delete a notebook')
    remove_parser.add_argument('--id', required=True, help='Notebook ID')

    # Stats command
    subparsers.add_parser('stats', help='Show library statistics')

    args = parser.parse_args()

    if args.command == 'add':
        notebook = add_notebook(
            name=args.name,
            url=args.url,
            description=args.description,
            topics=args.topics
        )
        if notebook:
            print(json.dumps(notebook, indent=2))
        else:
            sys.exit(1)

    elif args.command == 'list':
        notebooks = get_all_notebooks()
        active = get_active_notebook_info()
        active_id = active["id"] if active else None

        if notebooks:
            print("\n📚 Notebook Library (via notebooklm-py API):")
            for notebook in notebooks:
                is_active = " [ACTIVE]" if notebook['id'] == active_id else ""
                print(f"\n  📓 {notebook['title']}{is_active}")
                print(f"     ID: {notebook['id']}")
                print(f"     Created: {notebook.get('created_at', 'Unknown')}")
        else:
            print("📚 No notebooks found in Google NotebookLM.")

    elif args.command == 'search':
        query_lower = args.query.lower()
        notebooks = get_all_notebooks()
        results = [nb for nb in notebooks if query_lower in nb.get("title", "").lower() or query_lower in nb.get("id", "").lower()]
        
        if results:
            print(f"\n🔍 Found {len(results)} notebooks matching query '{args.query}':")
            for notebook in results:
                print(f"  📓 {notebook['title']} ({notebook['id']})")
        else:
            print(f"🔍 No notebooks found for query: {args.query}")

    elif args.command == 'activate':
        print(f"🔄 Setting active notebook context to: {args.id}...")
        res = run_cli_command(["use", args.id])
        if res.returncode == 0:
            print(f"✅ Successfully activated notebook!")
        else:
            print(f"❌ Failed to activate notebook: {res.stderr}")
            sys.exit(1)

    elif args.command == 'remove':
        print(f"🗑️ Deleting NotebookLM notebook with ID: {args.id}...")
        res = run_cli_command(["delete", args.id])
        if res.returncode == 0:
            print("✅ Notebook successfully deleted.")
        else:
            print(f"❌ Failed to delete notebook: {res.stderr}")
            sys.exit(1)

    elif args.command == 'stats':
        notebooks = get_all_notebooks()
        active = get_active_notebook_info()
        
        print("\n📊 Library Statistics (Unified API):")
        print(f"  Total notebooks: {len(notebooks)}")
        if active:
            print(f"  Active Notebook Name: {active['name']}")
            print(f"  Active Notebook ID: {active['id']}")
        else:
            print("  Active Notebook: None")

    else:
        parser.print_help()


if __name__ == "__main__":
    main()
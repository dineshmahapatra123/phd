#!/usr/bin/env python3
"""
Authentication Manager Adapter for NotebookLM.
Wraps the vault-local notebooklm-py CLI execution to keep the interface
consistent with Antigravity's expected commands.
"""

import argparse
import subprocess
import sys
from pathlib import Path

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


def check_status() -> bool:
    """Check if the user is authenticated by querying CLI status"""
    print("\n🔍 Checking authentication status...")
    # 'notebooklm status' displays active profile and login state
    res = run_cli_command(["status"])
    
    # Check stdout and stderr for login indicators
    output = res.stdout + res.stderr
    is_logged_in = "not logged in" not in output.lower() and res.returncode == 0
    
    print("🔐 Authentication Status:")
    print(f"  Authenticated: {'Yes' if is_logged_in else 'No'}")
    if is_logged_in:
        print("  Vault profile: ~/.notebooklm/profiles/default/")
        print("  Profile state: Active")
    else:
        print("  Please run: auth_manager.py setup")
        
    return is_logged_in


def setup_auth() -> bool:
    """Trigger console login for notebooklm-py"""
    print("🔐 Starting Google Authentication for NotebookLM...")
    print("  Triggering direct API login in browser context...")
    
    # 'notebooklm login' opens a clean manual browser authentication
    cmd = [str(NOTEBOOKLM_CLI), "login"]
    result = subprocess.run(cmd, cwd=str(VAULT_ROOT))
    
    if result.returncode == 0:
        print("\n✅ Authentication completed successfully!")
        return True
    else:
        print("\n❌ Authentication failed")
        return False


def main():
    parser = argparse.ArgumentParser(description='Manage NotebookLM authentication (API adapter)')
    subparsers = parser.add_subparsers(dest='command', help='Commands')

    # Setup / reauth command
    subparsers.add_parser('setup', help='Setup authentication')
    subparsers.add_parser('reauth', help='Re-authenticate (clear + setup)')

    # Status / validate command
    subparsers.add_parser('status', help='Check authentication status')
    subparsers.add_parser('validate', help='Validate authentication')

    # Clear command
    subparsers.add_parser('clear', help='Clear authentication')

    args = parser.parse_args()

    if args.command in ('setup', 'reauth'):
        if setup_auth():
            sys.exit(0)
        sys.exit(1)

    elif args.command in ('status', 'validate'):
        if check_status():
            sys.exit(0)
        sys.exit(1)

    elif args.command == 'clear':
        print("🗑️ Clearing authentication data...")
        # 'notebooklm logout' resets local cookie profiles
        res = run_cli_command(["logout"])
        if res.returncode == 0:
            print("  ✅ Logged out successfully")
            sys.exit(0)
        else:
            print(f"  ❌ Logout returned error code {res.returncode}")
            sys.exit(1)

    else:
        parser.print_help()


if __name__ == "__main__":
    main()
#!/usr/bin/env python3
"""
Universal runner for NotebookLM skill scripts.
Redirects execution to use the vault-local virtual environment (.venv) 
where teng-lin/notebooklm-py is installed.
"""

import os
import sys
import subprocess
from pathlib import Path

# Paths
SKILL_DIR = Path(__file__).resolve().parent.parent
VAULT_ROOT = Path(__file__).resolve().parents[4]
VAULT_VENV_PYTHON = VAULT_ROOT / ".venv" / "bin" / "python"


def main():
    if len(sys.argv) < 2:
        print("Usage: python run.py <script_name> [args...]")
        print("\nAvailable scripts:")
        print("  ask_question.py     - Query NotebookLM via API")
        print("  notebook_manager.py  - Manage notebooks")
        print("  auth_manager.py      - Handle Google authentication status")
        sys.exit(1)

    script_name = sys.argv[1]
    script_args = sys.argv[2:]

    # Strip 'scripts/' prefix if provided
    if script_name.startswith('scripts/'):
        script_name = script_name[8:]

    # Ensure .py extension
    if not script_name.endswith('.py'):
        script_name += '.py'

    script_path = SKILL_DIR / "scripts" / script_name

    if not script_path.exists():
        print(f"❌ Script not found: {script_name}")
        sys.exit(1)

    # Ensure vault virtual environment Python exists
    if not VAULT_VENV_PYTHON.exists():
        print(f"❌ Vault virtual environment not found at: {VAULT_VENV_PYTHON}")
        print("Please ensure you have run setup in the PhD repository root.")
        sys.exit(1)

    # Run the script with the vault's virtual environment
    cmd = [str(VAULT_VENV_PYTHON), str(script_path)] + script_args

    try:
        result = subprocess.run(cmd, cwd=str(VAULT_ROOT))
        sys.exit(result.returncode)
    except KeyboardInterrupt:
        print("\n⚠️ Interrupted by user")
        sys.exit(130)
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
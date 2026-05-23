# Authentication Architecture (Direct API Unified Version)

## Overview

This skill uses a **direct API-driven authentication approach** powered by `teng-lin/notebooklm-py`. It does not rely on local browser engines like Playwright, Patchright, or heavy Chromium instances. 

Instead, it reads from and writes to the standard user profile directory located at:
`~/.notebooklm/profiles/default/`

## Independent Execution Guarantee

This integration is designed with a strict **anti-dependency philosophy** for Antigravity:
- **Zero dependency on Codex/`.codex-phd`**: The skill uses the repository-wide central virtual environment (`.venv/bin/notebooklm`) and the standard home directory config at `~/.notebooklm/profiles/default/`. Even if the `.codex-phd` folder is completely nuked, Antigravity will continue to operate with 100% functionality.
- **Shared Authentication**: Because it reads from `~/.notebooklm/profiles/default/`, any command run via Codex, Claude Code, or Antigravity uses the exact same session credentials. If you log in using any client, both agents are instantly authenticated.

---

## How Authentication Works

### 1. Status Checking (`auth_manager.py status`)
When checking status, the skill calls:
```bash
notebooklm status
```
This queries the Google NotebookLM servers to verify if the active profile's session token is still valid.

### 2. Manual Interactive Setup (`auth_manager.py setup`)
If not logged in, running `setup` triggers:
```bash
notebooklm login
```
This opens the standard Google Authentication page in your local default system web browser. Once authenticated, Google issues session cookies that the CLI automatically serializes and stores securely in `~/.notebooklm/profiles/default/`.

### 3. Clear/Logout (`auth_manager.py clear`)
Running `clear` triggers:
```bash
notebooklm logout
```
This clears all active session credentials stored locally in `~/.notebooklm/profiles/default/`, resetting the authentication state.

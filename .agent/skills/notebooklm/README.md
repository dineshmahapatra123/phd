# NotebookLM Antigravity Skill (Direct API Unified Version)

**Connect Antigravity directly to Google NotebookLM via the high-speed, direct API-based `teng-lin/notebooklm-py` CLI.**

This skill has been unified to run natively via the vault-local virtual environment (`.venv/bin/notebooklm`). Both Codex and Antigravity now leverage the exact same underlying API client, sharing credentials, session states, and active profile configurations.

## Architecture

Unlike the original browser-automation version, this skill runs with **zero browser overhead** at query runtime:

```
Your Query → Antigravity Skill script → Direct API call (vault .venv) → Google RPC Backend → Instant Answer
```

### Key Benefits
*   **High Performance:** Queries take seconds, not 15-20 seconds.
*   **Zero RAM Overhead:** No heavy Chrome processes spawned in the background.
*   **Robustness:** Immune to web UI class/element changes or scraper breakages.
*   **Shared State:** Shares profiles, session auth, and active notebook contexts seamlessly with Codex and Claude Code.

---

## Installation & Setup

1.  The skill resides under `.agent/skills/notebooklm/` in the PhD repository.
2.  Ensure you have completed the root setup of the PhD repository so the vault `.venv` is populated.
3.  Ensure your Google Account is logged in:
    ```bash
    python scripts/run.py auth_manager.py status
    ```
    If not logged in, run:
    ```bash
    python scripts/run.py auth_manager.py setup
    ```

---

## Commands Reference

The command interface remains identical to prevent agent confusion:

| Description | Command |
| :--- | :--- |
| **Check Authentication** | `python scripts/run.py auth_manager.py status` |
| **Google Log In** | `python scripts/run.py auth_manager.py setup` |
| **List Notebooks** | `python scripts/run.py notebook_manager.py list` |
| **Create Notebook** | `python scripts/run.py notebook_manager.py add --name "Title" [--url "Source_URL"]` |
| **Set Active Notebook** | `python scripts/run.py notebook_manager.py activate --id [notebook_id]` |
| **Query NotebookLM** | `python scripts/run.py ask_question.py --question "Your question"` |
| **Query Specific ID** | `python scripts/run.py ask_question.py --question "..." --notebook-id [notebook_id]` |

---

## Developer Notice
The Playwright/Patchright requirements and local virtual environment inside the skill folder are no longer needed. Browser authentication is delegated directly to the vault's central `notebooklm-py` package, keeping the repository clean and efficient.

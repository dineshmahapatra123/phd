# Codex PhD Helper Layer

This directory is for Codex-only helpers. It is intentionally separate from:

- `.claude/`
- `.agent/`

The goal is to let Codex reuse the existing PhD vault architecture without disturbing Claude or Antigravity.

## Files

- `../CODEX.md`: root-level Codex operating guide.
- `bin/phd.py`: small command runner for safe repeated operations.
- `workflows/`: Codex-readable versions of the current research workflows.
- `skills/phd-vault/SKILL.md`: compact skill instructions for working inside this vault.

## Rule

Existing Claude/Antigravity files are source material. Codex may read them, but should not edit them unless the user explicitly asks.


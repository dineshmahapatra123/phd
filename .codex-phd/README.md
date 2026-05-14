# Codex PhD Helper Layer

This directory is for Codex-only helpers. Codex must remain functional even if `.claude/` and `.agent/` are deleted.

## Files

- `../CODEX.md`: root-level Codex operating guide.
- `bin/phd.py`: small command runner for safe repeated operations.
- `scripts/`: Codex-owned helper scripts needed at runtime.
- `workflows/`: Codex-readable versions of the current research workflows.
- `skills/phd-vault/SKILL.md`: compact skill instructions for working inside this vault.
- `STYLE_POLICY.md`: Codex-only conflict resolver for TISS style rules.

## Codex-Only Workflow Additions

- `workflows/review-phd-lens.md`: Codex-native PhD lens review workflow. Saves to `1 - Rough/Review/Codex/`.
- `workflows/notebooklm.md`: Codex-native NotebookLM workflow using the vault `.venv` and explicit `PhD_Papers` notebook ID.
- `workflows/annots.md`: Codex-native embedded PDF annotation extraction workflow.
- `bin/phd.py notebooklm-*`: convenience wrappers around the vault-local `notebooklm-py` CLI.
- `bin/phd.py pdf2md`: conversion wrapper using `.codex-phd/scripts/pdf2md_convert.py`.
- `bin/phd.py annots`: annotation wrapper using `scripts/annots.py`.

## Rule

Do not depend on `.claude/` or `.agent/` for normal Codex operation.

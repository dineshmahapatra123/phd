# Codex Workflow: pdf2md

Purpose: convert PDFs to Markdown for downstream knowledge-base processing.

## Primary Source

Use the existing Antigravity skill:

- `.agent/skills/pdf-to-markdown/SKILL.md`
- `.agent/skills/pdf-to-markdown/scripts/convert.py`

## Notes

- Requires Java 21 and the existing `.venv-odl` environment.
- Default output is `9 - Knowledge_base/sources/`.
- For `compile-phd`, establish the permanent source under `9 - Knowledge_base/sources/`.
- *Options*: Use `--hybrid docling-fast` for technical papers (formulas/tables). Use `--include-header-footer` if page metadata is needed.

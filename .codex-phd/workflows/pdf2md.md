# Codex Workflow: pdf2md

Purpose: convert PDFs to Markdown for downstream knowledge-base processing.

## Primary Command

Use the Codex-owned helper:

```bash
python3 .codex-phd/bin/phd.py pdf2md "<input_path>"
```

This wraps:

```bash
.codex-phd/scripts/pdf2md_convert.py
```

## Notes

- Requires Java 21 and the existing OpenDataLoader `.venv-odl` environment at `/Users/dineshmahapatra/Downloads/Dinesh/Code/Knowledge_Repo/.venv-odl`.
- Default output is `9 - Knowledge_base/sources/`.
- For `compile-phd`, establish the permanent source under `9 - Knowledge_base/sources/`.
- *Options*: Use `--hybrid docling-fast` for technical papers (formulas/tables). Use `--include-header-footer` if page metadata is needed.

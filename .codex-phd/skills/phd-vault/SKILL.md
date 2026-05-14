---
name: phd-vault
description: Work safely inside this Obsidian PhD research vault using Codex-owned workflows and helpers.
---

# PhD Vault Skill for Codex

## Load Order

1. Read `CODEX.md`.
2. For knowledge-base edits, read:
   - `9 - Knowledge_base/PHD_CONSTITUTION.md`
   - `9 - Knowledge_base/PHD_SCHEMA.md`
   - `9 - Knowledge_base/PHD_LENS.md`
   - `9 - Knowledge_base/index.md`
3. For command-specific behaviour, read the matching `.codex-phd/workflows/<command>.md`.

## Core Invariants

- `9 - Knowledge_base/sources/` is immutable.
- `Concepts`, `People`, and `Methods` are atomic wiki notes.
- `PHD_LENS.md` is the mandatory relevance filter for all KB edits and thesis-review outputs.
- Contradictions are preserved, not overwritten.
- New Concepts, People, Methods, and Comparisons must be indexed.
- Queries are permanent logs but not indexed.
- Paper notes in `2 - Notes/Papers/` are the human-curated layer.
- For logging, follow `9 - Knowledge_base/PHD_CONSTITUTION.md` -> Operational Logging.

## Preferred Runner

Use this local helper for repeated operations:

```bash
python3 .codex-phd/bin/phd.py status
python3 .codex-phd/bin/phd.py scaffold
python3 .codex-phd/bin/phd.py sync-bib
python3 .codex-phd/bin/phd.py lint-wiki
python3 .codex-phd/bin/phd.py pdf2md "7 - Raw/Paper.pdf"
python3 .codex-phd/bin/phd.py annots "7 - Raw/Paper.pdf"
python3 .codex-phd/bin/phd.py notebooklm-status
python3 .codex-phd/bin/phd.py notebooklm-ask "Your question"
```

Use the vault-local NotebookLM CLI for source-grounded questions:

```bash
./.venv/bin/notebooklm ask -n f802377d-2963-487f-8b74-5286f629eb91 "Your question"
```

Prefer explicit notebook IDs so parallel agents do not clobber shared CLI context.

## Logging

When recording workflow activity, follow `9 - Knowledge_base/PHD_CONSTITUTION.md` -> Operational Logging.

## PDF Conversion

For `pdf2md`, use the Codex-owned converter:

- `.codex-phd/scripts/pdf2md_convert.py`
- `python3 .codex-phd/bin/phd.py pdf2md "7 - Raw/Paper.pdf"`
- The runner uses the OpenDataLoader `.venv-odl` environment directly, not the normal PhD `.venv`.

Output should land in `9 - Knowledge_base/sources/` unless the user specifies otherwise. For `/compile-phd`, ensure a permanent source exists in `9 - Knowledge_base/sources/`.

## PDF Annotation Extraction

For embedded PDF annotations and highlights, use:

```bash
python3 .codex-phd/bin/phd.py annots "7 - Raw/Paper.pdf"
```

This wraps `scripts/annots.py` through the vault `.venv`. It requires a matching source Markdown in `9 - Knowledge_base/sources/` for high-fidelity cleanup.

## Secret Handling

Some local notes/config files contain API keys. Do not print secrets. Prefer saying that credentials were found locally and used, if needed.

# CODEX.md

This file is the Codex-only operating guide for this PhD vault. Codex must remain usable even if `.claude/` and `.agent/` are deleted.

## First Principles

- Treat this repository as a live Obsidian PhD research vault, not a normal software project.
- Treat this file, `.codex-phd/`, `scripts/`, `Types/`, and `9 - Knowledge_base/` as sufficient Codex operating instructions.
- Read `9 - Knowledge_base/PHD_CONSTITUTION.md`, `9 - Knowledge_base/PHD_SCHEMA.md`, and `9 - Knowledge_base/PHD_LENS.md` before editing the knowledge base.
- For chapter prose, citations, bibliography formatting, and style checks, treat `9 - Knowledge_base/TISS_STYLE.md` as canonical. If any older agent memory conflicts with it, follow `TISS_STYLE.md`.
- Do not edit `.claude/` or `.agent/` unless the user explicitly asks.
- Do not edit `9 - Knowledge_base/sources/`; sources are immutable.
- Prefer appending/updating existing wiki notes over creating duplicates.
- Search `9 - Knowledge_base/index.md` before creating Concepts, People, Methods, or Comparisons.
- Apply `PHD_LENS.md` as a mandatory relevance gate before creating or updating Concepts, People, Methods, Topics, Comparisons, or review outputs.
- General research logs go in `9 - Knowledge_base/Queries/` and are not added to `index.md`.
- Deep comparative syntheses go in `9 - Knowledge_base/Comparisons/` and must be added to `index.md`.
- For logging, follow `9 - Knowledge_base/PHD_CONSTITUTION.md` -> Operational Logging.

## Codex System

Codex helper files live in:

- `.codex-phd/`

Codex must not depend on `.claude/` or `.agent/` at runtime. Those folders may exist as historical context, but Codex workflows, scripts, and command mappings must be complete inside the vault without them.

## Command Mapping

When the user says one of these, Codex should interpret it as follows:

| User phrase | Codex action |
| --- | --- |
| `scaffold` | Run `.codex-phd/bin/phd.py scaffold` |
| `sync bib`, `sync-bib` | Run `.codex-phd/bin/phd.py sync-bib` |
| `lint wiki`, `lint-wiki` | Run `.codex-phd/bin/phd.py lint-wiki`, then read `9 - Knowledge_base/lint_report.md` |
| `vault status` | Run `.codex-phd/bin/phd.py status` |
| `notebooklm status` | Run `.codex-phd/bin/phd.py notebooklm-status` |
| `notebooklm sources` | Run `.codex-phd/bin/phd.py notebooklm-sources` |
| `extract annotations <pdf>`, `annots <pdf>` | Run `.codex-phd/bin/phd.py annots "<pdf>"` |
| `prime <paper>` | Follow `.codex-phd/workflows/prime.md` |
| `compile-phd <paper/source>` | Follow `.codex-phd/workflows/compile-phd.md` |
| `refresh topic <topic>` | Follow `.codex-phd/workflows/refresh-topic.md` |
| `review`, `review-phd-lens <paper/source>` | Follow `.codex-phd/workflows/review-phd-lens.md` |
| `notebooklm`, `ask notebooklm <question>` | Run `.codex-phd/bin/phd.py notebooklm-ask "<question>"` or follow `.codex-phd/workflows/notebooklm.md` |
| `rename paper <pdf>` | Follow `.codex-phd/workflows/rename-paper.md` |
| `add zotero <paper>` | Follow `.codex-phd/workflows/add-zotero.md`; avoid exposing secrets in chat |
| `ingest paper <paper>` | Follow `.codex-phd/workflows/ingest-paper.md` |
| `pdf2md <pdf>` | Run `.codex-phd/bin/phd.py pdf2md "<pdf>"` or follow `.codex-phd/workflows/pdf2md.md` |
| `cite <source>` | Follow `.codex-phd/workflows/cite.md` |
| `style-check <passage/file>` | Follow `.codex-phd/workflows/style-check.md` |
| `bib-format <source>` | Follow `.codex-phd/workflows/bib-format.md` |

## Safety Defaults

- Ask before deleting, moving, or batch-renaming files.
- Ask before writing into `7 - Raw/` unless the user explicitly requests ingestion.
- Ask before any network operation that downloads papers or calls Zotero.
- Never print API keys, tokens, or secrets found in local notes/configs.
- Zotero API credentials may be stored in `1 - Rough/Handy notes/HN_01.md`; read them only when needed and never echo them.
- If a workflow references `7 - Papers`, use `7 - Raw/`; the actual vault folder is `7 - Raw/`.

## Logging Policy

Follow `9 - Knowledge_base/PHD_CONSTITUTION.md` -> Operational Logging. Keep `log.md` compact and put detailed provenance in `9 - Knowledge_base/logs/`.

## NotebookLM

NotebookLM is available to Codex through the vault-local `notebooklm-py` CLI installed in `.venv`.

```bash
./.venv/bin/notebooklm status
./.venv/bin/notebooklm ask -n f802377d-2963-487f-8b74-5286f629eb91 "Your question here"
python3 .codex-phd/bin/phd.py notebooklm-ask "Your question here"
```

- Active notebook: `PhD_Papers`
- Notebook ID: `f802377d-2963-487f-8b74-5286f629eb91`
- Auth storage: `~/.notebooklm/profiles/default/`
- Prefer explicit notebook IDs instead of relying on mutable CLI context.
- For ordinary NotebookLM questions, return the NotebookLM answer directly with only light formatting cleanup. Do not add Codex synthesis unless the user asks.
## PDF Conversion and Annotations

Codex owns these paths directly:

```bash
python3 .codex-phd/bin/phd.py pdf2md "7 - Raw/Paper.pdf"
python3 .codex-phd/bin/phd.py annots "7 - Raw/Paper.pdf"
```

- `pdf2md` uses `.codex-phd/scripts/pdf2md_convert.py`.
- `pdf2md` runs with the OpenDataLoader `.venv-odl` Python and Java 21.
- `annots` uses `scripts/annots.py` through the vault `.venv`.
- Annotation extraction requires a matching source Markdown in `9 - Knowledge_base/sources/`.

## Useful Local Commands

```bash
python3 .codex-phd/bin/phd.py status
python3 .codex-phd/bin/phd.py scaffold
python3 .codex-phd/bin/phd.py sync-bib
python3 .codex-phd/bin/phd.py lint-wiki
python3 .codex-phd/bin/phd.py pdf2md "7 - Raw/Paper.pdf"
python3 .codex-phd/bin/phd.py annots "7 - Raw/Paper.pdf"
python3 .codex-phd/bin/phd.py notebooklm-status
python3 .codex-phd/bin/phd.py notebooklm-sources
python3 .codex-phd/bin/phd.py notebooklm-ask "Your question here"
python3 .codex-phd/bin/phd.py paths
```

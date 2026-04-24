# CODEX.md

This file is the Codex-only operating guide for this PhD vault. It does not replace or modify the existing Claude or Antigravity setup.

## First Principles

- Treat this repository as a live Obsidian PhD research vault, not a normal software project.
- Read `CLAUDE.md` first for the canonical architecture.
- Read `9 - Knowledge_base/PHD_CONSTITUTION.md` and `9 - Knowledge_base/PHD_SCHEMA.md` before editing the knowledge base.
- For chapter prose, citations, bibliography formatting, and style checks, treat `9 - Knowledge_base/TISS_STYLE.md` as canonical. If any older agent memory conflicts with it, follow `TISS_STYLE.md`.
- Do not edit `.claude/` or `.agent/` unless the user explicitly asks.
- Do not edit `9 - Knowledge_base/sources/`; sources are immutable.
- Prefer appending/updating existing wiki notes over creating duplicates.
- Search `9 - Knowledge_base/index.md` before creating Concepts, People, Methods, or Comparisons.
- General research logs go in `9 - Knowledge_base/Queries/` and are not added to `index.md`.
- Deep comparative syntheses go in `9 - Knowledge_base/Comparisons/` and must be added to `index.md`.
- For logging, follow `9 - Knowledge_base/PHD_CONSTITUTION.md` -> Operational Logging.

## Existing Systems

Claude commands live in:

- `.claude/commands/`

Antigravity/OpenClaw-style workflows and skills live in:

- `.agent/workflows/`
- `.agent/skills/`

Codex helper files live in:

- `.codex-phd/`

The Codex layer is a read-through adapter over the existing setup. It should preserve the current Claude and Antigravity workflows while making the same operations easy for Codex to execute.

## Command Mapping

When the user says one of these, Codex should interpret it as follows:

| User phrase | Codex action |
| --- | --- |
| `scaffold` | Run `.codex-phd/bin/phd.py scaffold` |
| `sync bib`, `sync-bib` | Run `.codex-phd/bin/phd.py sync-bib` |
| `lint wiki`, `lint-wiki` | Run `.codex-phd/bin/phd.py lint-wiki`, then read `9 - Knowledge_base/lint_report.md` |
| `vault status` | Run `.codex-phd/bin/phd.py status` |
| `prime <paper>` | Follow `.codex-phd/workflows/prime.md` |
| `compile-phd <paper/source>` | Follow `.codex-phd/workflows/compile-phd.md` |
| `refresh topic <topic>` | Follow `.codex-phd/workflows/refresh-topic.md` |
| `rename paper <pdf>` | Follow `.codex-phd/workflows/rename-paper.md` |
| `add zotero <paper>` | Follow `.codex-phd/workflows/add-zotero.md`; avoid exposing secrets in chat |
| `ingest paper <paper>` | Follow `.codex-phd/workflows/ingest-paper.md` |
| `pdf2md <pdf>` | Follow `.codex-phd/skills/phd-vault/SKILL.md` and the existing `.agent/skills/pdf-to-markdown/SKILL.md` |
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

## Useful Local Commands

```bash
python3 .codex-phd/bin/phd.py status
python3 .codex-phd/bin/phd.py scaffold
python3 .codex-phd/bin/phd.py sync-bib
python3 .codex-phd/bin/phd.py lint-wiki
python3 .codex-phd/bin/phd.py paths
```

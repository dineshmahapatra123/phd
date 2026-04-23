---
name: phd-vault
description: Work safely inside this Obsidian PhD research vault by reusing the existing Claude and Antigravity workflows without modifying them.
---

# PhD Vault Skill for Codex

## Load Order

1. Read `CODEX.md`.
2. Read `CLAUDE.md`.
3. For knowledge-base edits, read:
   - `9 - Knowledge_base/PHD_CONSTITUTION.md`
   - `9 - Knowledge_base/PHD_SCHEMA.md`
   - `9 - Knowledge_base/index.md`
4. If a matching Claude or Antigravity workflow exists, read it as supporting context:
   - `.claude/commands/<command>.md`
   - `.agent/workflows/<command>.md`

## Core Invariants

- `9 - Knowledge_base/sources/` is immutable.
- `Concepts`, `People`, and `Methods` are atomic wiki notes.
- Contradictions are preserved, not overwritten.
- New Concepts, People, Methods, and Comparisons must be indexed.
- Queries are permanent logs but not indexed.
- Paper notes in `2 - Notes/Papers/` are the human-curated layer.

## Preferred Runner

Use this local helper for repeated operations:

```bash
python3 .codex-phd/bin/phd.py status
python3 .codex-phd/bin/phd.py scaffold
python3 .codex-phd/bin/phd.py sync-bib
python3 .codex-phd/bin/phd.py lint-wiki
```

## PDF Conversion

For `pdf2md`, use the existing skill:

- `.agent/skills/pdf-to-markdown/SKILL.md`
- `.agent/skills/pdf-to-markdown/scripts/convert.py`

Output should land in `9 - Knowledge_base/Full-Text/` unless the user specifies otherwise. For `/compile-phd`, ensure a permanent source exists in `9 - Knowledge_base/sources/`.

## Secret Handling

Some local notes/config files contain API keys. Do not print secrets. Prefer saying that credentials were found locally and used, if needed.


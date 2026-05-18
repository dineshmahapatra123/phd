# How Codex works in the PhD folder

Codex is the natural-language operator for this PhD vault. It turns research requests into concrete workspace actions while following the vault's scholarly rules, file boundaries, and safety defaults.

This explainer replaces older descriptions that treated Codex as dependent on Claude or Antigravity. The current rule is simpler: Codex must remain usable even if `.claude/` and `.agent/` are deleted.

---

## 1. Codex's basic role

Codex lets me speak like a researcher rather than like a terminal operator.

For example:

- "vault status" means: run `.codex-phd/bin/phd.py status`.
- "sync my bib" means: run the bibliography sync workflow.
- "lint the wiki" means: run the knowledge-base health check and read the report.
- "prime Cohn" means: follow the Codex `prime` workflow and use only my curated `## Highlights`.
- "compile this paper" means: follow the Codex `compile-phd` workflow, read the Constitution, Schema, Lens, and index, then create or update atomic knowledge-base notes.

Codex is not just a script runner. It is a translator between research intent and safe vault operations.

---

## 2. Codex's current operating inventory

Codex uses the Codex-owned layer plus the shared scholarly rules of the vault.

| Layer | File or folder | What Codex uses it for |
|---|---|---|
| Main operating guide | `CODEX.md` | Codex-specific authority, command mapping, safety rules |
| Codex helper CLI | `.codex-phd/bin/phd.py` | Repeated local commands such as status, scaffold, sync-bib, lint-wiki, pdf2md, annots, NotebookLM |
| Codex workflows | `.codex-phd/workflows/` | Command-specific procedures for Codex |
| Codex vault skill | `.codex-phd/skills/phd-vault/SKILL.md` | Compact load order and invariants |
| Codex style policy | `.codex-phd/STYLE_POLICY.md` | Conflict resolver for style and citation rules |
| Shared scripts | `scripts/` | Existing vault automation wrapped or inspected by Codex |
| Governance | `9 - Knowledge_base/PHD_CONSTITUTION.md` | Rules for sources, wiki notes, contradictions, queries, logging |
| Schema | `9 - Knowledge_base/PHD_SCHEMA.md` and `Types/` | Required note types, YAML, and body sections |
| Thesis lens | `9 - Knowledge_base/PHD_LENS.md` | Relevance gate for KB edits and thesis reviews |
| Style guide | `9 - Knowledge_base/TISS_STYLE.md` | Canonical prose, citation, and bibliography style |

`.claude/` and `.agent/` may exist as historical context, but Codex does not depend on them for normal operation.

---

## 3. Codex and the PhD workflow

The full paper journey remains:

```text
7 - Raw
-> rename-paper
-> scaffold
-> Manual Highlights
-> prime
-> add-zotero
-> Manual Verify
-> sync-bib
-> compile-phd
-> refresh-topic
-> lint-wiki
```

Codex supports this workflow in two ways:

1. CLI-backed operations through `.codex-phd/bin/phd.py`.
2. Agent-executed workflows described in `.codex-phd/workflows/`.

---

## 4. CLI-backed operations

These have direct runner support:

```bash
python3 .codex-phd/bin/phd.py status
python3 .codex-phd/bin/phd.py paths
python3 .codex-phd/bin/phd.py scaffold
python3 .codex-phd/bin/phd.py sync-bib
python3 .codex-phd/bin/phd.py lint-wiki
python3 .codex-phd/bin/phd.py pdf2md "7 - Raw/Paper.pdf"
python3 .codex-phd/bin/phd.py annots "7 - Raw/Paper.pdf"
python3 .codex-phd/bin/phd.py notebooklm-status
python3 .codex-phd/bin/phd.py notebooklm-sources
python3 .codex-phd/bin/phd.py notebooklm-ask "Question"
```

Use these when the task is mostly operational: counting files, scaffolding notes, converting PDFs, extracting embedded annotations, syncing citations, linting the wiki, or querying NotebookLM.

---

## 5. Agent-executed workflows

These are not single runner commands. Codex reads the matching workflow file and carries out the steps carefully:

- `rename-paper`
- `ingest-paper`
- `add-zotero`
- `prime`
- `compile-phd`
- `refresh-topic`
- `review-phd-lens`
- `cite`
- `bib-format`
- `style-check`
- `arxiv-impact`

For these tasks, Codex must gather context, inspect files, apply the relevant rules, and then write or report as required.

---

## 6. Phase-by-phase role

### Phase 1: Ingestion

Codex can inspect `7 - Raw/`, identify new PDFs, help rename a PDF, and run scaffolding. It should ask before deleting, moving, or batch-renaming files.

### Phase 2: High-Integrity Analysis

`## Highlights` belongs to Dinesh. Codex may read it when asked to `prime` or review a source, but it should not write into that section. Codex writes into `## AI Primer` or separate review files.

### Phase 3: Truth Loop

Codex can run `sync-bib`, diagnose citation-sync issues, and help with Zotero operations when explicitly requested. It must never print credentials or tokens.

### Phase 4: Knowledge Engineering

For `compile-phd`, Codex must read `CODEX.md`, `PHD_CONSTITUTION.md`, `PHD_SCHEMA.md`, `PHD_LENS.md`, and `index.md`; search before creating; use existing source Markdown when available; create or update only atomic `Concept`, `Person`, and `Method` notes; preserve contradictions; update `index.md`; and log the work.

### Phase 5: Neural Synthesis

For `refresh-topic`, Codex updates existing Topic notes with new evidence. It must preserve scholarly disagreement instead of flattening it.

### Phase 6: Wiki Vitality

For `lint-wiki`, Codex runs the linter, reads `lint_report.md`, and reports concrete issues. It should not fix the vault unless the user asks or the task explicitly includes fixing.

---

## 7. Current authority rule

When Codex works in this vault, the authority order is:

1. `CODEX.md`
2. `.codex-phd/skills/phd-vault/SKILL.md`
3. the matching `.codex-phd/workflows/<command>.md`
4. `PHD_CONSTITUTION.md`, `PHD_SCHEMA.md`, `PHD_LENS.md`, `TISS_STYLE.md`, and `Types/` as required by the task

Older explainers in `1 - Rough/Handy notes/Random/` are historical notes unless they are updated to match this rule.

---

## 8. The shortest definition

Codex is the agent that translates PhD intent into safe local action inside the vault, using the Codex-owned helper layer and the shared scholarly rules of the knowledge base.


---
name: PhD Vault Architecture and Conventions
description: Directory structure, note type conventions, naming rules, and KB governance for this Obsidian PhD vault
type: reference
---

This vault is an Obsidian-based PhD research workspace for institutional economics / land rights research. Read this before running any workflow.

**Why:** This is the authoritative vault reference for agents. It mirrors CLAUDE.md which is only read by Claude Code.

**How to apply:** Before creating, editing, or moving any file, verify the target directory and naming convention match the rules below.

---

## Directory Architecture

| Directory | Purpose |
|-----------|---------|
| `7 - Raw/` | Source PDFs — canonical; one PDF per paper |
| `2 - Notes/Papers/` | Master notes (one per PDF) containing manual highlights and AI primers |
| `9 - Knowledge_base/` | The brain — wiki, index, schema |
| `6 - Writings/` | Chapter drafts; `type: Chapter` |
| `5 - Templates/` | Note templates |
| `3 - Tags/` | Per-topic tag files |
| `Tweets/` | Saved social-media/thread notes (`type: Tweet`) |
| `Clippings/` | Saved web/article/newsletter clips (`type: Clip`) |
| `Types/` | Type definition files; one per note type |
| `PhD.bib` | Zotero BibTeX export; source of truth for citations |

### Knowledge Base Sub-Structure (`9 - Knowledge_base/`)

```
sources/     ← Machine-readable full-text from /pdf2md — IMMUTABLE, never edit
Concepts/    ← Atomic concept notes
People/      ← Scholar profiles
Methods/     ← Research design and methodology notes
Topics/      ← Field-level debate tracking
Comparisons/ ← Cross-paper analysis (must be added to index.md)
Queries/     ← AI research interaction logs (NOT indexed in index.md)
index.md     ← Master index; update when adding any Concept/Person/Method/Topic/Comparison
log.md       ← Compact activity ledger; detailed provenance goes in logs/
PHD_SCHEMA.md       ← YAML schema and section structure for all wiki page types
PHD_CONSTITUTION.md ← Governance rules
```

---

## Note Type Conventions (Tolaria-Compatible)

Every scholarly vault note must open with a YAML block. The `type:` field is **always lowercase**. Operational Markdown files such as workflows, logs, prompts, templates, and agent instructions are exempt unless they explicitly declare a type.

| Type | Location | Required YAML fields |
|------|----------|---------------------|
| `Note` | `2 - Notes/Papers/` | `type`, `Paper_Linked`, `Last_Processed`, `Status` |
| `Chapter` | `6 - Writings/` | `type`, `Last_Processed`, `Status` |
| `Concept` | `9 - Knowledge_base/Concepts/` | `type`, `Paper_Linked`, `Last_Processed`, `Status`, `Related`, `Contradicts` |
| `Topic` | `9 - Knowledge_base/Topics/` | `type`, `Paper_Linked`, `Last_Processed`, `Status` |
| `Comparison` | `9 - Knowledge_base/Comparisons/` | `type`, `Paper_Linked`, `Last_Processed`, `Status` |
| `Query` | `9 - Knowledge_base/Queries/` | `type`, `Last_Processed` |
| `Person` | `9 - Knowledge_base/People/` | `type`, `Paper_Linked`, `Last_Processed`, `Status` |
| `Method` | `9 - Knowledge_base/Methods/` | `type`, `Paper_Linked`, `Last_Processed`, `Status` |
| `Paper` | `2 - Notes/Papers/` | `type`, `Paper_Linked`, `Last_Processed`, `Status`, `APA_Citation`, `Authors`, `Year` |
| `Book` | `2 - Notes/Books/` | `type`, `Last_Processed`, `Status`, `APA_Citation`, `Authors`, `Year`, `Publisher` |
| `Tweet` | `Tweets/` | `type`, `Last_Processed`, `Status`, `Author`, `Handle`, `URL` |
| `Clip` | `Clippings/` | `type`, `Last_Processed`, `Status`, `Source`, `Author`, `URL` |

**Critical rule**: Never use `Type:` (capital T). Always `type:` (lowercase).

Example correct YAML for a Concept:
```yaml
---
type: Concept
Paper_Linked: [[Paper Name]]
Last_Processed: 2026-04-24
Status: Seed
Related: [[Other Concept]]
Contradicts:
---
```

---

## PDF Naming Conventions

- **Sentence case**: `The property right paradigm.pdf` not `The Property Right Paradigm.pdf`
- **No author suffix**: `The effects of land registration on financial development.pdf` not `The effects...Byamugisha.pdf`
- **Wikilinks to `sources/` never include `.pdf` extension**: `[[The property right paradigm]]` not `[[The property right paradigm.pdf]]`
- The `sources/` file name matches the PDF name exactly (minus extension)

---

## Master Note Template (for `2 - Notes/Papers/`)

```
---
type: Note
Paper_Linked: "[[filename.pdf]]"
Last_Processed: "YYYY-MM-DD"
Status: Seed
---

APA Citation from Zotero:
Tags:

## Highlights
*(Paste verbatim quotes, page numbers, and raw thoughts here — Dinesh only)*

---

## AI Primer
*(Run /prime to populate — reads only from ## Highlights)*
```

> [!IMPORTANT]
> Never delete `APA Citation from Zotero:` — `citation_spider.py` uses this exact string to find and update the citation. Never write in `## Highlights` — that section belongs to Dinesh.
> 
> **Secret Management**: When reading `1 - Rough/Handy notes/HN_01.md`, look for specific labels (e.g., `Zotero`, `GitHub`, `OpenAI`) to extract tokens. Do not assume a specific line number.

---

## Knowledge Base Governance Rules

1. **Atomicity**: Every concept is a single atomic note — no multi-page summaries.
2. **Backlinking**: Every new wiki page must link back to the paper's master note.
3. **No overwriting on contradiction**: Add a `### ⚠️ Contradiction` section and set `Contradicts:` in YAML.
4. **Index First**: Scan `index.md` before creating any new page to avoid duplicates.
5. **Neural Snowball**: APPEND or UPDATE existing pages; never recreate them.
6. **Sources are immutable**: Never edit files in `9 - Knowledge_base/sources/`.
7. **Comparisons go in index.md**: Any file created in `Comparisons/` must be added to `index.md`.
8. **Queries are NOT indexed**: Files in `Queries/` are never added to `index.md`.
9. **Topics not created in compile-phd**: Topics are managed by `/refresh-topic` only.
10. **Operational logging**: Follow `PHD_CONSTITUTION.md` → Operational Logging. Keep `log.md` compact; put detailed provenance in `9 - Knowledge_base/logs/`.

---

## 6-Phase PhD Workflow

1. **Ingestion**: Drop PDF in `7 - Raw/` → `/rename-paper` → `/scaffold`
2. **Analysis**: Manual deep-read → paste highlights → `/prime`
3. **Truth Loop**: `/add-zotero` → verify in Zotero → `/sync-bib`
4. **Knowledge Engineering**: `/compile-phd` (shatters paper into atomic wiki articles)
5. **Neural Synthesis**: `/refresh-topic` (re-synthesizes related Topics)
6. **Wiki Vitality**: `/lint-wiki` (health check)

---

## Scripts (run via `run_command`)

```bash
python3 "/Users/dineshmahapatra/Library/CloudStorage/GoogleDrive-dineshmahapatra123@gmail.com/My Drive/PhD/scripts/scaffold.py"
python3 "/Users/dineshmahapatra/Library/CloudStorage/GoogleDrive-dineshmahapatra123@gmail.com/My Drive/PhD/scripts/lint_wiki.py"
python3 "/Users/dineshmahapatra/Library/CloudStorage/GoogleDrive-dineshmahapatra123@gmail.com/My Drive/PhD/scripts/citation_spider.py"
```

## pdf2md Environment

```bash
export JAVA_HOME="/opt/homebrew/opt/openjdk@21"
export PATH="$JAVA_HOME/bin:$PATH"
source "/Users/dineshmahapatra/Downloads/Dinesh/Code/Knowledge_Repo/.venv-odl/bin/activate"
python3 ".../scripts/convert.py" --input "<pdf>" --output ".../9 - Knowledge_base/sources/" --format "markdown"
```

Output always goes to `9 - Knowledge_base/sources/` — never to `Full-Text/` or anywhere else.

---

## Zotero API & Secrets

- Zotero credentials and other API keys are stored locally in `1 - Rough/Handy notes/HN_01.md`.
- **Standard Format**: Use labels to ensure all agents find the correct token regardless of file order:
  - `ZOTERO_API_KEY: [token]` or `[token] -- **Zotero API**`
  - `GITHUB_TOKEN: [token]` or `[token] -- **GitHub Token**`
- Never print API keys, tokens, or secrets in chat or terminal summaries.

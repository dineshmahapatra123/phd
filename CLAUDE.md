# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

An Obsidian-based PhD research vault for economics/institutional theory research (land rights, property rights, institutional economics). The vault is both a knowledge base and a writing workspace, managed with Python automation scripts.

## Scripts

All scripts live in `scripts/` and use hardcoded absolute paths under `My Drive/PhD/`.

```bash
# Scaffold master notes + highlights placeholders for any new PDFs in 7 - Raw/
python scripts/scaffold.py

# Extract PDF annotations to Markdown using PyMuPDF
# Use when the user wants raw annotations pulled from a PDF outside of the /prime workflow
python scripts/annots.py <path/to/file.pdf> [--output <path/to/output.md>]

# Run health check on the Knowledge Base (Concepts, People, Methods)
python scripts/lint_wiki.py
# Report saved to: 9 - Knowledge_base/lint_report.md

# Sync APA citations from PhD.bib into paper notes (requires pybtex, citeproc-py)
python scripts/citation_spider.py

# Generate Excalidraw workflow flowchart JSON (outputs to stdout)
python scripts/generate_flowchart.py
```

## Directory Architecture

| Directory | Purpose |
|-----------|---------|
| `7 - Raw/` | Source PDFs (canonical; one PDF per paper) |
| `2 - Notes/Papers/` | Master notes (one per PDF) containing manual highlights and AI primers |
| `9 - Knowledge_base/` | The "brain" — wiki, index, schema, queries |
| `6 - Writings/` | Chapter drafts (`type: Chapter`) |
| `5 - Templates/` | Note templates; `Paper Title as Zotero Cleaned.md` is the master note template |
| `3 - Tags/` | Per-topic tag files |
| `8 - Doc_dump/` | Staging area for auto-downloaded papers (`/ingest-paper` drops files here before manual move to `7 - Raw/`) |
| `Tweets/` | Saved social-media/thread notes (`type: Tweet`) |
| `Clippings/` | Saved web/article/newsletter clips (`type: Clip`) |
| `Types/` | Type definition files — one per note type; specify required frontmatter, icon, and colour |
| `PhD.bib` | Zotero BibTeX export; source of truth for citations |

### Note Types

Every scholarly vault note belongs to a defined type. Type definitions live in `Types/` and specify the required YAML frontmatter and body sections for each type. The full frontmatter spec is in `9 - Knowledge_base/PHD_SCHEMA.md`. Operational Markdown files such as workflows, logs, prompts, templates, and agent instructions are exempt unless they explicitly declare a type.

| Type | Location | Created by |
|------|----------|-----------|
| `Note` | `2 - Notes/Papers/` | `/scaffold` (automated) |
| `Chapter` | `6 - Writings/` | Manual |
| `Concept` | `9 - Knowledge_base/Concepts/` | `/compile-phd` |
| `Topic` | `9 - Knowledge_base/Topics/` | Manual (updated by `/refresh-topic`) |
| `Comparison` | `9 - Knowledge_base/Comparisons/` | Manual / research |
| `Query` | `9 - Knowledge_base/Queries/` | Research interactions |
| `Person` | `9 - Knowledge_base/People/` | `/compile-phd` |
| `Method` | `9 - Knowledge_base/Methods/` | `/compile-phd` |
| `Paper` | `2 - Notes/Papers/` | Manual / future paper workflow |
| `Book` | `2 - Notes/Books/` | Manual |
| `Tweet` | `Tweets/` | Manual / clipping |
| `Clip` | `Clippings/` | Manual / clipping |

### Knowledge Base Sub-Structure (`9 - Knowledge_base/`)

```
sources/     ← Machine-readable full-text from /pdf2md; IMMUTABLE — never edit
Concepts/    ← Atomic concept notes (governed by PHD_SCHEMA.md)
People/      ← Scholar profiles
Methods/     ← Research design and methodology notes
Topics/      ← Field-level debate tracking
Comparisons/ ← Filed results of cross-paper comparisons (must be added to index.md)
Queries/     ← AI research interaction logs (unindexed; search directory directly)
index.md     ← Master index; must be updated when adding Concepts/People/Methods/Comparisons
PHD_CONSTITUTION.md  ← Governance rules (read first)
PHD_SCHEMA.md        ← YAML schema and section structure for all note types
PHD_LENS.md          ← Mandatory research relevance filter (read before any wiki edit)
```

## Research Workflow

See full workflow: `1 - Rough/Handy notes/Random/PhD Workflow Guide.md`

1. **Ingestion**: Drop PDF into `7 - Raw/` → `/rename-paper` → `/scaffold` (creates master note with `## Highlights` section)
2. **High-Integrity Analysis**: Deep read PDF → manually paste verbatim quotes & raw thoughts into `## Highlights` section of master note → run `/prime` (agent builds AI Primer from your curated highlights)
3. **Truth Loop**: `/add-zotero` → manually verify Author/Year/Title in Zotero → `/sync-bib` (injects APA citation into master note)
4. **Knowledge Engineering**: `/compile-phd` (shatters paper into atomic wiki articles in `9 - Knowledge_base/`). **MANDATORY**: Use `PHD_LENS.md` to filter which concepts are load-bearing for the thesis.
5. **Neural Synthesis**: `/refresh-topic` (re-synthesizes related Topics with new evidence). **MANDATORY**: Use `PHD_LENS.md` to keep synthesis focused on the research questions.
6. **Wiki Vitality**: `/lint-wiki` (health check — orphans, seed gaps, broken links)

## Knowledge Base Rules (from PHD_CONSTITUTION.md)

- **Atomicity**: Every concept is a single atomic note — no multi-page summaries.
- **Backlinking**: Every new wiki page must link back to the paper's master note in `2 - Notes/Papers/`.
- **No overwriting on contradiction**: Add a `### ⚠️ Contradiction` section and set `Contradicts:` in YAML instead.
- **Index First**: Always scan `index.md` before creating a new page to avoid duplicates.
- **Neural Snowball**: APPEND or UPDATE existing pages; never recreate them.
- **Comparisons**: Deep comparative queries must be filed as `.md` in `Comparisons/` and added to `index.md`.
- **Queries**: Standard AI research interactions go to `Queries/` and are **not** added to `index.md`.
- **Sources are immutable**: Never edit files in `sources/`.
- **Operational logging**: Follow `PHD_CONSTITUTION.md` → Operational Logging. Keep `log.md` compact; put detailed provenance in `9 - Knowledge_base/logs/`.
- **Relevance Filter**: Apply `PHD_LENS.md` inclusion tests (Research Question, Geography, Chapter Mapping) before adding anything to the KB.

## Wiki Page Schema

Every scholarly vault note must open with a `type:` YAML field. The full frontmatter spec for all defined types is in `9 - Knowledge_base/PHD_SCHEMA.md`. Type definitions with icons and section structure live in `Types/`.

## Agent Architecture

This vault is used by three AI agents. Each has its own exclusive layer — do not cross-pollinate:

| Agent | Config file | Command directory | Skills/Workflows |
|-------|-------------|-------------------|-----------------|
| **Claude** (you) | `CLAUDE.md` | `.claude/commands/` | `.agent/skills/pdf-to-markdown/` (shared read-only) |
| **Antigravity** | — | `.agent/workflows/` | `.agent/skills/` |
| **Codex** | `CODEX.md` | `.codex-phd/workflows/` | `.codex-phd/skills/` |

Claude Code loads slash commands exclusively from `.claude/commands/`. Do not read `.agent/workflows/` or `.codex-phd/` as your operating instructions — those are for the other agents.

## Claude Slash Commands (`.claude/commands/`)

All commands below are defined in `.claude/commands/` and loaded automatically by Claude Code.

### PDF & Ingestion

| Command | Description |
|---------|-------------|
| `/pdf2md` | Convert a PDF to Markdown using opendataloader-pdf (requires Java 21 + `.venv-odl` at `/Users/dineshmahapatra/Downloads/Dinesh/Code/Knowledge_Repo/.venv-odl`). Output saved to `9 - Knowledge_base/sources/` |
| `/rename-paper` | Web-search the correct title of a PDF and rename it to clean sentence-case |
| `/scaffold` | Run `scripts/scaffold.py` to create master notes + highlights placeholders for new PDFs in `7 - Raw/` |
| `/ingest-paper` | Find, download, and inject a research paper into `8 - Doc_dump/Automated_Search/` |

### Analysis & Knowledge Engineering

| Command | Description |
|---------|-------------|
| `/prime` | Build an AI Primer for a master note by synthesising manually curated highlights — does NOT read the PDF directly |
| `/compile-phd` | Shatter a paper (PDF or `.md`) into atomic wiki articles — runs `/pdf2md` if needed, creates/updates Concepts, People, Methods, updates `index.md` |
| `/refresh-topic` | Re-synthesize a Topic note in `9 - Knowledge_base/Topics/` with all latest evidence |
| `/arxiv-impact` | Bibliometric search for the most cited/impactful papers in a given field and year via WebSearch |

### Citations & Style

| Command | Description |
|---------|-------------|
| `/add-zotero` | Add a paper/book to Zotero via API and assign to PhD collection (reads credentials from `HN_01.md`) |
| `/sync-bib` | Run `scripts/citation_spider.py` to sync APA citations from `PhD.bib` into paper notes |
| `/bib-format` | Format a raw citation into a correct TISS bibliography entry (all 8 source types) |
| `/cite` | Generate a correctly formatted TISS in-text author-date citation for any edge case |
| `/style-check` | Lint prose against TISS Manual of Style (spelling, numbers, punctuation, citations, indent) |

### Knowledge Base Maintenance

| Command | Description |
|---------|-------------|
| `/lint-wiki` | Health check of the Knowledge Base (missing YAML, unindexed notes, broken links, seed notes) |

## NotebookLM (CLI)

NotebookLM is queried via the `notebooklm` CLI (notebooklm-py), installed in the PhD `.venv`. Auth is stored at `~/.notebooklm/profiles/default/` — no login needed.

```bash
source "/Users/dineshmahapatra/Library/CloudStorage/GoogleDrive-dineshmahapatra123@gmail.com/My Drive/PhD/.venv/bin/activate"
notebooklm use f802377d-2963-487f-8b74-5286f629eb91   # PhD_Papers notebook
notebooklm ask "Your question here"
```

> **Note**: `.agent/skills/notebooklm/` is a browser-automation skill for Antigravity — it is NOT used by Claude.

---

## TISS Style Compliance

All PhD prose drafted in this vault must comply with the **TISS Manual of Style, 8th Revised Edition (Jayaram 2019)**. The full machine-readable rule set is at `9 - Knowledge_base/TISS_STYLE.md`. Auto-apply these rules whenever writing or editing chapter text:

- **UK English** spelling throughout (*organise*, *colour*, *behaviour*, *per cent*)
- **Numbers**: spell out one–ninety-nine; numerals for 100+; never start a sentence with a numeral
- **Per cent** (two words, no % symbol in body text)
- **Oxford comma** always: *land, labour, and capital*
- **Quotations**: single marks (' ') for short quotes; block indent (no marks) for ≥ 3 lines
- **In-text citations**: APA author-date, with comma: *(Sharma, 2005)*; page: *(Sharma, 2005, p. 34)*; **&** inside parentheses, **and** in prose
- **Latin abbreviations**: never use *i.e.*, *e.g.*, *etc.* in body text — write *that is*, *for example*, *and so on*
- **Indentation**: first paragraph after chapter title or any subheading has **no indent**; subsequent paragraphs tab at **0.3"**
- **En-dash for ranges**: *2000–2010*, *pp. 45–52*
- **Active voice** and **first person** preferred over passive

Use `/style-check` to lint any passage, `/cite` to generate in-text citations, `/bib-format` to format bibliography entries.

---

## Master Note Template (`5 - Templates/Paper Title as Zotero Cleaned.md`)

Scaffold creates this structure automatically (with YAML frontmatter prepended by `scripts/scaffold.py`):

```
---
type: Note
Paper_Linked: "[[filename.pdf]]"
Last_Processed: "YYYY-MM-DD"
Status: Seed
---

APA Citation from Zotero:        ← populated by /sync-bib; do not delete this line
Tags:                             ← wikilinks to Topic notes

## Highlights
*(Paste verbatim quotes, page numbers, and raw thoughts here — Dinesh only)*

---

## AI Primer
*(Run /prime to populate — reads only from ## Highlights above)*
```

> [!IMPORTANT]
>- Zotero API credentials and GitHub tokens are stored locally in `1 - Rough/Handy notes/HN_01.md`.
>- **Note to Agents**: When reading `HN_01.md`, always look for a label (e.g. `Zotero`, `GitHub`) on the same line to extract the correct token. Do not rely on line numbers.
>- Read credentials only when needed and never echo them in chat or terminal output.
> Never delete `APA Citation from Zotero:` — `citation_spider.py` uses this exact string to find and update the citation. Never write in `## Highlights` — that section belongs to Dinesh.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

An Obsidian-based PhD research vault for economics/institutional theory research (land rights, property rights, institutional economics). The vault is both a knowledge base and a writing workspace, managed with Python automation scripts.

## Scripts

All scripts live in `scripts/` and use hardcoded absolute paths under `My Drive/PhD/`.

```bash
# Scaffold master notes + highlights placeholders for any new PDFs in 7 - Raw/
python scripts/scaffold.py

# Extract Skim PDF annotations to Markdown (requires skimnotes CLI)
python scripts/extract_skim_notes.py <path/to/file.pdf> [--output <dir>]

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
| `2 - Notes/Papers/` | Master notes, one per PDF, created by `scaffold.py` |
| `Highlights/` | Extracted Skim annotations, one `.md` per PDF |
| `9 - Knowledge_base/` | The "brain" — wiki, index, schema, queries |
| `6 - Writings/` | Chapter drafts (Chapter 1–4) |
| `5 - Templates/` | Note templates; `Paper Title as Zotero Cleaned.md` is the master note template |
| `3 - Tags/` | Per-topic tag files |
| `PhD.bib` | Zotero BibTeX export; source of truth for citations |

### Knowledge Base Sub-Structure (`9 - Knowledge_base/`)

```
sources/     ← Machine-readable full-text; IMMUTABLE — never edit
Concepts/    ← Atomic concept notes (governed by PHD_SCHEMA.md)
People/      ← Scholar profiles
Methods/     ← Research design and methodology notes
Topics/      ← Field-level debate tracking
Comparisons/ ← Filed results of cross-paper comparisons (must be added to index.md)
Queries/     ← AI research interaction logs (unindexed; search directory directly)
index.md     ← Master index; must be updated when adding Concepts/People/Methods/Comparisons
PHD_CONSTITUTION.md  ← Governance rules (read first)
PHD_SCHEMA.md        ← YAML schema and section structure for all wiki pages
```

## Research Workflow

See full workflow: `1 - Rough/Handy notes/PhD Workflow Guide.md`

1. **Ingestion**: Drop PDF into `7 - Raw/` → `/rename-paper` → `/scaffold` (creates master note with `## Highlights` section)
2. **High-Integrity Analysis**: Deep read PDF → manually paste verbatim quotes & raw thoughts into `## Highlights` section of master note → run `/prime` (agent builds AI Primer from your curated highlights)
3. **Truth Loop**: `/add-zotero` → manually verify Author/Year/Title in Zotero → `/sync-bib` (injects APA citation into master note)
4. **Knowledge Engineering**: `/compile-phd` (shatters paper into atomic wiki articles in `9 - Knowledge_base/`)
5. **Neural Synthesis**: `/refresh-topic` (re-synthesizes related Topics with new evidence)
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

## Wiki Page Schema (PHD_SCHEMA.md)

Every wiki page requires this YAML frontmatter:

```yaml
Type: Concept | Person | Method
Paper_Linked: [[Paper Title]]
Last_Processed: YYYY-MM-DD
Status: Seed | Sapling | Evergreen
Contradicts: [[Conflict File]]
```

Section structure by type:
- **Concepts**: Standard Definition → Scholarly Debate → PhD Application → Measurement/Methods → Related Papers
- **People**: Scholarly Lens → Core Bibliography → Inter-Person Links → Methodological Bias
- **Methods**: Description → Strengths/Weaknesses → PhD Relevance
- **Topics**: The Big Question → Timeline
- **Queries**: Query → Reasoning Path → Key Answer → Next Steps → Status: `Permanent Log`

## Agent Skills & Workflows (`.agent/`)

Custom slash commands defined in `.agent/skills/` and `.agent/workflows/`. Claude Code loads these automatically.

### Skill

| Command | Description |
|---------|-------------|
| `/pdf2md` | Convert a PDF to Markdown using opendataloader-pdf (requires Java 21 + `.venv-odl`). Output saved to `9 - Knowledge_base/Full-Text/` |

### Workflows

| Command | Description |
|---------|-------------|
| `/compile-phd` | Shatter a paper (PDF or `.md`) into atomic wiki articles — runs `/pdf2md` if needed, then creates/updates Concepts, People, Methods, and updates `index.md` |
| `/scaffold` | Run `scripts/scaffold.py` to create master notes + highlights placeholders for new PDFs in `7 - Raw/` |
| `/rename-paper` | Web-search the correct title of a PDF and rename it to clean sentence-case |
| `/prime` | Read a PDF and populate its `2 - Notes/Papers/` note with an AI primer |
| `/lint-wiki` | Health check of the Knowledge Base (missing YAML, unindexed notes, broken links, seed notes) |
| `/sync-bib` | Run `scripts/citation_spider.py` to sync APA citations from `PhD.bib` into paper notes |
| `/add-zotero` | Add a paper/book to Zotero via API and move it to the PhD collection |
| `/ingest-paper` | Find, download, and inject a research paper into `Doc_dump/` |
| `/refresh-topic` | Refresh a research synthesis with the latest evidence |
| `/arxiv-impact` | Find the most cited/impactful ArXiv papers in a given field and year |
| `/style-check` | Lint prose against TISS Manual of Style (spelling, numbers, punctuation, citations, indent) |
| `/bib-format` | Format a raw citation into a correct TISS bibliography entry (all 8 source types) |
| `/cite` | Generate a correctly formatted TISS in-text author-date citation for any edge case |

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

```
APA Citation from Zotero: 
Tags: 
One-line thesis: 
Keywords: 
Quotes (Verbatim)
Research Question(s)
Concepts Covered
Summaries (Section + Paper)
Main Anchors (figures, models, causal pathways, diagrams)
Critique
Future readings (citations)
```

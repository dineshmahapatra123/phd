---
type: Type
_icon: lightbulb
_color: "#8b5cf6"
_folder: "9 - Knowledge_base/Concepts"
_sort: "modified:desc"
_order: 5
---

# Concept

An atomic theoretical idea extracted from one or more papers — the primary unit of the Knowledge Base. Created and updated by `/compile-phd`. One idea per file; no multi-page summaries.

## Required Frontmatter

Single PDF:
```yaml
---
type: Concept
Paper_Linked: "[[Paper Title.pdf]]"
Last_Processed: "YYYY-MM-DD"
Status: Seed | Sapling | Evergreen
Related: "[[Concept A]]"
Contradicts: ""
---
```

Multiple PDFs or multiple Related links — use YAML list format (one item per line):
```yaml
---
type: Concept
Paper_Linked:
  - "[[Paper A.pdf]]"
  - "[[Paper B.pdf]]"
Last_Processed: "YYYY-MM-DD"
Status: Seed | Sapling | Evergreen
Related:
  - "[[Concept A]]"
  - "[[Concept B]]"
Contradicts: ""
---
```

- `Paper_Linked` — links to the **PDF in `7 - Raw/`** (always include `.pdf` extension). Use YAML list format for multiple PDFs so each is independently clickable in Obsidian. Never link to master notes or KB files here.
- `Related` — cross-links to other KB files only (Concepts, People, Methods, Topics). Never PDFs, never paper notes. Use YAML list format for multiple links.
- `Contradicts` — set to `""` when empty; add the conflicting note's name when a contradiction exists. Also add a `### ⚠️ Contradiction` section in the body.

## Required Body Sections

1. **Standard Definition** — the canonical academic meaning
2. **Scholarly Debate** — how different schools of thought define this differently
3. **PhD Application** — how this maps to your specific thesis problem
4. **Measurement / Methods** — how researchers operationalise or measure this concept
5. **Also Appears In** — links to master notes in `2 - Notes/Papers/` where this concept appears beyond the primary `Paper_Linked`. No `.pdf` extension. Never link to KB files or PDFs here.

## Rules

- Check `9 - Knowledge_base/index.md` before creating — no duplicates
- Neural Snowball: **append/update** existing notes, never recreate
- `Contradicts` and `### ⚠️ Contradiction` sections are mandatory when conflict exists
- Every note must backlink to its source paper's master note in `2 - Notes/Papers/`

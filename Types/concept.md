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

```yaml
---
type: Concept
Paper_Linked: "[[Paper Title]]"
Last_Processed: "YYYY-MM-DD"
Status: Seed | Sapling | Evergreen
Related: "[[Concept A]], [[Concept B]]"
Contradicts: "[[Conflicting Concept]]"
---
```

- `Paper_Linked` — one or more paper master notes the concept was drawn from
- `Related` — cross-links to other Concept, Topic, or Method notes (use sparingly; only strong links)
- `Contradicts` — if a new source conflicts with this note's definition; also add a `### ⚠️ Contradiction` section in the body

## Required Body Sections

1. **Standard Definition** — the canonical academic meaning
2. **Scholarly Debate** — how different schools of thought define this differently
3. **PhD Application** — how this maps to your specific thesis problem
4. **Measurement / Methods** — how researchers operationalise or measure this concept
5. **Related Papers** — wikilinks to processed paper master notes

## Rules

- Check `9 - Knowledge_base/index.md` before creating — no duplicates
- Neural Snowball: **append/update** existing notes, never recreate
- `Contradicts` and `### ⚠️ Contradiction` sections are mandatory when conflict exists
- Every note must backlink to its source paper's master note in `2 - Notes/Papers/`

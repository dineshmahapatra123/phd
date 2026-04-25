---
type: Type
_icon: help-circle
_color: "#f97316"
_folder: "9 - Knowledge_base/Queries"
_sort: "created:desc"
_order: 10
---

# Query

A permanent log of a standard AI research interaction — a question asked, a reasoning path followed, an answer synthesised. Unindexed by design to prevent bloat. Archived for traceability.

## Required Frontmatter

```yaml
---
type: Query
Query: "The exact research question asked"
Last_Processed: "YYYY-MM-DD"
Status: Permanent Log
---
```

- `Query` — the verbatim question that triggered this note
- `Status` is always `Permanent Log` — never changed

## Required Body Sections

1. **Query** — restate the full question
2. **Reasoning Path** — which papers, concepts, or sources were used to construct the answer
3. **Key Answer** — the core synthesis or result
4. **Next Steps** — follow-up questions, gaps, or further reading suggested
5. **Status** — always: `Permanent Log`

## Rules

- **Never indexed** in `index.md` — search the `Queries/` directory directly
- Distinguish from Comparisons: a Query is a raw research log; a Comparison is a structured analysis filed for future reference
- One file per question; filename should reflect the query topic (e.g., `Importance of Cadastral Maps in India.md`)

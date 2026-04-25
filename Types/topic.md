---
type: Type
_icon: layers
_color: "#f59e0b"
_folder: "9 - Knowledge_base/Topics"
_sort: "modified:desc"
_order: 11
---

# Topic

A running synthesis of a long-term scholarly debate — written and updated by `/refresh-topic` as new papers are ingested. Topics track how a question evolves across the literature, not what a single paper says.

## Required Frontmatter

```yaml
---
type: Topic
Paper_Linked: "[[Paper A]], [[Paper B]], [[Paper C]]"
Last_Processed: "YYYY-MM-DD"
Status: Seed | Sapling | Sapling++ | Evergreen
---
```

- `Paper_Linked` grows over time as more papers are processed — can list 5–10+ papers
- `Status` advances as the topic accumulates more evidence and synthesis

## Required Body Sections

1. **The Big Question** — the core disagreement or debate this topic tracks
2. **Timeline** — how this debate has evolved (key years, turning points, paradigm shifts)
3. **Key Arguments** — the main positions, with paper attributions
4. **State of the Art** — current scholarly consensus (or lack of it)
5. **PhD Relevance** — how this debate connects to your thesis
6. **Related Concepts** — wikilinks to Concept notes

## Rules

- Indexed in `9 - Knowledge_base/index.md`
- Neural Snowball: never delete old evidence; use `### ⚠️ Contradiction` for conflicts
- Run `/refresh-topic` whenever a new paper is processed that touches this debate
- `Last_Processed` updated by `/refresh-topic` on every run

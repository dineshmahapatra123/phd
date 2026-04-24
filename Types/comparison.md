---
type: Type
_icon: git-compare
_color: "#06b6d4"
_folder: "9 - Knowledge_base/Comparisons"
_sort: "created:desc"
---

# Comparison

A filed result of a deep comparative query — two or more papers, authors, concepts, or cases examined side-by-side. Always indexed. Created during targeted research interactions.

## Required Frontmatter

```yaml
---
type: Comparison
Paper_Linked: "[[Paper A]], [[Paper B]]"
Last_Processed: "YYYY-MM-DD"
Status: Seed | Sapling | Evergreen
---
```

- `Paper_Linked` — all papers whose arguments are being compared

## Required Body Sections

1. **Comparison Question** — the exact question being answered (e.g., "North vs. Ostrom on institutional change")
2. **Axis of Comparison** — what dimension is being compared (methodology, theory, empirical scope, conclusions)
3. **Side-by-Side Analysis** — structured comparison; use a table where possible
4. **Synthesis** — what the comparison reveals that neither paper says alone
5. **PhD Relevance** — how this comparison informs your thesis argument

## Rules

- **Always indexed** — add to `9 - Knowledge_base/index.md` immediately after creation
- Filed under `9 - Knowledge_base/Comparisons/` with a descriptive filename (e.g., `North vs Ostrom on Institutional Change.md`)
- Do not confuse with Queries — Comparisons are structured analyses, not raw Q&A logs

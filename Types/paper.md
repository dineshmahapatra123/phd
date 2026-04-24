---
type: Type
_icon: file-stack
_color: "#2563eb"
_folder: "2 - Notes/Papers"
_sort: "modified:desc"
---

# Paper

A scholarly paper or working paper note. Use this type for literature notes that need paper-specific bibliographic and argument structure.

Current `/scaffold` master notes may still use `type: Note`; do not migrate existing paper notes unless the user explicitly asks.

## Required Frontmatter

```yaml
---
type: Paper
Paper_Linked: "[[filename.pdf]]"
Last_Processed: "YYYY-MM-DD"
Status: Seed | Sapling | Evergreen
APA_Citation: ""
DOI:
Authors:
Year:
---
```

## Required Body Sections

1. **Citation** — publication details and stable identifiers
2. **Research Question** — the problem the paper asks
3. **Argument** — the central claim and causal logic
4. **Method / Evidence** — data, method, archive, or theoretical evidence
5. **Key Passages** — curated quotations with page numbers
6. **PhD Relevance** — how it informs the thesis
7. **Links** — related Concepts, Topics, People, Methods, and source files

## Rules

- Do not write into `## Highlights` sections owned by Dinesh in existing scaffolded notes
- Link to the Raw PDF and, when available, the source markdown in `9 - Knowledge_base/sources/`
- Prefer updating the existing paper note over creating duplicates

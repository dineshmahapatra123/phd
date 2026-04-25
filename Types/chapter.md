---
type: Type
_icon: book
_color: "#3b82f6"
_folder: "6 - Writings"
_sort: "modified:desc"
_order: 2
---

# Chapter

A thesis chapter draft — one file per chapter in `6 - Writings/`. These are the final writing output of the PhD.

## Required Frontmatter

```yaml
---
type: Chapter
Last_Processed: "YYYY-MM-DD"
Status: Draft | Revised | Final
---
```

## Required Body Structure

- `# Chapter N: [Title]` as the top heading
- Standard thesis structure below (Introduction, sections, Conclusion)
- All prose must comply with TISS Manual of Style (`9 - Knowledge_base/TISS_STYLE.md`)

## Rules

- UK English throughout; run `/style-check` before any submission
- In-text citations use APA author-date format: *(Sharma, 2005)*
- `Last_Processed` updated whenever the chapter is substantially edited
- `Status: Draft` on creation; advance manually as writing matures

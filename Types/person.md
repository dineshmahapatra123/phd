---
type: Type
_icon: user
_color: "#14b8a6"
_folder: "9 - Knowledge_base/People"
_sort: "modified:desc"
---

# Person

A scholar, policymaker, or historically important figure whose work shapes the PhD knowledge base. Created and updated by `/compile-phd` when a source contributes a distinct scholarly lens, bibliography, or institutional role.

## Required Frontmatter

```yaml
---
type: Person
Paper_Linked: "[[Key Paper]]"
Last_Processed: "YYYY-MM-DD"
Status: Seed | Sapling | Evergreen
---
```

## Required Body Sections

1. **Scholarly Lens** — their core philosophical, theoretical, or ideological position
2. **Core Bibliography** — works relevant to the PhD
3. **Inter-Person Links** — who they cite, argue with, extend, or oppose
4. **Methodological Bias** — tools or assumptions they repeatedly use

## Rules

- Check `9 - Knowledge_base/index.md` before creating — no duplicates
- Backlink to the source paper's master note
- Prefer updating an existing person note over creating variants of the same name

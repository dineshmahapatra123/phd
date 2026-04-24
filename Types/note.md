---
type: Type
_icon: file-text
_color: "#22c55e"
_folder: "2 - Notes/Papers"
_sort: "created:desc"
---

# Note

A master note for a single research paper — created automatically by `/scaffold` when a new PDF lands in `7 - Raw/`. One note per paper, forever.

## Required Frontmatter

```yaml
---
type: Note
Paper_Linked: "[[filename.pdf]]"
Last_Processed: "YYYY-MM-DD"
Status: Seed | Sapling | Evergreen
---
```

## Required Body Sections

- `APA Citation from Zotero:` — populated by `/sync-bib`
- `Tags:` — wikilinks to relevant Topic notes
- `## Highlights` — verbatim quotes and raw thoughts pasted by Dinesh
- `## AI Primer` — populated by `/prime` after Highlights are filled

## Rules

- Created only by `/scaffold` — never manually
- `Paper_Linked` is the PDF filename in `7 - Raw/`
- `Last_Processed` is the date scaffold ran (not the date of the paper)
- `Status` starts at `Seed`; update manually as you engage with the paper
- The `## Highlights` section belongs entirely to Dinesh — never overwritten by AI

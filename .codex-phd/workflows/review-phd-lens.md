# Codex Workflow: review-phd-lens

Purpose: generate a holistic, quote-rich thesis review of a paper or book from its converted Markdown source, using `PHD_LENS.md` throughout. This is supplementary knowledge creation and does not edit the permanent KB.

## Output Location

Save Codex reviews under:

```text
1 - Rough/Review/Codex/
```

## Steps

1. Identify the source from the user request.
2. Look for a matching Markdown source in `9 - Knowledge_base/sources/` using case-insensitive and partial filename matching.
3. If no converted source exists, stop and tell the user to run `pdf2md` first.
4. Read `9 - Knowledge_base/PHD_LENS.md` before reading the source. Keep the lens active throughout the review, not only in the thesis-relevance section.
5. Read the full source from `9 - Knowledge_base/sources/`.
6. If a matching master note exists in `2 - Notes/Papers/` and has non-empty `## Highlights`, read those highlights as the user's priority signal. Do not edit `## Highlights`.
7. Generate the review with these mandatory sections:
   - YAML frontmatter: `type: Review`, `Paper_Linked`, `Author`, `Year`
   - Core Argument
   - Conceptual Architecture
   - Empirical Terrain or Evidence and Examples Used
   - Theoretical Lineage
   - Key Passages
   - Internal Tensions and Silences
   - Thesis Relevance - PHD_LENS Filter
   - Ideas and Questions Sparked
8. In `Key Passages`, extract generously but relevance-weighted. Mine thesis-relevant sections deeply; do not force coverage from sections that fail the lens.
9. In `Thesis Relevance`, explicitly apply:
   - Test 1: Research Question Link
   - Test 2: Geographic and Institutional Grounding
   - Test 3: Chapter Mapping
   - Active Debates Engaged
   - Thesis-Sorted Quote Extract
10. Save the review as `1 - Rough/Review/Codex/<AuthorYear_ShortTitle>.md`.
11. Ask whether the user wants a companion quote bank. If yes, save it as `1 - Rough/Review/Codex/<AuthorYear_ShortTitle>_quotes.md`.

## Quote Bank Format

Organize quote banks by:

- Thesis Chapter
- Active Debate
- Concept

Use duplicate quote placement when the same passage is load-bearing across multiple axes.

## Do Not

- Do not create or update Concepts, People, Methods, Topics, Comparisons, or `index.md` from this workflow.
- Do not summarize away direct evidence; preserve page numbers when present in the source.
- Do not use generic paper-review structure if it conflicts with `PHD_LENS.md`.

# Codex Workflow: cite

Purpose: generate a TISS-compliant in-text citation.

## Authority

Read `9 - Knowledge_base/TISS_STYLE.md` section 9 before answering. If any other agent memory conflicts, follow `TISS_STYLE.md`.

## Rules

- Single author: `(Sharma, 2005)`
- Two authors in parentheses: `(Gupta & Singh, 2001)`
- Two authors in prose: `Gupta and Singh (2001)`
- Three or more authors: `(Jha et al., 2010)`
- Direct quote: `(Sharma, 2005, p. 34)`
- Page range: `(Sharma, 2005, pp. 34–36)`
- Multiple works: `(Sharma, 2005; Gupta, 2008)`
- Same author, same year: `(Sharma, 2005a, 2005b)`

## Output

Return the citation only unless the user asks for explanation. If a direct quote is involved and no page number is provided, ask for the page number.

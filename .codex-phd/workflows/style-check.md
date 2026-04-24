# Codex Workflow: style-check

Purpose: lint PhD prose against the TISS Manual of Style.

## Authority

Read `9 - Knowledge_base/TISS_STYLE.md` before checking prose. It is canonical for Codex.

## Checks

- UK English spelling.
- Number rules: spell out one through ninety-nine; use numerals for 100 and above; never start a sentence with a numeral.
- Use `per cent`, not `%`, in body prose.
- Oxford comma in lists of three or more.
- Single quotation marks for short quotations.
- Block quotation treatment for long quotations.
- APA author-date citations with commas: `(Sharma, 2005)`.
- Direct quote page form: `(Sharma, 2005, p. 34)`.
- Use `&` inside parenthetical citations and `and` in prose.
- Replace Latin abbreviations in prose, such as `i.e.`, `e.g.`, and `etc.`.
- En-dash for ranges.
- Heading and indentation rules from `TISS_STYLE.md`.

## Output

Report violations with the offending text, the rule, and the corrected form. If the user asks for edits, return a cleaned version of the passage or patch the provided file.


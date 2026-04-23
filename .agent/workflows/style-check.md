---
description: Lint a passage of PhD prose against the TISS Manual of Style — flags spelling, numbers, punctuation, quotations, citations, heading levels, and indent rules.
---

1. **Load the style reference**
   - Read `9 - Knowledge_base/TISS_STYLE.md` to refresh all rules before checking.

2. **Receive the text**
   - The user will paste prose, provide a file path to a `.md` file in `6 - Writings/`, upload a `.docx` file, or share a Google Doc link/ID.
   - If a file path is given, read the file. If a Google Doc ID is given, use the Google Drive tool to read it.

3. **Run the lint checklist** — check each rule in order and flag every violation:

   **Spelling (UK English)**
   - Flag: *-ize* endings → should be *-ise* (organise, analyse, emphasise, recognise)
   - Flag: *-or* endings → should be *-our* (colour, behaviour, labour, honour)
   - Flag: *center* → *centre*; *program* → *programme*; *catalog* → *catalogue*; *judgment* → *judgement*; *license* (noun) → *licence*
   - Flag: contractions (*don't*, *can't*, *it's*) — replace with full forms in academic prose

   **Numbers**
   - Flag: numerals used for one through ninety-nine in body text (should be words)
   - Flag: words used for 100 and above in body text (should be numerals)
   - Flag: any sentence opening with a numeral — sentence must be recast
   - Flag: *%* in body text → should be *per cent* (two words); *%* is only acceptable in tables and parentheses
   - Flag: *percent* (one word) → should be *per cent*
   - Flag: ranges using a hyphen (*2000-2010*) → should be en-dash (*2000–2010*)

   **Punctuation**
   - Flag: missing Oxford comma before *and* or *or* in a list of three or more items
   - Flag: *&* used in prose (should be *and*; *&* is only allowed inside parenthetical citations and in publisher names)
   - Flag: space around em-dash — no space on either side
   - Flag: double hyphen *--* used as a dash — replace with em-dash or en-dash
   - Flag: colon or *:-* at the end of a subheading — not allowed per TISS

   **Quotations**
   - Flag: double quotation marks (" ") for short run-in quotes — should be single (' ')
   - Flag: quotes exceeding 4 lines or 50 words that are not block-indented
   - Flag: block quotes that still carry quotation marks — remove them
   - Flag: direct quote citation missing a page number — APA requires *(Author, Year, p. X)*
   - Flag: block quote not in TNR 10pt single-spaced (advisory — cannot check font in plain text, remind user)
   - Flag: block quote with no line space above and below (advisory)

   **In-text citations (APA 7th ed.)**
   - Flag: no comma between author and year: *(Sharma 2005)* → *(Sharma, 2005)*
   - Flag: colon before page: *(Sharma, 2005: 34)* → *(Sharma, 2005, p. 34)*
   - Flag: missing *p.* before page number in direct quote: *(Sharma, 2005, 34)* → *(Sharma, 2005, p. 34)*
   - Flag: *and* between authors inside parentheses: *(Gupta and Singh, 2001)* → *(Gupta & Singh, 2001)*
   - Flag: *&* between authors in prose: *Gupta & Singh (2001)* → *Gupta and Singh (2001)*
   - Flag: four or more author names written out in full → should be *et al.*
   - Flag: citation placed after the full stop → must be before the full stop

   **Latin abbreviations in prose**
   - Flag: *i.e.* → write *that is*
   - Flag: *e.g.* → write *for example*
   - Flag: *etc.* → write *and so on*
   - Flag: *viz.* → write *namely*
   - Flag: *cf.* → write *compare*

   **Headings**
   - Flag: Level 1 heading not centred or not bold or not 14pt (advisory)
   - Flag: Level 2 heading not flush left or not bold or not 12pt (advisory)
   - Flag: Level 3 heading written as a standalone heading — it must be a **run-in side head**: bold italic text followed by a period, with paragraph text continuing on the same line
   - Flag: any subheading followed by a colon or *:-*
   - Flag: more than three levels of heading used

   **Indentation**
   - Flag: first paragraph after chapter title, Level 1, or Level 2 subheading has an indent — must have no indent
   - Flag: Level 3 run-in paragraph missing the 0.3" tab indent

   **Passive voice / hedging** (advisory)
   - Flag dense hedging chains (*may perhaps be somewhat*)
   - Suggest active voice rewrites where passive is avoidable without loss of meaning

4. **Report findings**
   - Output a numbered list of violations, each with:
     - The offending text (quoted exactly)
     - The rule it violates (with section reference from TISS_STYLE.md)
     - The corrected version
   - End with a summary line: *X hard errors, Y advisory suggestions.*

5. **Offer to fix**
   - Ask: "Shall I apply all corrections and return the cleaned text?"
   - If yes, rewrite the passage with all hard errors fixed.
   - Mark advisory suggestions inline as `[ADVISORY: suggestion]` for the user to decide.

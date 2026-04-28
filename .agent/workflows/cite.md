---
description: Generate a correctly formatted TISS in-text author-date citation for any source type or edge case.
---

1. **Load the style reference**
   - Read `9 - Knowledge_base/TISS_STYLE.md`, section 9 (In-Text Citations).

2. **Receive the citation request**
   - The user will provide the author name(s), year, and optionally a page number or page range.
   - They may also describe the edge case (e.g., "two works same author", "three authors", "no author", "institutional source").

3. **Apply the correct citation format** from TISS_STYLE.md §9 (Chicago author-date):

   | Case | Format |
   |------|--------|
   | Single author | `(Stone 2008)` |
   | Single author with page | `(Stone 2008: 42)` |
   | Single author, page range | `(Stone 2008: 5–6)` |
   | Single author, multiple works | `(Stone 1984, 1988a, 2008)` |
   | Same author, same year | `(Stone 1988a, 1988b)` |
   | Two authors | `(Grindle and Thomas 1989)` |
   | Three or more authors | `(True et al. 2007)` |
   | Multiple separate authors/works | `(Stone 1984; Grindle and Thomas 2007; Soni 2017)` |
   | Institutional / organisational author | `(Government of Karnataka 2006)` or `(NCRB 2017)` |
   | Secondary reference | `(quoted in or cited in ....)` |
   | Author name in running text | `Stone (2008) argues…` |
   | Two authors in running text | `Grindle and Thomas (1989) argue…` |

4. **Key formatting rules to enforce**:
   - **No comma** between author and year: `(Stone 2008)` — this is Chicago, not APA
   - **Colon** before page number: `(Stone 2008: 42)` — not "p." and not a comma
   - Use **"and"** between co-authors in all contexts — both inside parentheses and in prose
   - **Never use "&"** in citations (& is only acceptable in book titles and publisher names)
   - *et al.* for three or more authors from the first citation
   - Citation placed **before** the full stop at sentence end
   - Footnotes must NOT be used for citations

5. **Output**
   - Print the in-text citation, clearly formatted.
   - If the user also needs the full bibliography entry, offer to run `/bib-format` for the same source.
   - If the citation is for a direct quote and no page number is given, prompt: "Direct quotes require a page number — please confirm the page."

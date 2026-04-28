---
description: Generate a correctly formatted TISS in-text author-date citation for any source type or edge case.
---

1. **Load the style reference**
   - Read `9 - Knowledge_base/TISS_STYLE.md`, section 9 (In-Text Citations).

2. **Receive the citation request**
   - The user will provide the author name(s), year, and optionally a page number or page range.
   - They may also describe the edge case (e.g., "two works same author", "three authors", "no author", "institutional source").

3. **Apply the correct citation format** from TISS_STYLE.md §9 (APA 7th edition):

   | Case | Format |
   |------|--------|
   | Single author | `(North, 1990)` |
   | Single author with page | `(North, 1990, p. 34)` |
   | Single author, page range | `(North, 1990, pp. 34–36)` |
   | Single author, multiple works | `(North, 1984, 1990)` |
   | Same author, same year | `(North, 1990a, 1990b)` |
   | Two authors | `(Feder & Feeny, 1991)` |
   | Three or more authors | `(True et al., 2007)` |
   | Multiple separate works | `(North, 1990; Feder & Feeny, 1991)` |
   | Institutional author | `(World Bank, 2006)` |
   | No author | Shortened title in italics: `(*Land Report*, 2003)` |
   | Forthcoming | `(North, in press)` |
   | Secondary reference | `(as cited in North, 1990)` |
   | Author name in running text | `North (1990) argues…` |
   | Two authors in running text | `Feder and Feeny (1991) show…` |

4. **Key formatting rules to enforce**:
   - **Comma** between author and year: `(North, 1990)` — not `(North 1990)`
   - **Comma + p.** before page: `(North, 1990, p. 34)` — not a colon
   - **"&"** between co-authors inside parenthetical citations
   - **"and"** between co-authors in prose: `Feder and Feeny (1991)`
   - *et al.* with comma for three or more authors: `(True et al., 2007)`
   - Citation placed **before** the full stop at sentence end
   - Footnotes must NOT be used for citations

5. **Output**
   - Print the in-text citation, clearly formatted.
   - If the user also needs the full bibliography entry, offer to run `/bib-format` for the same source.
   - If the citation is for a direct quote and no page number is given, prompt: "Direct quotes require a page number — please confirm the page."

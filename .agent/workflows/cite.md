---
description: Generate a correctly formatted TISS in-text author-date citation for any source type or edge case.
---

1. **Load the style reference**
   - Read `9 - Knowledge_base/TISS_STYLE.md`, section 9 (In-Text Citations).

2. **Receive the citation request**
   - The user will provide the author name(s), year, and optionally a page number or page range.
   - They may also describe the edge case (e.g., "two works same author", "three authors", "no author", "institutional source").

3. **Apply the correct citation format** from TISS_STYLE.md §9:

   | Case | Format |
   |------|--------|
   | Single author | `(Sharma, 2005)` |
   | Two authors | `(Gupta & Singh, 2001)` |
   | Three or more authors | `(Jha et al., 2010)` |
   | Direct quote with page | `(Sharma, 2005, p. 34)` |
   | Direct quote with page range | `(Sharma, 2005, pp. 34–36)` |
   | Multiple works by same author | `(Sharma, 2003, 2005)` |
   | Same author, same year | `(Sharma, 2005a, 2005b)` |
   | Two different works in one citation | `(Sharma, 2005; Gupta, 2008)` |
   | Institutional / organisational author | `(NSSO, 2011)` |
   | No identifiable author | Shortened title in italics: `(*Land Report*, 2003)` |
   | In press / forthcoming | `(Sharma, in press)` |
   | Personal communication | `(R. Sharma, personal communication, March 14, 2022)` |
   | Author name used in sentence | `Sharma (2005) argues…` |
   | Two authors in prose | `Gupta and Singh (2001) argue…` |

4. **Key formatting rules to enforce**:
   - **Comma** between author and year: `(Sharma, 2005)` — this is APA, not Chicago
   - **Comma + p.** before page: `(Sharma, 2005, p. 34)` — not a colon
   - Use **&** inside parenthetical citations; use **and** in prose
   - *et al.* from the first citation for three or more authors (APA 7th ed.)
   - Place citation **before** the full stop at sentence end, not after

5. **Output**
   - Print the in-text citation, clearly formatted.
   - If the user also needs the full bibliography entry, offer to run `/bib-format` for the same source.
   - If the page number is a direct quote, remind: "Direct quotes require a page number — please confirm the page."

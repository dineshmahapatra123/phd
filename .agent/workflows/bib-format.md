---
description: Format a raw citation into a correctly structured TISS bibliography entry. Handles books, chapters, journals, newspapers, internet, blog/social media, unpublished works, and court cases.
---

1. **Load the style reference**
   - Read `9 - Knowledge_base/TISS_STYLE.md`, section 10 (Bibliography Formats).

2. **Receive the citation details**
   - The user will provide raw citation details in any form (BibTeX, DOI, free text, or a mix of fields).
   - If only a DOI or title is given, ask the user to confirm the key fields before proceeding (author, year, title, journal/publisher, volume, issue, pages).
   - If the user provides a BibTeX entry from `PhD.bib`, parse it directly.

3. **Identify the source type** — ask the user if ambiguous:
   - Book
   - Edited book
   - Chapter in edited book
   - Journal/periodical article
   - Newspaper article
   - Internet source
   - Blog / social media post
   - Unpublished work (thesis, working paper, conference paper)
   - Court case / legal document

4. **Apply the correct format template** (APA 7th edition, from TISS_STYLE.md §10):

   **Book**:
   `Surname, F. (Year). *Title in sentence case: Subtitle*. Publisher.`
   Example: `North, D. C. (1990). *Institutions, institutional change and economic performance*. Cambridge University Press.`

   **Edited book**:
   `Surname, F. (Ed.). (Year). *Title in sentence case*. Publisher.`
   (Multiple editors: `(Eds.)`)

   **Chapter in edited book**:
   `Surname, F. (Year). Chapter title in sentence case. In F. Surname (Ed.), *Book title* (pp. XX–XX). Publisher.`

   **Journal article**:
   `Surname, F. (Year). Article title in sentence case. *Journal Name*, *Vol*(No), XX–XX. https://doi.org/xxx`
   Example: `Feder, G., & Feeny, D. (1991). Land tenure and property rights: Theory and implications for development policy. *The World Bank Economic Review*, *5*(1), 135–153.`

   **Newspaper**:
   `Surname, F. (Year, Month Day). Article title. *Newspaper Name*, p. X.`

   **Internet source**:
   `Surname, F. (Year). Title. Retrieved Month Day, Year, from URL`

   **Blog / social media**:
   `Surname, F. [@handle]. (Year, Month Day). Post title or opening words [Post type]. Platform. URL`

   **Unpublished (thesis, working paper)**:
   `Surname, F. (Year). *Title* [Doctoral dissertation / Unpublished manuscript]. Institution.`
   Example: `Palan, R. (2017). *Disabled students in higher education* [Doctoral dissertation]. Tata Institute of Social Sciences.`

   **Court case**:
   Court cases are cited in **footnotes/endnotes only**, not in References.
   Format: `Case Name, Volume Reporter Page (Court Year).`

5. **Apply global APA 7th References rules** (always):
   - Section heading: **References**
   - **Sentence case** for book and article titles: capitalise only first word, proper nouns, first word after colon
   - *Italics* for book titles and journal names; journal volume number also italicised
   - **"&"** between co-authors in reference list; list all authors (no *et al.* in references)
   - Year in parentheses after author: `North, D. C. (1990).`
   - No city of publication (APA 7th dropped this)
   - Include DOI where available; URL with retrieval date for webpages
   - Hanging indent 0.3"; single line spacing; TNR 12
   - No *ibid.*, *op. cit.*, or *loc. cit.*

6. **Output**
   - Print the formatted bibliography entry, ready to paste.
   - Also print the corresponding **in-text citation**: `(North, 1990)` or `(North, 1990, p. 34)`.
   - If the user is adding this to `PhD.bib`, remind them to run `/sync-bib` after updating Zotero.

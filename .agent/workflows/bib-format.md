---
description: Format a raw citation into a correctly structured TISS bibliography entry. Handles books, chapters, journals, newspapers, internet, blog/social media, unpublished works, and court cases.
---

1. **Load the style reference**
   - Read `9 - Knowledge_base/TISS_STYLE.md`, section 10 (Bibliography Formats).

2. **Receive the citation details**
   - The user will provide raw citation details in any form (BibTeX, DOI, free text, or a mix of fields).
   - If only a DOI or title is given, ask the user to confirm the key fields before proceeding (author, year, title, journal/publisher, volume, issue, pages, place).
   - If the user provides a BibTeX entry from `PhD.bib`, parse it directly.

3. **Identify the source type** — ask the user if ambiguous:
   - Book
   - Chapter in edited book
   - Journal article
   - Newspaper article
   - Internet source
   - Blog / social media post
   - Unpublished work (thesis, report, working paper, mimeo)
   - Court case / legal document

4. **Apply the correct format template** (from TISS_STYLE.md §10):

   **Book**:
   `Surname, F. (Year). *Title in italics: Subtitle*. Publisher.`

   **Edited book**:
   `Surname, F. (Ed.). (Year). *Title*. Publisher.`
   (Multiple editors: `(Eds.)`)

   **Chapter in edited book**:
   `Surname, F. (Year). Chapter title. In F. Surname (Ed.), *Book title* (pp. XX–XX). Publisher.`

   **Journal article**:
   `Surname, F. (Year). Article title. *Journal Name*, *Vol*(No), XX–XX. https://doi.org/xxx`

   **Newspaper**:
   `Surname, F. (Year, Month Day). Article title. *Newspaper Name*, p. X.`

   **Internet source**:
   `Surname, F. (Year). Title. Retrieved Month Day, Year, from URL`

   **Blog / social media**:
   `Surname, F. [@handle]. (Year, Month Day). Post title or opening words [Post type]. Platform. URL`

   **Unpublished (thesis, working paper)**:
   `Surname, F. (Year). *Title* [Type, e.g., Doctoral dissertation]. Institution. URL or database.`

   **Court case**:
   `*Case Name*, Volume Reporter Page (Court Year).`

5. **Apply global APA References rules** (always):
   - Section heading: **References** (not Bibliography)
   - All author names inverted: *Surname, F.*
   - **Sentence case** for book and article titles (capitalise only: first word, proper nouns, first word after a colon)
   - *Italics* for book titles and journal names; journal volume number also italicised
   - No *ibid.*, *op. cit.*, or *loc. cit.*
   - Page ranges use en-dash: *pp. 45–52*
   - Include DOI where available; URL with retrieval date for webpages
   - No quotation marks around article or chapter titles

6. **Output**
   - Print the formatted bibliography entry, ready to paste.
   - Also print the corresponding **in-text citation** format: *(Surname Year)* or *(Surname Year: page)*.
   - If the user is adding this to `PhD.bib`, remind them to run `/sync-bib` after updating Zotero.

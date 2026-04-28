---
description: Format a raw citation into a correctly structured TISS bibliography entry. Handles books, chapters, journals, newspapers, internet, blog/social media, unpublished works, and court cases.
---

1. **Load the style reference**
   - Read `9 - Knowledge_base/TISS_STYLE.md`, section 10 (Bibliography Formats).

2. **Receive the citation details**
   - The user will provide raw citation details in any form (BibTeX, DOI, free text, or a mix of fields).
   - If only a DOI or title is given, ask the user to confirm the key fields before proceeding (author, year, title, journal/publisher, volume, issue, pages, city of publication).
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

4. **Apply the correct format template** (Chicago author-date, from TISS_STYLE.md §10):

   **Book**:
   `Surname, First Name. Year. Title in Title Case. City: Publisher.`
   Example: `Stone, Deborah. 1988. Policy Paradox: The Art of Political Decision Making. London: W. W. Norton and Co.`

   **Edited book**:
   `Surname, First Name (ed.). Year. Title in Title Case. City: Publisher.`
   (Multiple editors: `(eds.)`)

   **Chapter in edited book**:
   `Surname, First Name. Year. 'Chapter Title in Title Case', in First Name Surname (ed.): Book Title. City: Publisher, pp. XX–XX.`

   **Journal article**:
   `Surname, First Name. Year. 'Article Title in Title Case'. Journal Name Vol (No): XX–XX.`

   **Newspaper**:
   `Surname, First Name. Year. 'Article Title', Newspaper Name (City), Day Month, p. X.`

   **Internet source**:
   `Surname, First Name. Year. 'Article Title', (URL) (accessed on Day Month Year).`

   **Blog / social media**:
   `Surname, First Name. Year. 'Entry Title' (blog), (URL) (accessed on Day Month Year).`
   For Twitter: include day, month, year, time, and tweet URL.

   **Unpublished (thesis, working paper, conference paper)**:
   `Surname, First Name. Year. 'Title'. [Type]. Institution, Date.`
   Example (thesis): `Palan, Ruchi. 2017. Disabled Students in Higher Education. Unpublished Ph.D. Thesis. Mumbai: Tata Institute of Social Sciences.`
   Example (conference): `Jayaram, N. 2017. 'Dynamics of Symbolic Inclusion in a "Secular" State'. Paper presented at National Seminar on Secularism, Equality, and Inclusion, Guru Nanak Dev University, Amritsar, 10–11 March 2017.`

   **Court case**:
   Court cases are cited in **footnotes/endnotes only**, not in Bibliography/References.
   Format: `Case Name (Reporter Year Court Docket).`
   Example: `Keshavananda Bharati v. The State of Kerala and Others (AIR 1973 SC 1461).`

5. **Apply global bibliography rules** (always):
   - Section heading: **Bibliography** or **References** or **Bibliography and References**
   - **Title case**: capitalise all major words — nouns, pronouns, adjectives, verbs, adverbs, subordinate conjunctions; lowercase articles, co-ordinate conjunctions, and prepositions
   - **Single inverted commas** around chapter and article titles (not italics, not double marks)
   - *Italics* for book and journal titles
   - **Year after author name, no parentheses**: `Stone, Deborah. 1988.`
   - **City of publication** for books: `London: W. W. Norton and Co.`
   - All co-authors listed by full name; first author inverted, others in normal order
   - Page ranges use en-dash: `pp. 155–187`
   - URL with access date for internet sources; no DOI required unless available
   - No *ibid.*, *op. cit.*, or *loc. cit.*
   - Hanging indent 0.3"; single line spacing; TNR 12

6. **Output**
   - Print the formatted bibliography entry, ready to paste.
   - Also print the corresponding **in-text citation**: `(Stone 1988)` or `(Stone 1988: 42)`.
   - If the user is adding this to `PhD.bib`, remind them to run `/sync-bib` after updating Zotero.

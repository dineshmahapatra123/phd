# Codex Workflow: bib-format

Purpose: format references according to the TISS bibliography rules, which follow APA-style reference formatting in `TISS_STYLE.md` section 10.

## Authority

Read `9 - Knowledge_base/TISS_STYLE.md` section 10 before formatting. If style memories conflict, follow `TISS_STYLE.md`.

## Process

1. Identify the source type: book, edited book, chapter, journal article, newspaper article, internet source, blog/social media, unpublished work, thesis, report, working paper, or legal document.
2. Confirm missing fields if the source is ambiguous.
3. Apply sentence case to book, chapter, article, report, and thesis titles.
4. Preserve proper nouns.
5. Use italics for book titles, journal titles, and journal volume numbers.
6. Use en-dashes in page ranges.
7. Include DOI or URL where available.

## Output

Return:

1. The formatted reference entry.
2. The matching in-text citation, using commas: `(Surname, Year)` or `(Surname, Year, p. X)`.


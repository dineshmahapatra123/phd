---
description: Identifies the correct title of a PDF using web search and renames the file to a clean, sentence-case format.
---

1.  **Input Identification**
    *   Identify the target PDF file from the user's request. If no single file is specified, ask the user to clarify which file they want to rename. (Do not batch rename unless explicit).

2.  **Metadata Discovery**
    *   Search the web for the file's current filename or any visible keywords to identify the *actual* academic paper.
    *   Query example: `"[Current Filename]" exact title author`
    *   Find the authoritative title (e.g., from Google Scholar, JSTOR, publisher site).

3.  **Name Formatting**
    *   Construct the new filename using **Sentence case** (only the first word and proper nouns capitalized).
    *   **CRITICAL**: You MUST use the exact, literal paper title as it appears on the publication. Do NOT summarize or guess a radically different name.
    *   **Sanitization**: If the official title contains illegal characters for filenames or characters that break scripts (like `:` or `?`), replace them with an underscore `_`.
        *   Example: `"In the Name of Eminent Domain": A Perspective...` becomes `In the Name of Eminent Domain_ A Perspective...`
    *   Format: `[Exact Title sanitized].pdf`
    *   *Example*:
        *   Original: `THE_NATURE_OF_THE_FIRM_COASE.pdf`
        *   Found Title: "The Nature of the Firm"
        *   New Name: `The nature of the firm.pdf`
    *   *Constraint*: Do not include the author's name in the filename unless explicitly requested. Keep it clean and identical to the actual publisher's title.

4.  **Renaming**
    *   Use the Bash tool to run `mv` and rename the file.
    *   Ensure the path is absolute.
    *   Quote the paths to handle spaces correctly.

5.  **Confirmation**
    *   Report back to the user: "Renamed '[Old Name]' to '[New Name]'".

---
description: Shatter a PhD research paper (.pdf or .md) into atomic Wiki articles (Concepts, People, Methods).
---

# /compile-phd Workflow

Use this command to process a research paper—either a new PDF from your inbox or an existing Markdown note—into your permanent `9 - Knowledge_base/`.

### 1. Source Identification
- **Default**: Lookup in `7 - Raw/` for a matching PDF if no path is provided.
- **Categorical**: If a specific file name or path is provided (e.g., `My Note.md` or `/Clippings/article.pdf`), use that as the primary source.

### 2. The Bridge (Source Standardization)
- **Case A: PDF Source**
    - **Check**: Does `9 - Knowledge_base/sources/[Name].md` exist?
    - **Action**: If not, invoke the `/pdf2md` command on the PDF and save output to `9 - Knowledge_base/sources/`.
- **Case B: Markdown Source**
    - **Action**: If the file is not already in `9 - Knowledge_base/sources/`, **copy** it there to establish a permanent record of the source for the shattering.

### 3. Deconstruction (The Shattering)
- Read the FULL TEXT from `9 - Knowledge_base/sources/[Name].md`.
- Analyze against your `9 - Knowledge_base/PHD_SCHEMA.md`.
- **Create/Update**:
    - **Concepts**: Extract theoretical definitions and debates.
    - **Methods**: Extract the research design and design logic.
    - **People**: Map the author's lens and scholarly network.

### 4. Backlinking & Indexing
- Link all new wiki articles to each other.
- Link them back to the original source (`2 - Notes/Papers/` for papers, or the source file for notes).
- Update `9 - Knowledge_base/index.md` with the new entries.

---

> [!NOTE]
> This workflow is rigorous. It prioritizes academic finding and methodological "how" over general summary.


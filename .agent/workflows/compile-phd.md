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
    - **Action**: If not, run **`@[/pdf2md]`** on the PDF — output lands in `9 - Knowledge_base/sources/` automatically. 
        - *Tip*: For technical papers, use `--hybrid docling-fast` to capture formulas and tables.
- **Case B: Markdown Source**
    - **Action**: If the file is not already in `9 - Knowledge_base/sources/`, **copy** it there to establish a permanent record of the source for the shattering.
- In both cases, read the full text from `9 - Knowledge_base/sources/[Name].md` for shattering.

### 3. Deconstruction (The Shattering)
- Read the FULL TEXT from `9 - Knowledge_base/sources/[Name].md`.
- Analyze against `9 - Knowledge_base/PHD_SCHEMA.md` and the Type definitions in `Types/`.
- **Create/Update** — each file must open with its correct YAML frontmatter:
    - **Concepts** (`Types/concept.md`): `type: Concept` + `Paper_Linked`, `Last_Processed`, `Status`, `Related`, `Contradicts`
    - **Methods** (schema in `PHD_SCHEMA.md`): `type: Method` + `Paper_Linked`, `Last_Processed`, `Status`
    - **People** (schema in `PHD_SCHEMA.md`): `type: Person` + `Paper_Linked`, `Last_Processed`, `Status`
- Topics are **not** created here — they are managed by `/refresh-topic`.
- **Contradiction Rule**: If a claim in this paper directly contradicts an existing wiki note, do NOT overwrite. Instead add a `### ⚠️ Contradiction` section to the existing note and set `Contradicts: [[conflicting note]]` in its YAML frontmatter.

#### YAML Field Rules (mandatory — do not deviate)

**`Paper_Linked`** — links to the PDF in `7 - Raw/`, always with `.pdf` extension.
- Single PDF → inline: `Paper_Linked: "[[Filename.pdf]]"`
- Multiple PDFs → YAML list (one per line, so each is clickable in Obsidian):
  ```yaml
  Paper_Linked:
    - "[[Paper A.pdf]]"
    - "[[Paper B.pdf]]"
  ```
- Never link to `2 - Notes/Papers/` master notes or KB files here.

**`Related`** (Concepts only) — links to other KB files (Concepts, People, Methods, Topics). Never PDFs, never paper notes.
- Single link → inline: `Related: "[[Concept A]]"`
- Multiple links → YAML list:
  ```yaml
  Related:
    - "[[Concept A]]"
    - "[[Concept B]]"
  ```

**`## Also Appears In`** (body section, Concepts only) — links to master notes in `2 - Notes/Papers/` (no `.pdf` extension). These are secondary papers that discuss the concept beyond the primary `Paper_Linked`. Never link to PDFs or KB files here.

### 4. Backlinking & Indexing
- Link all new wiki articles to each other.
- Link them back to master notes in `2 - Notes/Papers/` (not to PDFs) in the `## Also Appears In` body section.
- Update `9 - Knowledge_base/index.md` with the new entries.

### 5. Activity Log
- Follow `9 - Knowledge_base/PHD_CONSTITUTION.md` → Operational Logging.
- Add only a compact **SHATTER** ledger entry to `9 - Knowledge_base/log.md`.
- Put detailed created/updated note lists, source artifacts, contradictions, and caveats in a dated audit file under `9 - Knowledge_base/logs/`.

---

> [!NOTE]
> This workflow is rigorous. It prioritizes academic finding and methodological "how" over general summary.

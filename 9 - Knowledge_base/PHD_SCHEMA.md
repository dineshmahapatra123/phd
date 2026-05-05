# PhD Knowledge Base: The Neural Schema (v3.0)

This schema defines how scholarly research is "shattered" into the PhD Wiki. It prioritizes methodological rigor and theoretical lineage over simple topical summaries.

> **Type definitions live in `Types/`** — one file per note type, each with its required frontmatter and sections. The table below is the quick reference; always check the Type file for the canonical spec.

---

## Note Types (Quick Reference)

| Type | Folder | Created by | Indexed? |
|------|--------|-----------|----------|
| `Note` | `2 - Notes/Papers/` | `/scaffold` | No |
| `Chapter` | `6 - Writings/` | Manual | No |
| `Concept` | `9 - Knowledge_base/Concepts/` | `/compile-phd` | Yes |
| `Topic` | `9 - Knowledge_base/Topics/` | `/refresh-topic` | Yes |
| `Comparison` | `9 - Knowledge_base/Comparisons/` | Manual / research | Yes |
| `Query` | `9 - Knowledge_base/Queries/` | Research interactions | **No** |
| `Person` | `9 - Knowledge_base/People/` | `/compile-phd` | Yes |
| `Method` | `9 - Knowledge_base/Methods/` | `/compile-phd` | Yes |
| `Paper` | `2 - Notes/Papers/` | Manual / future paper workflow | No |
| `Book` | `2 - Notes/Books/` | Manual | No |
| `Tweet` | `Tweets/` | Manual / clipping | No |
| `Clip` | `Clippings/` | Manual / clipping | No |

---

## Scope

This schema governs scholarly vault notes and wiki pages: Notes, Chapters, Concepts, Topics, Comparisons, Queries, People, Methods, Papers, Books, Tweets, and Clips. Operational Markdown files such as workflows, logs, prompts, templates, and agent instructions are exempt unless they explicitly declare a type.

## YAML Frontmatter by Type

### Note (`Types/note.md`)
```yaml
---
type: Note
Paper_Linked: "[[filename.pdf]]"
Last_Processed: "YYYY-MM-DD"
Status: Seed | Sapling | Evergreen
---
```

### Chapter (`Types/chapter.md`)
```yaml
---
type: Chapter
Last_Processed: "YYYY-MM-DD"
Status: Draft | Revised | Final
---
```

### Concept (`Types/concept.md`)

> **Paper_Linked rules** (apply to ALL types below):
> - Always links to the **PDF file in `7 - Raw/`** — include the `.pdf` extension.
> - Single PDF: `Paper_Linked: "[[filename.pdf]]"`
> - Multiple PDFs: use YAML list format so each link is independently clickable in Obsidian:
>   ```yaml
>   Paper_Linked:
>     - "[[Paper A.pdf]]"
>     - "[[Paper B.pdf]]"
>   ```
> - Never link to master notes (`2 - Notes/Papers/`) or KB files here.
>
> **Related rules** (Concept only):
> - Contains only links to other KB files (Concepts, People, Methods, Topics) — never PDFs, never paper notes.
> - Single link: `Related: "[[Concept A]]"`
> - Multiple links: use YAML list format:
>   ```yaml
>   Related:
>     - "[[Concept A]]"
>     - "[[Concept B]]"
>   ```
>
> **Also Appears In** (body section, Concept only):
> - Links to master notes in `2 - Notes/Papers/` — no `.pdf` extension, never KB files.
> - These are secondary papers that discuss the concept beyond the primary `Paper_Linked`.

```yaml
---
type: Concept
Paper_Linked: "[[Paper Title.pdf]]"
Last_Processed: "YYYY-MM-DD"
Status: Seed | Sapling | Evergreen
Related: "[[Concept A]]"
Contradicts: ""
---
```

### Topic (`Types/topic.md`)
```yaml
---
type: Topic
Paper_Linked:
  - "[[Paper A.pdf]]"
  - "[[Paper B.pdf]]"
Last_Processed: "YYYY-MM-DD"
Status: Seed | Sapling | Sapling++ | Evergreen
---
```

### Comparison (`Types/comparison.md`)
```yaml
---
type: Comparison
Paper_Linked:
  - "[[Paper A.pdf]]"
  - "[[Paper B.pdf]]"
Last_Processed: "YYYY-MM-DD"
Status: Seed | Sapling | Evergreen
---
```

### Query (`Types/query.md`)
```yaml
---
type: Query
Query: "The exact research question"
Last_Processed: "YYYY-MM-DD"
Status: Permanent Log
---
```

### Person (`Types/person.md`)
```yaml
---
type: Person
Paper_Linked: "[[Key Paper.pdf]]"
Last_Processed: "YYYY-MM-DD"
Status: Seed | Sapling | Evergreen
---
```

### Method (`Types/method.md`)
```yaml
---
type: Method
Paper_Linked: "[[Paper where method is used.pdf]]"
Last_Processed: "YYYY-MM-DD"
Status: Seed | Sapling | Evergreen
---
```

### Paper (`Types/paper.md`)
```yaml
---
type: Paper
Paper_Linked: "[[filename.pdf]]"
Last_Processed: "YYYY-MM-DD"
Status: Seed | Sapling | Evergreen
APA_Citation: ""
DOI:
Authors:
Year:
---
```

### Book (`Types/book.md`)
```yaml
---
type: Book
Last_Processed: "YYYY-MM-DD"
Status: Seed | Sapling | Evergreen
APA_Citation: ""
Authors:
Year:
Publisher:
ISBN:
---
```

### Tweet (`Types/tweet.md`)
```yaml
---
type: Tweet
Last_Processed: "YYYY-MM-DD"
Status: Inbox | Processed | Archived
Author:
Handle:
URL:
Date_Posted:
Tags:
---
```

### Clip (`Types/clip.md`)
```yaml
---
type: Clip
Last_Processed: "YYYY-MM-DD"
Status: Inbox | Processed | Archived
Source:
Author:
URL:
Date_Published:
Tags:
---
```

---

## Body Sections by Type

### Concept
1. **Standard Definition** — the canonical academic meaning
2. **Scholarly Debate** — how different schools define this (e.g., [[Author1]] vs [[Author2]])
3. **PhD Application** — how this maps to your thesis
4. **Measurement / Methods** — how researchers operationalise this
5. **Also Appears In** — wikilinks to paper master notes where this concept appears (beyond the primary `Paper_Linked`)

### Person
- **Scholarly Lens** — their core philosophical or ideological position
- **Core Bibliography** — their most cited works relevant to your PhD
- **Inter-Person Links** — who do they argue with / cite?
- **Methodological Bias** — tools they consistently use

### Method
- **Description** — what the design is (e.g., DiD, Case Study, Mixed Methods)
- **Strengths / Weaknesses** — when to use it, when it fails
- **PhD Relevance** — is this a candidate method for your chapters?

### Topic
1. **The Big Question** — the core disagreement
2. **Timeline** — how the debate has evolved (20–50 years)
3. **Key Arguments** — main positions with paper attributions
4. **State of the Art** — current consensus (or lack of it)
5. **PhD Relevance** — how this connects to your thesis
6. **Related Concepts** — wikilinks to Concept notes

### Comparison
1. **Comparison Question**
2. **Axis of Comparison**
3. **Side-by-Side Analysis** (table preferred)
4. **Synthesis**
5. **PhD Relevance**

### Query
1. **Query** — restate the full question
2. **Reasoning Path** — which sources were used
3. **Key Answer** — the synthesis
4. **Next Steps** — follow-up questions or gaps
5. **Status** — always `Permanent Log`

### Paper
1. **Citation**
2. **Research Question**
3. **Argument**
4. **Method / Evidence**
5. **Key Passages**
6. **PhD Relevance**
7. **Links**

### Book
1. **Citation**
2. **Central Argument**
3. **Chapter Map**
4. **Key Passages**
5. **Concepts / Methods**
6. **PhD Relevance**
7. **Links**

### Tweet
1. **Original / Capture**
2. **Why It Matters**
3. **Extracted Idea**
4. **Action / Linkage**

### Clip
1. **Source**
2. **Captured Text / Summary**
3. **Key Claims**
4. **Use in PhD**
5. **Next Action**

---

> [!IMPORTANT]
> **The Karpathy Rules**:
> 1. **Index First**: Always scan `index.md` before creating a page.
> 2. **Neural Snowball**: **APPEND/UPDATE** existing pages; do not recreate.
> 3. **Conflict Detection**: If a new source contradicts an existing one, create a `### ⚠️ Contradiction` section and set `Contradicts:` in YAML.
> 4. **Type First**: Every new scholarly note governed by this schema must open with the correct YAML frontmatter for its type. No exceptions.

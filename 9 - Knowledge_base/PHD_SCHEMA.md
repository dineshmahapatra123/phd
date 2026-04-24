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

---

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
```yaml
---
type: Concept
Paper_Linked: "[[Paper Title]]"
Last_Processed: "YYYY-MM-DD"
Status: Seed | Sapling | Evergreen
Related: "[[Concept A]], [[Concept B]]"
Contradicts: "[[Conflicting Concept]]"
---
```

### Topic (`Types/topic.md`)
```yaml
---
type: Topic
Paper_Linked: "[[Paper A]], [[Paper B]]"
Last_Processed: "YYYY-MM-DD"
Status: Seed | Sapling | Sapling++ | Evergreen
---
```

### Comparison (`Types/comparison.md`)
```yaml
---
type: Comparison
Paper_Linked: "[[Paper A]], [[Paper B]]"
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

### Person (no Type file — governed here)
```yaml
---
type: Person
Paper_Linked: "[[Key Paper]]"
Last_Processed: "YYYY-MM-DD"
Status: Seed | Sapling | Evergreen
---
```

### Method (no Type file — governed here)
```yaml
---
type: Method
Paper_Linked: "[[Paper where method is used]]"
Last_Processed: "YYYY-MM-DD"
Status: Seed | Sapling | Evergreen
---
```

---

## Body Sections by Type

### Concept
1. **Standard Definition** — the canonical academic meaning
2. **Scholarly Debate** — how different schools define this (e.g., [[Author1]] vs [[Author2]])
3. **PhD Application** — how this maps to your thesis
4. **Measurement / Methods** — how researchers operationalise this
5. **Related Papers** — wikilinks to paper master notes

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

---

> [!IMPORTANT]
> **The Karpathy Rules**:
> 1. **Index First**: Always scan `index.md` before creating a page.
> 2. **Neural Snowball**: **APPEND/UPDATE** existing pages; do not recreate.
> 3. **Conflict Detection**: If a new source contradicts an existing one, create a `### ⚠️ Contradiction` section and set `Contradicts:` in YAML.
> 4. **Type First**: Every new `.md` file must open with the correct YAML frontmatter for its type. No exceptions.

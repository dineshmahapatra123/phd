# PhD Knowledge Base: The Neural Schema (v2.0)

This schema defines how scholarly research is "shattered" into the PhD Wiki. It prioritizes methodological rigor and theoretical lineage over simple topical summaries.

---

## YAML Frontmatter (Standard for All Wiki Pages)
Every new conceptual, person, or method note must include the following metadata:

```yaml
Type: Concept | Person | Method
Paper_Linked: [[Paper Title]]
Last_Processed: YYYY-MM-DD
Status: Seed | Sapling | Evergreen
Contradicts: [[Conflict File]]
```

---

## 1. Concepts (`/Concepts/`)
*Goal: Building the theoretical arsenal for the thesis.*

- **Standard Definition**: The canonical academic meaning.
- **Scholarly Debate**: How different schools of thought define this differently (e.g., [[Author1]] vs [[Author2]]).
- **PhD Application**: How this concept specifically maps to your thesis problem.
- **Measurement/Methods**: How researchers actually "capture" or measure this concept.
- **Related Papers**: Automatic links to processed PDFs.

---

## 2. People (`/People/`)
*Goal: Mapping the scholarly network of your field.*

- **Scholarly Lens**: What is their core philosophical or ideological position?
- **Core Bibliography**: Their most cited works related to your PhD theme.
- **Inter-Person Links**: Who do they argue with? Who do they cite as a mentor?
- **Methodological Bias**: What tools do they consistently use?

---

## 3. Methods (`/Methods/`)
*Goal: Building a toolkit of research designs.*

- **Description**: What is the design (e.g., Difference-in-Differences, Case Study, Mixed Methods)?
- **Strengths/Weaknesses**: Why use this? When does it fail?
- **PhD Relevance**: Is this a candidate method for your own chapters?

---

## 4. Topics & Debates (`/Topics/`)
*Goal: Tracking the long-term conversations in the literature.*

- **The Big Question**: What is the core disagreement this topic covers?
- **Timeline**: How has this debate evolved over the last 20-50 years?

---

## 5. Queries (`/Queries/`)
*Goal: Archiving deep research interactions and AI-synthesized answers.*

- **Query**: The specific question or research problem.
- **Reasoning Path**: Brief note on which papers/concepts were used to generate the answer.
- **Key Answer**: The core synthesis or result.
- **Next Steps**: Suggestions for further research or follow-up questions.
- **Status**: `Permanent Log`.

---

> [!IMPORTANT]
> **The Karpathy Rules**: 
> 1. **Index First**: Always scan `index.md` before creating a page.
> 2. **Neural Snowball**: **APPEND/UPDATE** existing pages; do not recreate. 
> 3. **Conflict Detection**: If a new source contradicts an existing one, create a `### ⚠️ Contradiction` section and record it in the YAML.

---
description: Generate a holistic, quote-rich thesis review of a book or paper from its converted .md source. Saves output to 1 - Rough/Review/. Optionally generates a companion quote bank in the same run. Standalone supplementary knowledge creation — does not touch the KB or any other workflow.
---

## Step 1 — Identify the Source

- The user provides a paper/book name or PDF filename (with or without path).
- Derive the base filename (strip path and `.pdf` extension if provided).
- Look for a matching `.md` file in `9 - Knowledge_base/sources/`.
  - Use a case-insensitive and partial-match search (the converted filename may differ slightly from the PDF name).

**HALT CONDITION**: If no matching `.md` file is found in `9 - Knowledge_base/sources/`, stop immediately and tell the user:

> "No converted source found for **[name]** in `9 - Knowledge_base/sources/`. Please run `/pdf2md` on the PDF first, then re-run `/review-paper`."

Do not proceed further.

---

## Step 2 — Load Context

Read in this order:

1. `9 - Knowledge_base/PHD_LENS.md` — internalize the six research questions, chapter map, nine active debates, and all three inclusion tests. **Hold this lens active throughout the entire reading** — it shapes which passages you extract and how you frame your analysis in every section, not only Section 7.

2. The matching `.md` file in `9 - Knowledge_base/sources/`. This is the full text. Use the following reading strategy:
   - **First pass**: read the table of contents, chapter headings, and introduction to map the structure of the work.
   - **Second pass**: read chapter by chapter, noting key arguments, concepts, and passages as you go. Weight all chapters equally — do not allow the quote bank to thin out in the second half of the text.

3. If the master note in `2 - Notes/Papers/` exists for this source AND has a non-empty `## Highlights` section, read that too — use the user's curated highlights to sharpen and anchor the review. If the master note does not exist or `## Highlights` is empty, skip silently and proceed.

---

## Step 3 — Generate the Review

Produce a single richly detailed review document. All sections are mandatory. Do not truncate or summarise prematurely.

---

```yaml
---
type: Review
Paper_Linked: "[[<filename>.pdf]]"
Author: ""
Year: 
---
```

# [Full Title]
**Author(s)**: | **Year**: | **Type**: Book / Article / Report / Chapter

---

### 1. Core Argument

3–5 sentences on the central thesis: what is the author proving, demonstrating, or complicating? How is the argument structured across the work? What epistemological or methodological stance underpins it? Include one direct quote that best captures the governing claim.

---

### 2. Conceptual Architecture

List and explain every major intellectual building block the author constructs. For each concept:
- Define it in the author's own terms, with a verbatim quote and page number
- Explain how it functions in the argument
- Note if it is a new coinage, a borrowed term redefined, or standard usage

Do not limit to three or five — include all concepts that carry argumentative weight.

---

### 3. Empirical Terrain

What does the author actually study?
- Geographic, historical, and institutional context
- Data, cases, archives, or fieldwork used
- Key empirical findings, with supporting quotes and page numbers
- What the evidence is claimed to prove

**If this is a theoretical or historical work with no primary dataset or fieldwork**, reframe this section as *Evidence and Examples Used*: describe the cases, historical episodes, archival material, or secondary evidence the author draws on to substantiate the argument.

---

### 4. Theoretical Lineage

Who is the author in dialogue with?
- Intellectual influences explicitly acknowledged
- Traditions being extended, challenged, or departed from
- Key thinkers cited and how they are used
- Where the work positions itself in existing debates

Use verbatim quotes where the author explicitly situates their argument against another position.

---

### 5. Key Passages

The core quote bank. Organise quotes by **theme**, not page order. Themes should emerge from the text itself. For each quote:

> "[Verbatim passage]" (p. X)
> **Gloss**: One sentence on what this quote does — what claim it supports or what concept it illustrates.

Extract generously, weighted by **PHD_LENS relevance** — not by chapter position. Chapters that pass the three inclusion tests (RQ link, geography, chapter mapping) should be fully mined; chapters with no traceable connection to the thesis need not be represented at all. A book-length review should yield 25–40 quotes minimum from the thesis-relevant sections. Before moving to Section 6, do a relevance check: for each chapter or section of the source, ask whether it passes at least one inclusion test. If yes, ensure it has contributed at least one quote. If no, skip it.

---

### 6. Internal Tensions and Silences

Where does the argument strain, qualify itself, or go quiet?
- Contradictions or unresolved tensions within the text
- Claims asserted but not demonstrated
- Geographic, temporal, or thematic limits — acknowledged or unacknowledged
- What would need to be true for the argument to fail

Be specific — cite page numbers where the tension is visible.

---

### 7. Thesis Relevance — PHD_LENS Filter

**Test 1 — Research Question Link**
State which of the six RQs this work speaks to directly. One logical step maximum. Explicitly flag any connections that are analogical rather than institutional or empirical — these fail Test 1.

**Test 2 — Geographic and Institutional Grounding**
State whether the work passes on geography. If non-Indian contexts appear, name the precise theoretical purpose for which they are being used in the thesis.

**Test 3 — Chapter Mapping**
List every thesis section (e.g. Ch. 2.2.2, Ch. 2.3.2, Ch. 4.1.x) this work feeds. For each: one sentence on what it contributes.

**Active Debates Engaged**
From the PHD_LENS active debates list (1–9), identify which debates this work enters, complicates, or takes a position on. Quote the relevant passage for each.

**Thesis-Sorted Quote Extract**
Re-present the most load-bearing quotes from Section 5, sorted by your chapter sections:

> **Ch. 2.2.2 — Colonial approaches to land records**
> "[quote]" (p. X) → what it contributes to this section

---

### 8. Ideas and Questions Sparked

This section is generative, not descriptive. For each idea:

- State the idea or question clearly in one sentence
- Then complete one of: *"This advances Ch. X.X because..."* / *"This opens an argument about..."* / *"This is a question for fieldwork: ..."* / *"This contradicts [existing KB note or argument] because..."*

Push beyond summary. The test for each entry: does this move your thesis writing forward in a specific, nameable way? If not, cut it.

---

## Step 4 — Save Output

1. Create the directory `1 - Rough/Review/Anthropic/` if it does not already exist.
2. Save the review as: `1 - Rough/Review/Anthropic/<AuthorYear_ShortTitle>.md`
   - Example: `Cohn1996_ColonialKnowledge.md`, `Demsetz1967_PropertyRights.md`
   - CamelCase short title, under 30 characters.
3. Confirm to the user: "Review saved to `1 - Rough/Review/Anthropic/<filename>.md`."

---

## Step 5 — Quote Bank (Optional Sub-Skill)

**Immediately after confirming the review is saved**, ask the user exactly this:

> "Quote bank? This will extract a deep, thesis-sorted quote bank from the source — no re-reading needed, context is already hot. Adds ~10–15% token cost on top of this review. (y/n)"

**If the user says no**: stop here.

**If the user says yes**, generate and save a companion quote bank file as follows.

### Quote Bank Format

Save as: `1 - Rough/Review/Anthropic/<AuthorYear_ShortTitle>_quotes.md`
(Same base name as the review, with `_quotes` suffix.)

```yaml
---
type: QuoteBank
Paper_Linked: "[[<filename>.pdf]]"
Author: ""
Year: 
Review_Linked: "[[<AuthorYear_ShortTitle>.md]]"
---
```

# Quote Bank — [Full Title]

---

Organise ALL quotes under the following three axes. A single quote may appear under more than one axis if it carries weight in multiple dimensions — duplicate it rather than omit it.

---

### A. By Thesis Chapter

Group quotes under the chapter sections identified in Step 3 / Section 7 of the review. Use the exact section codes from the PHD_LENS chapter map (e.g. Ch. 2.2.2, Ch. 3.1, Ch. 4.2.x). For each quote:

> "[Verbatim passage]" (p. X)
> **Supports**: One sentence on the specific argument or claim this quote anchors in that chapter section.

Include every quote from the review's Section 5 and Section 7 here. Then go further — extract additional quotes not captured in the review that are directly load-bearing for chapter writing. Extraction is **relevance-weighted, not coverage-weighted**: mine thesis-relevant sections deeply; do not force representation from chapters that fail the PHD_LENS inclusion tests. Target: **40–60 thesis-relevant quotes for a book, 15–25 for a paper** (fewer but more load-bearing is better than many thin ones).

---

### B. By Active Debate

Group quotes under whichever of the nine PHD_LENS active debates each quote speaks to. Only include quotes that pass the debate relevance test — do not force-fit.

> **Debate [N] — [Debate Name]**
> "[Verbatim passage]" (p. X)
> **Position**: Does this quote support, complicate, or challenge the debate's dominant position? One sentence.

---

### C. By Concept

Group quotes under the major concepts identified in the review's Section 2 (Conceptual Architecture). For each concept, collect every quote in the source that defines, illustrates, or complicates it — not just the one used in the review.

> **Concept: [Name]**
> "[Verbatim passage]" (p. X)
> **Function**: What this quote does for the concept — definition, extension, complication, or counter-evidence.

---

After saving, confirm: "Quote bank saved to `1 - Rough/Review/Anthropic/<filename>_quotes.md`. [N] quotes extracted across [X] chapter sections, [Y] debates, [Z] concepts."

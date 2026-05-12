---
name: review-p-lens
description: Generates a rigorous, quote-rich book/paper review aligned with the PhD_LENS (v1.0).
---

# PhD Review-P-Lens Skill

This skill implements a "Lens-First" reading protocol to transform a research source into a structured thesis-review.

## Reading Protocol

1. **Lens Calibration**: Read `9 - Knowledge_base/PHD_LENS.md` to activate the research questions and chapter map.
2. **Source Acquisition**: Locate the source `.md` in `9 - Knowledge_base/sources/`. 
3. **Multi-Pass Analysis**:
   - **Pass 1 (Structure)**: Identify TOC, Intro, and Conclusion.
   - **Pass 2 (Deep Read)**: Iterate through the text in 800-line blocks. Maintain a "Quote Buffer" to ensure equal representation from all chapters.
   - **Pass 3 (Mapping)**: Cross-reference findings with the 9 Active Debates in `PHD_LENS.md`.

## Output Schema

The output is saved to `1 - Rough/Review/gemini/` with the following mandatory sections:

1. **YAML Frontmatter**: Metadata including: `type`, `Paper_Linked`, `Author`, and `Year`.
2. **Core Argument**: The central thesis + one defining quote.
3. **Conceptual Architecture**: All major building blocks with verbatim definitions.
4. **Empirical/Evidence Terrain**: Data, cases, or archives used.
5. **The Quote Bank**: 25-40 themed quotes with page numbers and glosses.
6. **Thesis Relevance (Filter)**:
   - RQ Alignment (1-6)
   - Geographic Grounding (Test 2)
   - Chapter Mapping (Test 3)
   - Active Debates (1-9)
7. **Ideas & Questions Sparked**: Generative hooks for thesis writing.

## Halt Conditions
- No `.md` source found.
- Source does not pass Test 2 (Geographic/Theoretical relevance) after initial scan.

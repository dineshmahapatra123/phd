---
description: Build an AI Primer for a master note by synthesising the user's manually curated highlights. Does NOT read the PDF directly — reads only from the ## Highlights section.
---

1.  **Target Identification**
    *   If the user specifies a paper name, locate the corresponding `.md` file in `2 - Notes/Papers/`.
    *   If no paper is specified, ask: "Which paper should I prime? Please give the filename or title."

2.  **Idempotency Check**
    *   Read the file content.
    *   **SKIP CONDITION**: If the `## AI Primer` section exists AND contains substantive content (i.e., neither the placeholder line `*(Run /prime to populate — reads only from ## Highlights above)*` nor any variant of it is the only content under that heading), **STOP immediately**. Output: "AI Primer already exists for [Paper Name]. Skipping."

3.  **Highlight Extraction**
    *   Read the content under the `## Highlights` heading within the master note.
    *   **SKIP CONDITION**: If the `## Highlights` section is empty or contains only its placeholder `*(Paste verbatim quotes, page numbers, and raw thoughts here — Dinesh only)*`, **STOP**. Inform the user: "No manual highlights found in the `## Highlights` section. Please paste your verbatim quotes and thoughts there before running /prime."

4.  **Content Analysis**
    *   Use the extracted highlights to construct a detailed analysis. Do NOT use external web search. Rely solely on the highlights and your internal knowledge.
    *   **Structure**:
        - **Research Question(s)**: Identify the core research questions driving the selected highlights.
        - **Key Themes and Concepts**: Bulleted list of the main theories, themes, or methods extracted from the highlights.
        - **Critique**: Act as a devil's advocate. Identify potential blind spots, limitations, or counter-arguments in the highlighted logic.
        - **Summary**: Synthesize a concise 2–3 sentence overarching summary based *only* on what the user found important.
        - **Future Reading**: Propose 2–3 specific concepts, search terms, or related topics to cross-pollinate with the broader PhD research framework.

5.  **Writing**
    *   Locate the `## AI Primer` section at the bottom of the master note.
    *   Replace the placeholder line with the synthesis structure.
    *   Do *not* overwrite the frontmatter or the user's `## Highlights`.
    *   **Handoff**: Tell the user — "AI Primer written. Next: run `/add-zotero` to catalog this paper in Zotero."

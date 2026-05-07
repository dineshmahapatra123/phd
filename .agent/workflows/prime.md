---
description: Read a PDF and populate the corresponding note with an AI Primer.
---

1.  **Idempotency Check**
    *   Locate the target markdown note in `/Users/dineshmahapatra/Library/CloudStorage/GoogleDrive-dineshmahapatra123@gmail.com/My Drive/PhD/2 - Notes/Papers`.
    *   Read the file content.
    *   **SKIP CONDITION**: If the `## AI Primer` section exists AND its content has been replaced (i.e., the placeholder text `*(Run \`/prime\` to populate this section)*` is no longer present), **STOP immediately**. Output: "AI Primer already exists for [Paper Name]. Skipping."

2.  **Highlight Extraction**
    *   Read the content under the `## Highlights` heading within the master note.
    *   **SKIP CONDITION**: If the `## Highlights` section is empty or missing, **STOP**. Inform the user: "No manual highlights found in the `## Highlights` section of the master note. Please paste your verbatim quotes and thoughts there before running Prime."

3.  **Content Analysis**
    *   Use the extracted highlights from the `## Highlights` section to construct a detailed analysis. Do not use external web search. Rely solely on internal knowledge and the provided text.
    *   **Structure**:
        - **Research Question(s)**: Identify the core research questions driving the selected highlights.
        - **Key Themes and Concepts**: Bulleted list of the main theories, themes, or methods extracted from the highlights.
        - **Critique**: Act as a devil's advocate. Identify potential blind spots, limitations, or counter-arguments in the highlighted logic.
        - **Summary**: Synthesize a concise 2-3 sentence overarching summary based *only* on what the user found important.
        - **Future Reading**: Propose 2-3 specific concepts, search terms, or related topics to cross-pollinate with the broader PhD research framework.

4.  **Writing**
    *   Locate the `## AI Primer` section at the bottom of the master note.
    *   Delete the placeholder text `*(Run \`/prime\` to populate this section)*`.
    *   Write the synthesis structure directly beneath `## AI Primer`. Do *not* overwrite the frontmatter or the user's manual highlights.

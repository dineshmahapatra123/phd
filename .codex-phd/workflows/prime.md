# Codex Workflow: prime

Purpose: generate an AI Primer for a paper note using only the user's curated highlights.

## Steps

1. Locate the paper note in `2 - Notes/Papers/`.
2. If it already contains `## AI Primer` with substantive content, stop and report that it already exists.
3. Read `9 - Knowledge_base/PHD_LENS.md`.
4. Read only the content under `## Highlights`.
5. If `## Highlights` is missing or empty, stop and ask the user to paste quotes/thoughts first.
6. Filter the analysis through `PHD_LENS.md`: foreground highlights that map to the RQs, chapter map, active debates, or theoretical frameworks; mark weak or analogical relevance as such instead of forcing a fit.
7. Generate:
   - Research Question(s)
   - Key Themes and Concepts
   - Critique
   - Summary
   - Future Reading
8. Insert the primer under `## AI Primer` without altering manual highlights.

## Constraint

Do not use web search. The primer should reflect the user's curated highlights and the PhD lens, not a generic paper summary.

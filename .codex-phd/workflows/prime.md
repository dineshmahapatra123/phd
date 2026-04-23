# Codex Workflow: prime

Purpose: generate an AI Primer for a paper note using only the user's curated highlights.

## Steps

1. Locate the paper note in `2 - Notes/Papers/`.
2. If it already contains `## AI Primer` with substantive content, stop and report that it already exists.
3. Read only the content under `## Highlights`.
4. If `## Highlights` is missing or empty, stop and ask the user to paste quotes/thoughts first.
5. Generate:
   - Research Question(s)
   - Key Themes and Concepts
   - Critique
   - Summary
   - Future Reading
6. Insert the primer under `## AI Primer` without altering manual highlights.

## Constraint

Do not use web search. The primer should reflect the user's curated highlights, not a generic paper summary.


# Codex Workflow: rename-paper

Purpose: rename a PDF to the official paper title.

## Steps

1. Identify exactly one target PDF. If ambiguous, ask the user.
2. Determine the official title from metadata, visible PDF text, DOI, or web search if needed.
3. Use the exact title in sentence case, preserving proper nouns.
4. Replace filename-hostile characters such as `:` or `?` with `_`.
5. Do not include author names unless the official title includes them or the user asks.
6. Ask before batch renaming.
7. Rename with quoted absolute paths.
8. Report old and new filenames.


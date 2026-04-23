# Codex Workflow: compile-phd

Purpose: shatter a paper or Markdown source into atomic knowledge-base notes.

## Steps

1. Identify the source file from the user request.
2. Read `CODEX.md`, `CLAUDE.md`, `PHD_CONSTITUTION.md`, `PHD_SCHEMA.md`, and `index.md`.
3. If the source is a PDF, check whether a Markdown source already exists in `9 - Knowledge_base/sources/`.
4. If a source Markdown does not exist, convert or copy the source into `9 - Knowledge_base/sources/` as the permanent source record.
5. Search `index.md` and the relevant folders before creating any note.
6. Create or update atomic notes:
   - `Concepts/`
   - `People/`
   - `Methods/`
7. Preserve contradictions using a `### ⚠️ Contradiction` section and `Contradicts:` YAML.
8. Backlink every new or updated note to the paper master note in `2 - Notes/Papers/` when one exists.
9. Update `index.md` for Concepts, People, Methods, and Comparisons.
10. Append a concise entry to `9 - Knowledge_base/log.md`.
11. Run `python3 .codex-phd/bin/phd.py lint-wiki` and summarize the report.

## Do Not

- Do not edit `9 - Knowledge_base/sources/` after it has been established.
- Do not create duplicate concept notes.
- Do not collapse scholarly disagreement into a single cleaned-up answer.


# Codex Workflow: compile-phd

Purpose: shatter a paper or Markdown source into atomic knowledge-base notes.

## Steps

1. Identify the source file from the user request.
2. Read `CODEX.md`, `PHD_CONSTITUTION.md`, `PHD_SCHEMA.md`, `PHD_LENS.md`, and `index.md`.
3. If the source is a PDF, check whether a Markdown source already exists in `9 - Knowledge_base/sources/`.
4. If a source Markdown does not exist, convert or copy the source into `9 - Knowledge_base/sources/` as the permanent source record.
    - *Tip*: For technical papers, use `--hybrid docling-fast` to capture formulas and tables.
5. Search `index.md` and the relevant folders before creating any note.
6. Apply the `PHD_LENS.md` relevance gate to every candidate Concept, Person, or Method:
   - Research Question Link: it must bear directly on one of the six RQs, not by metaphor.
   - Geographic and Institutional Grounding: it must be about India, or a comparable context for a named theoretical reason.
   - Thesis Contribution: it must map to a specific chapter/section in the Chapter Map.
   - If uncertain, check the Active Debates and Theoretical Frameworks sections. If the candidate is interesting but not load-bearing, skip it.
7. Create or update atomic notes:
   - `Concepts/`
   - `People/`
   - `Methods/`
8. Preserve contradictions using a `### ⚠️ Contradiction` section and `Contradicts:` YAML.
9. Backlink every new or updated note to the paper master note in `2 - Notes/Papers/` when one exists.
10. Update `index.md` for Concepts, People, Methods, and Comparisons.
11. Follow `PHD_CONSTITUTION.md` -> Operational Logging: append a compact ledger entry to `9 - Knowledge_base/log.md` and put detailed provenance in `9 - Knowledge_base/logs/` when needed.
12. Run `python3 .codex-phd/bin/phd.py lint-wiki` and summarize the report.

## Do Not

- Do not edit `9 - Knowledge_base/sources/` after it has been established.
- Do not create duplicate concept notes.
- Do not create "interesting but irrelevant" notes that fail `PHD_LENS.md`.
- Do not collapse scholarly disagreement into a single cleaned-up answer.

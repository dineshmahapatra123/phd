# 📜 The PhD Constitution (Layer 3 Schema)

This document contains the "Laws of the Vault." The AI must read this at the start of every session to ensure consistency across years of research.

## 1. The Trinity of Files
1.  **Sources (`sources/`)**: Immutable, machine-readable full-text from pdf2md. Zero edits allowed.
2.  **Wiki (`Concepts/`, `People/`, `Methods/`, `Topics/`, `Comparisons/`, `Queries/`)**: Atomic articles shattered from sources. AI-managed, human-guided.
3.  **Constitution (This File)**: The rules that govern how the brain grows.

## 2. Ingestion Rules (The Shattering)
- **Atomorphy**: Every concept must be an atomic note. No multi-page summaries.
- **Backlinking**: Every new wiki page MUST link back to the `2 - Notes/Papers/` Master Note.
- **Standard Formatting**: Use the `PHD_SCHEMA.md` for all new articles.

## 3. Conflict Resolution (Linting)
- **Contradiction Rule**: Whenever a new paper contradicts an existing note in the brain, DO NOT overwrite. Instead, add a `### ⚠️ Contradiction` section to the note and flag it in the YAML frontmatter under `Contradicts:`.
- **Evolution**: Prefer adding a "Scholarly Debate" section rather than a single "Truth" definition.

## 4. Query & Filing
- When performing a deep comparative query (e.g., "Compare North vs. Ostrom on Titling"), the result MUST be filed as a new Markdown note in `9 - Knowledge_base/Comparisons/`. 
- Every new comparison page must be added to the `index.md`.
- **General Queries**: Standard research interactions must go to `9 - Knowledge_base/Queries/`. These are **Unindexed** to prevent index bloat. Do not add them to `index.md`. Instead, agents must actively search the `/Queries/` directory to retrieve past context when answering new questions.

## 5. Metadata (YAML Frontmatter)
Every wiki page must open with a YAML block. The authoritative spec — covering all types (Concept, Topic, Comparison, Query, Person, Method, Note, Chapter) with required fields for each — is in `9 - Knowledge_base/PHD_SCHEMA.md`. Type definitions with icons and colours live in `Types/`.

The governing rule: **every `.md` file must have a `type:` field**. No untyped notes.

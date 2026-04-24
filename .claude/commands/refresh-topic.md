---
description: Refresh and update a PhD research synthesis (from any question or topic) with the latest evidence.
---

# /refresh-topic Workflow

Use this command to update any existing academic synthesis note in `9 - Knowledge_base/Topics/`.

### 1. Identify the Source
-   Locate the target file in `9 - Knowledge_base/Topics/` by its name or the question it contains.

### 2. Re-Analyze the Library
-   Scan all full-text documents in `9 - Knowledge_base/sources/`.
-   Identify new papers or concept notes added since the file was last updated.

### 3. Update the Answer
-   **Overwrite/Append**: Update the "Scholarly Debate" and "State of the Art" sections with the latest research.
-   **Neural Snowball**: Do not delete old evidence unless it is superseded. Use `### ⚠️ Contradiction` for conflicting findings.

### 4. Timestamp
-   Update the YAML `Last_Processed` date to today's date.
-   Follow `9 - Knowledge_base/PHD_CONSTITUTION.md` → Operational Logging: compact **SYNTHESIS** entry in `log.md`, detailed provenance in `9 - Knowledge_base/logs/` only when needed.

---

> [!TIP]
> **Simplicity First**: This command turns a static chat answer into a living research draft.

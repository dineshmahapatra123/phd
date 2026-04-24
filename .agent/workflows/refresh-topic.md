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
-   **Overwrite/Append**: Update the "Key Arguments" and "State of the Art" sections with the latest research.
-   **Neural Snowball**: Do not delete old evidence unless it is superseded. Use `### ⚠️ Contradiction` for conflicting findings.
-   Follow `9 - Knowledge_base/PHD_CONSTITUTION.md` → Operational Logging.
-   Add only a compact **SYNTHESIS** ledger entry to `9 - Knowledge_base/log.md`; put detailed changed sections and provenance in `9 - Knowledge_base/logs/`.

### 4. Frontmatter Check
-   Ensure the file opens with the correct YAML block per `Types/topic.md`:
    ```yaml
    ---
    type: Topic
    Paper_Linked: "[[Paper A]], [[Paper B]], ..."
    Last_Processed: "YYYY-MM-DD"
    Status: Seed | Sapling | Sapling++ | Evergreen
    ---
    ```
-   Add any newly processed papers to `Paper_Linked`.
-   Update `Last_Processed` to today's date.

---

> [!TIP]
> **Simplicity First**: This command turns a static chat answer into a living research draft.

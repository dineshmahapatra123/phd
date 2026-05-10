---
description: Refresh and update a PhD research synthesis (from any question or topic) with the latest evidence.
---

# /refresh-topic Workflow

Use this command to update any existing academic synthesis note in `9 - Knowledge_base/Topics/`.

### 1. Identify the Target Topic
-   If a topic name is provided, locate that file in `9 - Knowledge_base/Topics/`.
-   If invoked without a name (e.g., right after `/compile-phd`), scan the newly created KB articles in `9 - Knowledge_base/Concepts/`, `People/`, `Methods/` to identify which Topics they reference, and refresh all of them.
-   If still ambiguous, list available Topic files and ask the user to confirm.

### 2. Re-Analyze the Library
-   Scan all full-text documents in `9 - Knowledge_base/sources/`.
-   Compare against the topic's current `Paper_Linked` list to identify which papers are new since the last update.

### 3. Update the Answer
-   **Neural Snowball**: Append/update the body with arguments and evidence from newly added sources. Do not delete old evidence unless it is directly superseded.
-   Use `### ⚠️ Contradiction` for conflicting findings — never silently overwrite.
-   Follow `9 - Knowledge_base/PHD_CONSTITUTION.md` → Operational Logging: compact **SYNTHESIS** entry in `log.md`, detailed provenance in `9 - Knowledge_base/logs/` only when needed.

### 4. Frontmatter Check
-   Ensure the file opens with the correct YAML block per `Types/topic.md`:
    ```yaml
    ---
    type: Topic
    Paper_Linked:
      - "[[Paper A.pdf]]"
      - "[[Paper B.pdf]]"
    Last_Processed: "YYYY-MM-DD"
    Status: Seed | Sapling | Sapling++ | Evergreen
    ---
    ```
-   **Add any newly processed papers** to `Paper_Linked` (compare `9 - Knowledge_base/sources/` against what is already listed).
-   Update `Last_Processed` to today's date.

---

> [!TIP]
> **Simplicity First**: This command turns a static chat answer into a living research draft.

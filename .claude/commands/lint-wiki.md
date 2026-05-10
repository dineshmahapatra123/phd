---
description: Perform a structural and scholarly health check of the PhD Knowledge Base.
---

1.  **Preparation**
    *   Verify the existence of `scripts/lint_wiki.py`.
    *   Inform the user: "Initiating Neuro-Linter Scan. Auditing `9 - Knowledge_base/`..."

2.  **Execution**
    *   Run the linting script:
        `python3 "/Users/dineshmahapatra/Library/CloudStorage/GoogleDrive-dineshmahapatra123@gmail.com/My Drive/PhD/scripts/lint_wiki.py"`

3.  **Reporting**
    *   Read the generated report at `9 - Knowledge_base/lint_report.md`.
    *   Summarize findings across all four check categories:
        1. **Missing YAML** — notes lacking required `type:` frontmatter fields
        2. **Unindexed Articles** — Concepts/People/Methods not listed in `index.md`
        3. **Broken Source Links** — `Paper_Linked` values pointing to PDFs not in `7 - Raw/`
        4. **Underdeveloped Seed Notes** — notes still at `Status: Seed` with minimal body content
    *   Ask: "Shall I help you address any of these issues today?"

4.  **Audit Log**
    *   Follow `9 - Knowledge_base/PHD_CONSTITUTION.md` → Operational Logging.
    *   Record only a compact lint status in `9 - Knowledge_base/log.md`; put detailed lint provenance in `9 - Knowledge_base/logs/` only when needed.

# Codex Workflow: lint-wiki

Purpose: run the knowledge-base health check and summarize issues.

## Steps

1. Run:

```bash
python3 .codex-phd/bin/phd.py lint-wiki
```

2. Read `9 - Knowledge_base/lint_report.md`.
3. Summarize missing YAML, unindexed articles, broken source links, and seed notes.
4. Offer concrete fixes, but do not edit until the user asks or the task explicitly includes fixing.


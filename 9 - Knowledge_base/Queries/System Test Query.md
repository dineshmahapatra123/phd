---
Type: Query
Query: "How does the dual-layer Q&A system work?"
Last_Processed: 2026-04-05
Status: Permanent Log
---

# Query: How does the dual-layer Q&A system work?

### Reasoning Path
This query was generated to test the newly implemented `Queries/` folder and its associated schema in the PhD Knowledge Base.

### Key Answer
The dual-layer system separates **Historical Interactions** (captured in this `Queries/` folder) from **Living Synthesis** (captured in the `Topics/` folder). 
- **Queries** act as a static archive of research sessions.
- **Topics** act as dynamic, evolving summaries of scholarly fields that grow via the `@[/refresh-topic]` workflow.

### Next Steps
1. Test the `@[/refresh-topic]` command on a sample topic note.
2. Verify that both layers are correctly indexed in `index.md`.

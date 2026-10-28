---
name: notebooklm
description: Use this skill to query your Google NotebookLM notebooks directly from Antigravity for source-grounded, citation-backed answers from Gemini. Direct API integration, library management, unified auth context. Drastically reduced hallucinations through document-only responses.
---

# NotebookLM Research Assistant Skill (Direct API Unified Version)

Interact with Google NotebookLM to query documentation with Gemini's source-grounded answers. Each query is run directly through Google's backend RPC APIs via the vault's central CLI engine, taking only a fraction of a second without launching any heavy browser automation.

## When to Use This Skill

Trigger when user:
- Mentions NotebookLM explicitly
- Shares NotebookLM URL (`https://notebooklm.google.com/notebook/...`)
- Asks to query their notebooks/documentation
- Wants to add documentation to NotebookLM library
- Uses phrases like "ask my NotebookLM", "check my docs", "query my notebook"

## Core Workflow Commands

Commands can be executed directly from the PhD repository root using either the adapter or the direct CLI binary (`./.venv/bin/notebooklm`).

### Step 1: Check Authentication Status
```bash
./.venv/bin/notebooklm status
# Or via adapter:
python3 .agent/skills/notebooklm/scripts/run.py auth_manager.py status
```

### Step 2: Query NotebookLM (Default active notebook: `PhD_Papers`)
```bash
# Direct CLI (instant, supports all v0.8.2 features)
./.venv/bin/notebooklm ask "Your question here"

# Ask with explicit notebook ID
./.venv/bin/notebooklm ask -n f802377d-2963-487f-8b74-5286f629eb91 "Your question here"

# Or via adapter from vault root:
python3 .agent/skills/notebooklm/scripts/run.py ask_question.py --question "Your question here"
```

### Step 3: Search Sources & Specific Passages (v0.8.2 Feature)
```bash
# Search for verbatim quotes or passages across all papers in the notebook:
./.venv/bin/notebooklm source search "search phrase or concept"
```

### Step 4: Notebook & Source Inspection
```bash
# List sources in active notebook
./.venv/bin/notebooklm source list

# Get AI-suggested prompts and questions based on your library
./.venv/bin/notebooklm suggest-prompts

# Get overall summary and insights of the active notebook
./.venv/bin/notebooklm summary
```

### Step 5: Uploading PDFs Directly from PhD Folder
```bash
# Upload a local PDF file from 7 - Raw/ into the active notebook:
./.venv/bin/notebooklm source add "7 - Raw/Filename.pdf"

# Upload with a custom title or to a specific notebook:
./.venv/bin/notebooklm source add "7 - Raw/Filename.pdf" -n f802377d-2963-487f-8b74-5286f629eb91 --title "Paper Title"
```

## Response Mechanism (Unified & Fast)

When providing the response from NotebookLM:
1. **Preserve Fidelity**: Do not rewrite the response. You may paraphrase the introduction/conclusion for context, but the core data/answer from NotebookLM should be presented as is.
2. **Format**: Use a clear "Question and Answer" format.
3. **Speed over Synthesis**: Skip the mandatory synthesis loop unless the initial answer is clearly incomplete or the user explicitly asks for a deep dive.
4. **Direct Delivery**: Provide the answer immediately after the script completes.
5. **Follow-up loop**: Always pay attention to the follow-up reminder at the end of the script output, and ask another query if the user's initial request is not fully resolved.

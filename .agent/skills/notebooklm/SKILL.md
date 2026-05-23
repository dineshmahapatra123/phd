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

### Step 1: Check Authentication Status
```bash
python scripts/run.py auth_manager.py status
```

### Step 2: Authenticate (If Not Logged In)
```bash
python scripts/run.py auth_manager.py setup
```

### Step 3: Manage Notebook Library

```bash
# List all notebooks in Google NotebookLM
python scripts/run.py notebook_manager.py list

# Create a new notebook with optional source URL Ingestion
python scripts/run.py notebook_manager.py add \
  --name "Descriptive Name" \
  --url "https://notebooklm.google.com/notebook/..." \
  --description "What this notebook contains" \
  --topics "topic1,topic2,topic3"

# Search notebooks by query
python scripts/run.py notebook_manager.py search --query "keyword"

# Set active notebook context
python scripts/run.py notebook_manager.py activate --id notebook-id

# Delete a notebook
python scripts/run.py notebook_manager.py remove --id notebook-id
```

### Step 4: Ask Questions

```bash
# Basic query (uses active notebook if set)
python scripts/run.py ask_question.py --question "Your question here"

# Query a specific notebook
python scripts/run.py ask_question.py --question "..." --notebook-id notebook-id

# Query with a notebook URL directly
python scripts/run.py ask_question.py --question "..." --notebook-url "https://..."
```

## Response Mechanism (Unified & Fast)

When providing the response from NotebookLM:
1. **Preserve Fidelity**: Do not rewrite the response. You may paraphrase the introduction/conclusion for context, but the core data/answer from NotebookLM should be presented as is.
2. **Format**: Use a clear "Question and Answer" format.
3. **Speed over Synthesis**: Skip the mandatory synthesis loop unless the initial answer is clearly incomplete or the user explicitly asks for a deep dive.
4. **Direct Delivery**: Provide the answer immediately after the script completes.
5. **Follow-up loop**: Always pay attention to the follow-up reminder at the end of the script output, and ask another query if the user's initial request is not fully resolved.

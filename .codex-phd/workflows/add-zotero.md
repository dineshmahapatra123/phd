# Codex Workflow: add-zotero

Purpose: add a paper or book to Zotero and optionally link a local PDF.

## Steps

1. Identify citation metadata: title, authors, year, venue/publisher, DOI/ISBN when available.
2. Use authoritative metadata sources when network access is available.
3. If a local PDF is relevant, locate it in `7 - Raw/` or the path the user provides.
4. Use locally configured Zotero credentials if needed. The expected local note is `1 - Rough/Handy notes/HN_01.md`. When reading this file, look for a label (e.g. "Zotero") to extract the token. Never print API keys.
5. Add the item to the PhD collection.
6. Attach the local PDF as a linked file when possible.
7. Tell the user to sync Zotero manually if the local app needs it.

## Safety

Network calls and Zotero writes may require user approval in Codex. Do not expose secrets in terminal output or chat.

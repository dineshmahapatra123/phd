---
description: Automatically locate, download, and inject a research paper into the Doc_dump directory.
---

### Standard Operating Procedure: Ingest-Paper Automation

Use this workflow to quickly move a discovered paper into your reading queue.

1.  **Locate & Identify**
    *   Search for the paper using `WebSearch` (ArXiv, Semantic Scholar, CORE, publisher sites).
    *   Find the **Direct PDF URL**.
        *   For ArXiv: `https://arxiv.org/pdf/[ID].pdf`
        *   For others: Look for open-access links via CORE or publisher sites.

2.  **Automated Injection**
    *   Download the file directly into `8 - Doc_dump/Automated_Search/`.
    *   **Command**:
        ```bash
        curl -L -o "/Users/dineshmahapatra/Library/CloudStorage/GoogleDrive-dineshmahapatra123@gmail.com/My Drive/PhD/8 - Doc_dump/Automated_Search/[Clean_Title].pdf" "[URL]"
        ```
    *   Ensure the filename is cleaned (no colons, question marks, or special characters).

3.  **Handoff**
    *   Confirm the file landed in `8 - Doc_dump/Automated_Search/`.
    *   Instruct the user: when ready to process, move it to `7 - Raw/` and run `/rename-paper` → `/scaffold`.

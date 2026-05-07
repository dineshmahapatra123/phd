---
description: Automatically locate, download, and inject a research paper into the Doc_dump directory.
---

### Standard Operating Procedure: Ingest-Paper Automation

Use this workflow to quickly move a discovered paper into your reading queue.

1.  **Locate & Identify**
    *   Search for the paper using `ArXiv` or `Google Scholar` (if installed).
    *   Find the **Direct PDF URL**.
        *   For ArXiv: `https://arxiv.org/pdf/[ID].pdf`
        *   For others: Look for open-access links via CORE or publisher sites.

2.  **Automated Injection**
    *   Use the terminal to download the file directly into your `Doc_dump`.
    *   **Command**: `curl -L -o "/Users/dineshmahapatra/Library/CloudStorage/GoogleDrive-dineshmahapatra123@gmail.com/My Drive/PhD/8 - Doc_dump/Automated_Search/[Clean_Title].pdf" "[URL]"`
    *   *Note*: Ensure the filename is cleaned (no colons or special characters).

3.  **Handoff**
    *   The paper is now ready in `8 - Doc_dump/Automated_Search`.
    *   When you are ready to read it, move it to `7 - Raw/` and follow the standard `@[/rename-paper]` -> `@[/scaffold]` flow.

4.  **Google Scholar MCP (Optional)**
    *   If you choose to install the Google Scholar MCP, you can use it to fetch metadata that isn't available on ArXiv.

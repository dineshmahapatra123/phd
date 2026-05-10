---
description: Sync citations from Zotero (PhD.bib) into Markdown Notes
---

> [!IMPORTANT]
> Run this **after** you have verified Author, Year, and Title in Zotero and clicked Sync in the Zotero Mac app. `PhD.bib` must be current before this script runs.

1. Execute the citation spider script:
   ```bash
   python3 "/Users/dineshmahapatra/Library/CloudStorage/GoogleDrive-dineshmahapatra123@gmail.com/My Drive/PhD/scripts/citation_spider.py"
   ```
2. **Verify**: Open the master note for the paper just processed in `2 - Notes/Papers/` and confirm the `APA Citation from Zotero:` line has been populated with the full citation.
3. **Handoff**: Confirm to the user which notes were updated, then say — "APA citation injected. You can now run `/compile-phd` to shatter this paper into the Knowledge Base."

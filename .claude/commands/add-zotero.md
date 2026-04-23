---
description: Quickly add a paper/book to Zotero using the Zotero API and move it to the PhD collection.
---
# /add-zotero Workflow

1. **Extract Metadata:** Use the `WebSearch` tool or `curl` (via Bash) to look up citation details (Title, Authors, Year, Publisher/Journal, DOI, ISBN) from Crossref or Semantic Scholar.
2. **Find the PDF (Optional):** If the user specifies the item is in `7 - Raw/`, search that folder for the corresponding PDF.
3. **Get API Details:** Read `/Users/dineshmahapatra/Library/CloudStorage/GoogleDrive-dineshmahapatra123@gmail.com/My Drive/PhD/1 - Rough/Handy notes/Handy_note_1.md` to get the Zotero User ID and API Key.
4. **Push the Metadata as an Item:** Use the Bash tool to send a POST request to `https://api.zotero.org/users/<USER_ID>/items` with the citation data (fetch the `itemType` template first via `GET https://api.zotero.org/items/new?itemType=...`).
5. **Attach PDF as Linked File:** If a PDF was found on the local disk, use the `linkMode=linked_file` attachment template, assign it the `parentItem` matching the newly created item, and POST it to the same API. This avoids uploading large PDF blobs.
6. **Assign to 'PhD' Collection:** Use `GET https://api.zotero.org/users/<USER_ID>/collections` to find the `PhD` collection ID. Then `PATCH` the newly created item with `{"collections": ["<COLLECTION_ID>"]}`.
7. **Notify User:** Confirm it's done and ask the user to click the Sync icon in their Zotero Mac app.

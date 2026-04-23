---
description: Quickly add a paper/book to Zotero using the Zotero API and move it to the PhD collection.
---
# /add-zotero Workflow

Whenever the user asks you to add a paper, book, or citation into their Zotero (like by typing `@/add-zotero [Paper Name or DOI]`):

1. **Extract Metadata:** Use your `run_command` tools (like `curl` to Crossref or Semantic Scholar) to look up the correct citation details (Title, Authors, Year, Publisher/Journal, DOI, ISBN) for the requested item.
2. **Find the PDF (Optional):** If the user specifies the item is in the `7 - Papers` folder, search that folder for the corresponding PDF.
3. **Get API Details:** Read `/Users/dineshmahapatra/Library/CloudStorage/GoogleDrive-dineshmahapatra123@gmail.com/My Drive/PhD/1 - Rough/Handy notes/Handy_note_1.md` to get the Zotero User ID (`15086139`) and the API Key (`SZu9e4D70klRvMtsJeKzznAC`).
4. **Push the Metadata as an Item:** Write a Python script to send a POST request to `https://api.zotero.org/users/15086139/items` with the citation data (fetching the `itemType` template first via `GET https://api.zotero.org/items/new?itemType=...`).
5. **Attach PDF as Linked File:** If a PDF was found on the local disk, use the `linkMode=linked_file` attachment template, assign it the `parentItem` matching the newly created book/article, and `POST` it to the same API. This avoids having to upload actual large PDF blobs to the API.
6. **Assign to 'PhD' Folder:** Use `GET https://api.zotero.org/users/15086139/collections` to find the Zotero Collection ID of the `PhD` folder (which is `32MFM4ZJ`). Then `PATCH` the newly created item with `{"collections": ["32MFM4ZJ"]}`.
7. **Notify User:** Inform the user it's done and they should click the Sync icon in their Zotero Mac app!

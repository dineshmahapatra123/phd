---
type: Type
_icon: messages-square
_color: "#0ea5e9"
_folder: "Tweets"
_sort: "created:desc"
---

# Tweet

A saved tweet, thread, or social-media note that may contain an idea, prompt, reference, or workflow insight.

## Required Frontmatter

```yaml
---
type: Tweet
Last_Processed: "YYYY-MM-DD"
Status: Inbox | Processed | Archived
Author:
Handle:
URL:
Date_Posted:
Tags:
---
```

## Required Body Sections

1. **Original / Capture** — the saved text, thread, or link context
2. **Why It Matters** — why it was saved
3. **Extracted Idea** — the reusable concept, prompt, or claim
4. **Action / Linkage** — whether it should become a Query, Concept, Topic, Clip, or writing note

## Rules

- Preserve source URL when available
- Do not treat tweets as scholarly evidence unless independently verified
- Use this type for idea capture and workflow memory, not formal citation

---
description: Perform a bibliometric search for the most cited or impactful ArXiv papers in a specific field and year.
---

### Standard Operating Procedure: ArXiv Impact Discovery

Use this workflow when you need to identify the "State of the Art" or foundational recent works that have gained significant traction in the academic community.

1.  **ArXiv & Scholar Scoping**
    *   Formulate a broad Boolean query.
    *   Use the `WebSearch` tool to search ArXiv (e.g. `site:arxiv.org [query] [year]`) for recent results.
    *   Also search Google Scholar, Semantic Scholar, and SSRN via `WebSearch` to capture non-ArXiv publications (Nature, Science, NBER, etc.).
    *   Apply a strict date filter to isolate recent contributions.
    *   Aim for at least 20 candidates before triaging.

2.  **Field Triage & Alignment**
    *   Prioritize papers that align with core PhD themes (e.g., *Institutions*, *Property Rights*, *Credible Commitment*).
    *   Filter by `econ`, `cs`, or `math` ArXiv categories as appropriate.

3.  **Impact & Bibliometric Verification**
    *   For top candidates, verify broader impact via `WebSearch`:
        *   Citation counts on Semantic Scholar or Google Scholar.
        *   Alternative publication venues (e.g., "Accepted at AER 2024").
        *   Author prominence (H-index/Affiliation).
    *   Eliminate papers with low engagement or niche scope.

4.  **Synthesis & Integration**
    *   Generate a "Top 5" report focusing on *Contribution* vs. *Impact*.
    *   Provide direct ArXiv IDs and PDF URLs for ingestion via `/ingest-paper`.
    *   Offer follow-up actions: `/prime` for summaries.

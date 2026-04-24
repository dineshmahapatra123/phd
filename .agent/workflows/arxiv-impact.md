---
description: Perform a bibliometric search for the most cited or impactful ArXiv papers in a specific field and year.
---

### Standard Operating Procedure: ArXiv Impact Discovery

Use this workflow when you need to identify the "State of the Art" or foundational recent works that have gained significant traction in the academic community.

1.  **ArXiv & Scholar Scoping**
    *   Formulate a broad Boolean query.
    *   Use `mcp_arxiv_search_papers` for ArXiv-specific results (2024).
    *   Use `google_scholar_search` (once installed) or `search_web` to capture non-ArXiv publications (Nature, Science, etc.).
    *   Apply a strict date filter to isolate recent contributions.
    *   Set `max_results` to at least 20 to ensure a diverse triage set.

2.  **Field Triage & Alignment**
    *   Analyze the `econ`, `cs`, or `math` categories of the results.
    *   Prioritize papers that align with core PhD themes (e.g., *Institutions*, *Property Rights*, *Credible Commitment*).

3.  **Impact & Bibliometric Verification**
    *   For the top candidates from ArXiv, verify their broader impact.
    *   **Tool**: Use `google_scholar_search` (from the Google Scholar MCP) or `search_web`.
    *   **Data Points**:
        *   Citation counts (velocity).
        *   Alternative publication venues (e.g., "Accepted at NeurIPS 2024").
        *   Author prominence (H-index/Affiliation).
    *   **Triage**: Eliminate papers with low engagement or high skepticism in the field.
        *   **Citation Platforms**: Verified counts on Semantic Scholar, ResearchGate, or Google Scholar.
        *   **Social/Code Impact**: GitHub stars or citations in other high-profile preprints.

4.  **Synthesis & Integration**
    *   Generate a "Top 5" report focusing on *Contribution* vs. *Impact*.
    *   Provide direct ArXiv IDs and PDF URLs for phase-1 ingestion into the `7 - Raw/` folder.
    *   Offer follow-up actions: `/prime` to build an AI Primer once you have added highlights to the master note.

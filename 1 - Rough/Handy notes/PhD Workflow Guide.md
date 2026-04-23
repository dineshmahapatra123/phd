# 🚀 The Neuro-Scholar Workflow (v2.3)

This is a high-integrity, **Cyborg Research Workflow** designed for PhD synthesis. It combines your elite human judgment (Curation & Citing) with my agentic speed (Scaffolding & Engineering).

---

## ⚡ The Golden Loop (Paper Journey)

`7-Raw` 📁 → `@[/rename-paper]` 🏷️ → `@[/scaffold]` 🏗️ → **Manual Highlights** ✍️ → `@[/prime]` 🪄 → `@[/add-zotero]` 📚 → **Manual Verify** ✅ → `@[/sync-bib]` 🔗 → `@[/compile-phd]` 🌋 → **`@[/refresh-topic]`** ❄️ → **`@[/lint-wiki]`** 🔍

---

## 🏗️ Phase 1: Ingestion
*Objective: Transform a raw PDF into a structured research entity.*

| Step | Command | Action | Role |
| :--- | :--- | :--- | :--- |
| **1. Drop** | — | Drag PDF into **`7 - Raw/`**. | 🧠 |
| **2. Rename** | **`@[/rename-paper]`** | Agent standardizes title (publisher's exact title). | 🤖 |
| **3. Scaffold** | **`@[/scaffold]`** | Agent creates **Master Note** (`2-Notes/Papers`) with `## Highlights` section. | 🤖 |

---

## 🧠 Phase 2: High-Integrity Analysis
*Objective: Map your highlights to the AI's synthesis engine.*

4. **Deep Read & Curate** 🧠
   - Open the PDF in your preferred viewer.
   - Open the corresponding Master Note in **`2 - Notes/Papers/`**.
   - **Paste your "Golden Nuggets"** under the `## Highlights` section: Verbatim quotes, page numbers, and raw thoughts. 
5. **Prime 🪄 `@[/prime]`** 🤖
   - Agent reads **only your curated highlights** from the `## Highlights` section to build a tailored **AI Primer** at the bottom of the Master Note.

> [!TIP]
> **Why manual curation?** By selecting the quotes yourself, you ensure the AI's "Prime" synthesis is grounded in *your* research interests, not just a blind summary of the whole paper.

---

## 📚 Phase 3: The Truth Loop (Citations)
*Objective: Ensure publication-ready bibliographic integrity.*

6. **Catalog 📖 `@[/add-zotero]`** 🤖
   - Agent uses Zotero API to create the item and link your local PDF.
7. **Cross-Check** ✅ 🧠
   - Open Zotero. Verify that the Author, Year, and Title are correct.
8. **Sync Bib 🔗 `@[/sync-bib]`** 🤖
   - Agent injects the official **APA Citation** into your Master Note header.

---

## 🌋 Phase 4: Knowledge Engineering
*Objective: "Shatter" the paper into your permanent Knowledge Base.*

9. **Shatter 🦾 `@[/compile-phd]`** 🤖
   - Agent deconstructs the paper into atomic Wiki articles in **`9 - Knowledge_base/`**:
     - **[[Concepts/]]** (Theories and Frameworks)
     - **[[Methods/]]** (Research Designs)
     - **[[People/]]** (Scholarly Lenses & Networks)
61. **Log** 🧠
    - Review the **[log.md](file:///Users/dineshmahapatra/Library/CloudStorage/GoogleDrive-dineshmahapatra123@gmail.com/My%20Drive/PhD/9%20-%20Knowledge_base/log.md)** to see the "Neural Surgery" results.

---

## ❄️ Phase 5: Neural Synthesis
*Objective: "Snowball" new insights into your living dissertation topics.*

11. **Snowballing 🦾 `@[/refresh-topic]`** 🤖
    - Agent re-synthesizes all **`Topics/`** related to the now-shattered paper.
    - Updates arguments with fresh evidence and theoretical links.
12. **The Debate Audit** 🧠
    - Review updated topics for new `### ⚠️ Contradictions`.
    - Refine the central research questions in your thesis.

---

## 🔍 Phase 6: Wiki Vitality (Linting)
*Objective: Maintain long-term structural and scholarly integrity.*

13. **Lint ⚖️ `@[/lint-wiki]`** 🤖
    - Agent performs a "Health Check" across all folders.
    - Identifies orphans, Seed-status gaps, and broken source links.
14. **Audit & Garden** 🧠
    - Review the **`lint_report.md`**.
    - Decide which "Seed" notes to expand and which "Orphans" to index.

## 🛠️ The System Registry

- **`sources/`**: Immutable, machine-readable text files. No edits!
- **`2 - Notes/Papers/`**: Your primary Master Notes (includes your pasted highlights).
- **`index.md`**: The Master Map of your brain.

> [!IMPORTANT]
> **The APA Rule**: Do not delete the `APA Citation from Zotero:` prefix in your Master Note template. If deleted, the `@[/sync-bib]` script will skip the file.

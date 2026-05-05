---

---
here is the exact **"Inventory"** of how Claude works in your PhD folder, the files it uses, and the skills it possesses.

---

### 1. The Operational "Brain": `CLAUDE.md`

This is the root file that tells Claude how to exist in your vault.

- **Location:** `/CLAUDE.md`
- **What it does:** It maps the entire vault for Claude. It tells Claude that `sources/` is immutable, that types are in `Types/`, and that all scripts are in `scripts/`. **Claude reads this first before doing anything.**

### 2. The "Command Library": `.claude/commands/`

This is a directory of specialized "Playbooks" for Claude.

- **Location:** `/.claude/commands/`
- **The Files:** Includes `compile-phd.md`, `sync-bib.md`, `lint-wiki.md`, `add-zotero.md`, and more.
- **How it works:** When you type a slash command (e.g., `/scaffold`), Claude opens the corresponding `.md` file in this folder and follows its technical steps exactly.

### 3. The "Hands" (Scripts): `scripts/`

These are the Python tools that Claude "triggers" to do the physical work.

- **Location:** `/scripts/`
- **The Files:**
    - **`scaffold.py`**: Builds the Master Notes.
    - **`citation_spider.py`**: Injects APA citations.
    - **`lint_wiki.py`**: Runs the vault health check.
    - **`extract_skim_notes.py`**: Pulls highlights from PDFs.

### 4. The "Permissions": `.claude/settings.local.json`

This file defines what Claude is allowed to do on your machine.

- **Location:** `/.claude/settings.local.json`
- **Skills included:**
    - **Bash Permissions:** Permission to run Python and shell commands.
    - **Zotero API:** Permission to use `curl` to talk to Zotero's servers.
    - **WebSearch:** Permission to search the internet for paper titles.

### 5. The "Writing Rules": `9 - Knowledge_base/TISS_STYLE.md`

This is the machine-readable style guide Claude uses for editing your thesis.

- **Location:** `/9 - Knowledge_base/TISS_STYLE.md`
- **What it does:** It tells Claude to use UK English, the Oxford comma, and specific TISS formatting.

### 6. The "Secrets": `1 - Rough/Handy notes/HN_01.md`

Claude is trained to look here for your sensitive data.

- **Location:** `/1 - Rough/Handy notes/HN_01.md`
- **What it does:** It contains your **ZOTERO_API_KEY** and **GITHUB_TOKEN**. Claude reads this file to get the "Keys" to your external accounts.

---

### Summary: Claude's Technical "Stack"

|Component|File/Folder|Purpose|
|---|---|---|
|**Instruction Map**|`CLAUDE.md`|Tells Claude the "Who/What/Where" of the vault.|
|**Active Commands**|`.claude/commands/`|The "Playbooks" for your research workflows.|
|**Automation Limbs**|`scripts/`|The Python code that does the actual work.|
|**Environment**|`settings.local.json`|Gives Claude the power to use Bash and APIs.|
|**Style Filter**|`TISS_STYLE.md`|The rules for how Claude writes your chapters.|
|**Credential Safe**|`HN_01.md`|Where Claude retrieves your API tokens.|

**Claude works as a "Script Orchestrator." It uses its permission to run Bash and Python to execute the instructions in its `commands/` library, while always respecting the architectural rules in**






To give you the most accurate and elaborate breakdown, let's map **Claude** directly into the "Inventory" of your PhD vault and its specific role in the **6-Phase Workflow Guide.**

### 1. Claude's "Inventory" Role

Claude acts as the **System Integrator.** It is the "glue" that connects your agents, skills, and scripts.

- **As an Agent:** Claude is the "Technical Lead." It follows the **`CLAUDE.md`** instruction set. It is optimized for **Deterministic Execution** (doing the same task perfectly every time).
- **As a Skill-User:** Claude doesn't "possess" skills; it **"invokes"** them. For example, it uses the **`pdf-to-markdown` Skill** (located in `.agent/skills/`) to "see" your PDFs. It also uses its internal **Bash/WebSearch Skills** to find data on the internet.
- **As a Script-Runner:** Claude uses your **`scripts/`** folder as its "Limbs." When it needs to perform a vault-wide task (like `lint_wiki.py`), it doesn't "think" of the code—it runs your verified Python tools.
- **As a Workflow-Executor:** Claude uses the `.md` files in **`.agent/workflows/`** and **`.claude/commands/`** as its "Mission Briefs."

---

### 2. Claude’s Role in the 6-Phase PhD Workflow

Here is exactly how Claude handles each phase of the **Neuro-Scholar** guide:

#### **Phase 1: Ingestion (The Standardizer)**

- **Actions:** Runs **`/rename-paper`** and **`/scaffold`**.
- **Inventory used:** **Skill** (WebSearch) to find the title + **Script** (`scaffold.py`) to build the note.
- **Claude's Logic:** Ensure the file system is clean and the Master Note is correctly placed in `2 - Notes/Papers/`.

#### **Phase 2: Analysis (The Primer)**

- **Actions:** Runs **`/prime`**.
- **Inventory used:** **Workflow** (`prime.md`) + **Internal Logic**.
- **Claude's Logic:** Scan the `## Highlights` section and build the **AI Primer** without hallucinating outside of your highlights.

#### **Phase 3: The Truth Loop (The Librarian)**

- **Actions:** Runs **`/add-zotero`** and **`/sync-bib`**.
- **Inventory used:** **Bash Skill** (`curl` API calls) + **Script** (`citation_spider.py`).
- **Claude's Logic:** Connect the vault to the real world (Zotero) and inject the APA citation into the header.

#### **Phase 4: Knowledge Engineering (The Surgeon)**

- **Actions:** Runs **`/compile-phd`**.
- **Inventory used:** **Skill** (`pdf-to-markdown`) + **Workflow** (`compile-phd.md`) + **PHD_SCHEMA**.
- **Claude's Logic:** Perform the "Shattering." Claude handles the heavy file-writing and ensures every Concept note follows the H2 header rules perfectly.

#### **Phase 5: Neural Synthesis (The Snowballer)**

- **Actions:** Runs **`/refresh-topic`**.
- **Inventory used:** **Workflow** (`refresh-topic.md`) + **TISS_STYLE**.
- **Claude's Logic:** Re-synthesize existing Topics with new evidence. During this phase, Claude applies the **TISS Style filter** (UK English, Indents) to the updated text.

#### **Phase 6: Wiki Vitality (The Health Inspector)**

- **Actions:** Runs **`/lint-wiki`**.
- **Inventory used:** **Script** (`lint_wiki.py`) + **Workflow** (`lint-wiki.md`).
- **Claude's Logic:** Scan the entire `9 - Knowledge_base/` for orphans, missing YAML, or broken links.

---

### Summary Table: Claude’s Inventory Mapping

|Inventory Category|Files/Folders|Claude's Strategic Use|
|---|---|---|
|**Agent Guidance**|`CLAUDE.md`, `CODEX.md`|The **Map** of where to go and what rules to follow.|
|**Skills**|`.agent/skills/`|The **Specialized Tools** Claude picks up (e.g., pdf2md).|
|**Workflows**|`.agent/workflows/`|The **Mission Briefs** that define the 6 phases.|
|**Scripts**|`scripts/*.py`|The **Physical Limbs** that execute the changes.|
|**Style/Schema**|`TISS_STYLE.md`, `PHD_SCHEMA.md`|The **Filters** that ensure academic quality.|
|**Secrets**|`HN_01.md`|The **Credentials** Claude uses for Zotero/GitHub.|

**Claude works as the "Active Manager" of your PhD. It is the agent that looks at your Workflow Guide and says: "I will use this Script and this Skill to move this file through Phase X, while keeping it strictly compliant with the TISS Style and the Vault Schema."**


Very imp:



You have a very sharp eye! You are absolutely right that, _by design_, `.agent/workflows/` were meant for Antigravity and `.claude/commands/` were meant for Claude.

**However, in this specific vault, Claude is a "Polyglot" agent.**

If you look at the **`CLAUDE.md`** file (lines 107–109), it contains this specific instruction for Claude:

> _"Custom slash commands defined in `.agent/skills/` and `.agent/workflows/`. **Claude Code loads these automatically.**"_

### Why does Claude use both?

There are three reasons for this "Shared Intelligence":

1. **Redundancy (Safety):** If a command only existed for me (Antigravity) and I was unavailable or my logic was "overloaded," you wouldn't be able to run that part of the PhD workflow. By having Claude "load" them, you ensure that the core **6-Phase Workflow** is always executable by at least one agent.
2. **Shared "Source of Truth":** Many of your research rules (like the TISS Style or the Shattering logic) are the same regardless of which agent is running them. Instead of writing the rules twice (once for me and once for Claude), they are stored in `.agent/workflows/` as a **shared library.**
3. **The "Claude/Antigravity" Bridge:** Sometimes, a command in `.claude/commands/` is actually just a "trigger" that tells Claude: _"Go read the detailed instructions in .agent/workflows/ and execute them using your Bash/Python skills."_

### The Distinguishing Factor:

Even though Claude **reads** the `.agent/` workflows, it **executes** them differently:

- **When Antigravity reads them:** I focus on the "Conceptual Graph" and the "Reasoning."
- **When Claude reads them:** It focuses on the "Terminal Commands" and the "File Paths."

**So, you are correct about the original "home" for those files, but Claude has been given a "Master Key" to the `.agent/` folder so it can help you even when you aren't talking to me directly.**

Does that clarify the "overlap" you spotted?


Codex


If Antigravity is the **"Soul"** (The Constitution) and Claude is the **"Muscles"** (The Scripts), then **Codex** is the **"Voice-to-Action Translator."**

---

### 1. The "Read-Through" Philosophy

Codex is unique because it is designed to be a **non-intrusive layer**.

- **How it works:** Codex doesn't want to replace your other agents. It starts every session by reading **`CODEX.md`**, **`CLAUDE.md`**, and the **`PHD_CONSTITUTION.md`**.
- **The Logic:** Its internal motto is: _"I will make the user's life easier by using the existing infrastructure (Claude's scripts and Antigravity's workflows) but letting the user talk more naturally."_

### 2. The "Unified CLI" (`phd.py`)

While Claude runs many individual scripts, Codex uses a **Unified Command Line Interface** located in **`.codex-phd/bin/phd.py`**.

- **The Inventory:** This single Python script is Codex's "Swiss Army Knife." It contains a **Canonical Path Map** of your entire vault (it knows exactly where `7 - Raw` and `9 - Knowledge_base/Concepts` are).
- **Vault Status:** One of Codex's unique "Skills" is the ability to give you an instant **Vault Health Snapshot**. If you say "vault status," Codex runs `phd.py status`, which counts your PDFs, your master notes, and your wiki articles in one second.

### 3. The Phrase-to-Action Mapping

The core of Codex is the **Command Mapping table** in its `CODEX.md` file.

- **How it works:** Codex is trained to listen for "User Phrases" rather than strict slash commands.
- **Example:**
    - **You say:** _"Show me the status of my vault."_
    - **Codex thinks:** _"Phrase: 'vault status' → Action: Run `.codex-phd/bin/phd.py status`."_
    - **You say:** _"Sync my library."_
    - **Codex thinks:** _"Phrase: 'sync-bib' → Action: Run `.codex-phd/bin/phd.py sync-bib`."_

### 4. The "Adapter" Library

Codex has its own inventory of specialized files in **`.codex-phd/workflows/`** and **`.codex-phd/skills/`**.

- **The Difference:** These files don't contain "new" logic. Instead, they contain **Instructions for Codex** on how to "bridge" your natural language to the underlying scripts. They act as the "Dictionary" between how you speak and how the computer works.

---

### Summary: The Trio Working in Unison

|Feature|**Claude (The Hand)**|**Antigravity (The Eye)**|**Codex (The Voice)**|
|---|---|---|---|
|**Primary File**|`CLAUDE.md`|`PHD_CONSTITUTION.md`|`CODEX.md`|
|**Input Style**|`/slash-commands`|Conceptual Reasoning|Natural Language Phrases|
|**Execution**|Bash & Python Scripts|Graph & Schema Analysis|`phd.py` Wrapper|
|**Role**|**Implementation Engineer**|**Governance Architect**|**Natural Language Adapter**|

### Why Codex is essential for your PhD:

When you are deep in research, you don't want to think about "terminal paths" or "Python environments." You want to think about **Land Rights**.

**Codex** is the agent that lets you stay in "Research Mode." It takes your natural language requests and "Adapts" them into the high-precision technical work that **Claude** and **Antigravity** perform.

**It is the agent that makes your high-tech vault feel like a natural conversation, while ensuring the technical rigor of the PhD Workflow Guide is followed perfectly.**


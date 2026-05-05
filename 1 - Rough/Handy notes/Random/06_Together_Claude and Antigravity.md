
To make us truly **complement** each other, you have to see the **Feedback Loop** between us. We don't just work _beside_ each other; our outputs actually "feed" each other to make the result better than either of us could do alone.

Here is the **Synergy Map** of how we complement each other:

---

### 1. Claude prepares the "Vision" for Antigravity

- **The Problem:** Raw PDFs are messy. They have weird page numbers, headers, and broken sentences that confuse AI "Eyes."
- **The Synergy:** **Claude (The Hand)** uses its technical skills to "clean" the paper first. It runs the high-fidelity conversion and standardizes the file names.
- **The Result:** Because Claude has prepared a "Clean Canvas," my **Antigravity "Eye"** can see the theories and methods much more clearly. I don't waste time fixing typos; I spend my time finding insights.

### 2. Antigravity provides the "Target" for Claude

- **The Problem:** Claude is a powerful script-runner, but it doesn't know _what_ is important. If you told it to "lint the vault," it would waste time checking every single file.
- **The Synergy:** I (**Antigravity**) analyze your highlights and identify the **3 specific concepts** that are most important for your thesis. I then tell Claude: _"Claude, focus your style-checking and citation-syncing ONLY on these 3 concepts."_
- **The Result:** Claude becomes surgical. It doesn't bloat your vault with useless data; it only polishes the high-value insights I have identified.

### 3. Claude enforces the "Physical Laws" (Technical)

- **The Synergy:** While I am busy connecting complex ideas across 50 papers, I might accidentally create a "broken link" or a note with a missing YAML tag. **Claude** runs the `lint-wiki` "in the background." It finds my technical mistakes and fixes them.
- **The Result:** You get a vault that is **Intellectually Deep** (thanks to me) and **Technically Perfect** (thanks to Claude).

### 4. Antigravity enforces the "Scholarly Laws" (Ethical)

- **The Synergy:** Claude might run a script that tries to "Merge" two notes to save space. I step in and say: _"Wait, Claude. According to the Constitution, those two notes are a 'Scholarly Debate.' We must NOT merge them; we must keep them separate as a contradiction."_
- **The Result:** Claude's speed is balanced by my "Scholarly Caution." You never lose a nuance or a debate just because of a technical automation.

---

### How to use this synergy in a single prompt:

You can "Pair" us in your instructions like this:

> _"Claude, perform the **technical heavy lifting** (Rename, Sync, Style-check) for this new paper. Once the 'Hand' work is done, Antigravity, use your **'Eye'** to see if this paper changes our understanding of [Theory X] and update the topics accordingly."_

### The Coordination Result:

1. **Claude** ensures the **Plumbing** (Zotero, Files, Formatting) is ready.
2. **Antigravity** ensures the **Thinking** (Concepts, Contradictions, Snowballing) is rigorous.
3. **Claude** does a final **Health Check** to make sure my thinking didn't break the files.

**Together, we are a "Research Engine": Claude is the Fuel and Piston (Power), and Antigravity is the Steering and Navigation (Direction).**


Q: So, basically, when I start the process, how do I prompt antigravity and claude alongside with each other to make the best of them for our PhD workflow guide...learning from you




To get the best out of both of us, you should use a **Multi-Agent Orchestration** approach. Instead of treating us as two separate chat boxes, treat us as a **unified research team.**

Here is your "Master Playbook" for prompting us in coordination across the **6 Phases** of your PhD Workflow:

---

### Phase 1: Ingestion (The Technical Start)

**Goal:** Move a raw PDF into your system correctly.

- **The Prompt:** _"Claude, **rename** this PDF and **scaffold** the Master Note. Antigravity, verify that the new note follows the **PHD_SCHEMA** perfectly and alert me if the paper title already exists in the `index.md`."_
- **Why:** Claude does the "heavy lifting" of renaming and file creation. Antigravity acts as the "Quality Control" to ensure no duplicates enter your brain.

### Phase 2 & 3: Analysis & Citations (The Truth Loop)

**Goal:** Ground the AI in your highlights and fix the bibliography.

- **The Prompt:** _"Antigravity, **prime** this note from my highlights—focus on the 'institutional change' angle. Claude, while Antigravity is priming, **add this to Zotero** and **sync the bib** to get the official APA citation."_
- **Why:** I (Antigravity) am thinking deeply about your highlights while Claude is handling the "clerical" work of talking to the Zotero API.

### Phase 4: Knowledge Engineering (The Critical Handoff)

**Goal:** "Shatter" the paper into Wiki notes without breaking the system.

- **The Prompt:** _"Antigravity, run **`/compile-phd`** to shatter this paper into concepts. If you find a **contradiction** with the [North 1990] paper, flag it. Claude, once Antigravity is done, update the **`log.md`** and ensure all new files have the correct TISS-compliant UK spelling."_
- **Why:** I perform the "Neural Surgery" (The reasoning). Claude performs the "File Maintenance" (The logging and spelling).

### Phase 5 & 6: Synthesis & Vitality (The Long-Term Care)

**Goal:** Keep your thesis alive and your vault healthy.

- **The Prompt:** _"Antigravity, **refresh the topics** related to this paper to 'snowball' the new evidence. Claude, run **`/lint-wiki`** to find any orphans or seeds that were created during the shattering."_
- **Why:** I handle the "Intellectual Growth" (Snowballing). Claude handles the "Structural Maintenance" (Linting).

---

### The "Golden Rule" for Coordination

Whenever you are starting a complex task, use this **"Who-Does-What"** framing in your prompt:

> **"Claude, you are the Hand:** [Actionable task: run script, fix format, talk to API]." **"Antigravity, you are the Eye:** [Analytical task: check schema, find contradictions, synthesize concepts]."

### One Final Tip:

Since I (**Antigravity**) have the **"Vault Context Memory,"** you can always ask me:

> _"Antigravity, what is the next step for Claude in our workflow guide for this paper?"_

I will then tell you exactly which command Claude should run next to keep your research moving forward.



Q: You descibed yourself as eye and claude as hand...Then tell me how I work with both eye and hand...with respect to the PhD workflow, how to prompt both to make them work in coordiantion



This is the most important part: **How do YOU, the Architect, use both of us without us getting in each other's way?**

To coordinate us, you should prompt us based on our strengths. Think of it as **"Technical Request" vs. "Intellectual Request."**

---

### 1. When to use Claude (The Hand)

**Prompt Claude for: Automation, File Management, and Formatting.**

- **Keywords:** "Run," "Format," "Sync," "Fix," "Style-check."
- **Example Prompt:** _"Claude, run `/sync-bib` for the new papers and then check the `/style-check` for my Chapter 1 draft to ensure it follows TISS rules."_
- **Why:** Claude is fast at terminal operations and perfect at repetitive formatting. It won't get "bored" or "distracted."

### 2. When to use Antigravity (The Eye)

**Prompt Antigravity for: Synthesis, Contradictions, and Structural Design.**

- **Keywords:** "Analyze," "Connect," "Refine," "Shatter," "Review."
- **Example Prompt:** _"Antigravity, review the highlights I just pasted. Does this new theory of North (1990) contradict the land rights concept we built yesterday from the Ostrom paper?"_
- **Why:** I look at the "Knowledge Graph." I can see how an idea in one folder affects an idea in another.

---

### 3. How to Prompt us in Coordination (The "Cyborg" Flow)

The best way to work is to use us in a **Sequential Hand-off.** Here is how you would prompt a "Neural Surgery" on a new paper:

1. **THE HAND (Claude):** _"Claude, `/rename-paper` this PDF and `/scaffold` the Master Note."_
    - _Result:_ The file is technically ready.
2. **THE HUMAN (Dinesh):** _You read the paper and paste your "Golden Nuggets" into the highlights._
3. **THE EYE (Antigravity):** _"Antigravity, `/prime` this note based on my highlights and then `/compile-phd` to shatter it into the wiki."_
    - _Result:_ I analyze your thoughts and build the concepts.
4. **THE HAND (Claude):** _"Claude, `/sync-bib` to make sure the citations are official."_
    - _Result:_ The final technical polish is applied.

---

### Summary Checklist for Prompting

|If the task is...|Use **Claude** (The Hand)|Use **Antigravity** (The Eye)|
|---|---|---|
|**"Make this file exist"**|✅||
|**"Does this make sense?"**||✅|
|**"Sync with Zotero"**|✅||
|**"Find a contradiction"**||✅|
|**"Fix the spelling/indents"**|✅||
|**"Update the index.md"**||✅|

### The "Master Prompt" for Coordination:

If you are ever unsure, you can say:

> _"Claude, handle the **technical scaffolding** for [Paper X], and Antigravity, handle the **conceptual shattering** once the source is ready. Follow the Constitution for any contradictions found."_

This tells Claude to focus on the files and me to focus on the knowledge, ensuring a perfectly coordinated "Neuro-Scholar" result



# How Antigravity works in the PhD folder from Codex's point of view

From Codex's point of view, Antigravity is the conceptual and governance-oriented agent in this PhD vault.

Antigravity is strongest where the work is not merely "run this command," but "understand what this means for the PhD knowledge system." It is the agent most closely associated with the Constitution, schema discipline, contradiction handling, topic evolution, and the intellectual shape of the vault.

---

## 1. Antigravity's basic role

Antigravity works as the research-integrity agent of the PhD workflow.

It is not just trying to move files from one folder to another. Its main job is to protect the intellectual structure of the PhD brain.

Antigravity is especially useful for questions such as:

- Does this new paper contradict an existing concept?
- Should this become a new Concept note or update an existing one?
- Which Topic note should be refreshed after this paper is processed?
- Does this source change the debate on property rights, land titling, or institutions?
- Are we preserving scholarly disagreement, or accidentally flattening it?
- Is this note atomic enough?
- Is the vault growing in a coherent direction?

In short, Antigravity is the agent that asks: "What does this mean for the knowledge system?"

---

## 2. Antigravity's inventory in this vault

| Layer | File or folder | Antigravity's role |
|---|---|---|
| Vault memory | `.agent/memory/vault_context.md` | Architecture, naming rules, workflow state, and vault conventions |
| Style memory | `.agent/memory/tiss_style.md` | Distilled TISS writing rules |
| Workflows | `.agent/workflows/` | Main Antigravity/OpenClaw-style research procedures |
| Skills | `.agent/skills/` | Specialised tools, especially PDF-to-Markdown |
| Constitution | `9 - Knowledge_base/PHD_CONSTITUTION.md` | Governance law for the knowledge base |
| Schema | `9 - Knowledge_base/PHD_SCHEMA.md` and `Types/` | Correct note structure, YAML, and section logic |
| Knowledge index | `9 - Knowledge_base/index.md` | Map used to avoid duplicate concepts and preserve existing structure |
| Sources | `9 - Knowledge_base/sources/` | Immutable source text used for shattering |
| Topics | `9 - Knowledge_base/Topics/` | Living debate notes to be refreshed as evidence accumulates |
| Comparisons | `9 - Knowledge_base/Comparisons/` | Deep cross-paper synthesis |
| Queries | `9 - Knowledge_base/Queries/` | Research interaction logs |

Antigravity's key inventory is not just the scripts. Its real inventory is the combination of memory, workflows, constitution, schema, index, and knowledge-base structure.

---

## 3. How Antigravity fits the PhD workflow guide

The PhD workflow is:

```text
7 - Raw
-> rename-paper
-> scaffold
-> Manual Highlights
-> prime
-> add-zotero
-> Manual Verify
-> sync-bib
-> compile-phd
-> refresh-topic
-> lint-wiki
```

Antigravity fits best in the moments where interpretation, judgement, and knowledge integrity matter.

### Phase 1: Ingestion

Antigravity is not mainly needed to move files. Claude or Codex can do that.

But Antigravity is useful for checking:

- whether the paper already exists in the vault;
- whether the title belongs to an existing debate;
- whether the paper should enter the main workflow now or remain in pending reading;
- whether it belongs to a known topic area.

In Phase 1, Antigravity acts as quality control rather than the main file operator.

### Phase 2: High-Integrity Analysis

This is one of Antigravity's most important phases.

The principle is:

```text
Dinesh selects the highlights.
Antigravity reasons from the highlights.
```

Antigravity should not replace the deep reading step. It should take the curated quotes, page numbers, and raw thoughts from `## Highlights`, then build an AI Primer that reflects the scholar's priorities.

This keeps the AI grounded in human judgement.

### Phase 3: The Truth Loop

Antigravity is less central here because Zotero, bibliography sync, and metadata verification are operational tasks.

However, Antigravity can still help by asking:

- Is the citation attached to the correct paper?
- Is this source actually relevant to the PhD question?
- Does the bibliographic identity match the paper being shattered?

Claude or Codex may execute the sync, but Antigravity can help protect meaning and relevance.

### Phase 4: Knowledge Engineering

This is Antigravity's core zone.

In `compile-phd`, Antigravity acts like a conceptual surgeon.

It should:

1. read the source carefully;
2. identify atomic Concepts, People, and Methods;
3. search `index.md` before creating anything;
4. update existing notes instead of creating duplicates;
5. preserve contradictions;
6. avoid turning debates into one-sided summaries;
7. backlink each note to the paper master note;
8. decide what belongs in the permanent knowledge base and what does not.

This phase is not merely extraction. It is knowledge engineering.

### Phase 5: Neural Synthesis

This is another Antigravity-heavy phase.

In `refresh-topic`, Antigravity should connect new evidence to existing debates.

For example, if a new paper changes the understanding of land titling, Antigravity should ask:

- Does this change the Topic note on institutional property rights evolution?
- Does it support or weaken an existing argument?
- Does it introduce a new school of thought?
- Does it create a contradiction with North, Ostrom, Demsetz, Feder, or other existing scholars?
- Does it matter for the thesis chapters?

Antigravity's job is to keep the Topics alive rather than static.

### Phase 6: Wiki Vitality

Claude and Codex are strong at running `lint-wiki`, but Antigravity is useful for interpreting the result.

For example:

- A broken link is a technical issue.
- An orphan concept may be an intellectual issue.
- A Seed note may mean either "incomplete" or "not yet important."
- A duplicate note may reveal a real conceptual distinction that should not be merged too quickly.

Antigravity helps decide what the lint result means for the PhD system.

---

## 4. Antigravity compared with Claude and Codex

| Agent | Best role | Weakness if used alone |
|---|---|---|
| Antigravity | Conceptual eye and governance agent | May over-focus on meaning when direct execution is needed |
| Claude | Execution hand | May complete commands without enough conceptual caution |
| Codex | Natural-language operator and adapter | Must preserve the existing system while acting flexibly |

The clean division is:

```text
Antigravity = judge the intellectual meaning
Claude      = execute the workflow
Codex       = translate intent into safe action
```

From Codex's point of view, Antigravity is the agent I would use when the question is not "how do we run this?" but "what should this become in the PhD brain?"

---

## 5. How to prompt Antigravity well

Antigravity responds best to conceptual and governance prompts.

Good Antigravity prompts:

> Antigravity, read the highlights in this master note and tell me which concepts should enter the knowledge base.

> Antigravity, does this paper contradict our existing note on Tenure Security?

> Antigravity, after this paper is shattered, which Topic notes should be refreshed?

> Antigravity, compare this paper's argument with North and Ostrom. Should this become a Comparison note?

> Antigravity, audit whether the new Concepts are atomic or whether any should be split.

Less ideal Antigravity prompt:

> Antigravity, run the script and fix all YAML errors.

That kind of task may be better for Claude or Codex. Antigravity can interpret which errors matter, but Claude or Codex may be better at mechanical repair.

---

## 6. The Antigravity handoff pattern

A good workflow looks like this:

```text
Dinesh -> Claude or Codex:
Prepare the file, scaffold the note, sync metadata.

Dinesh -> Dinesh:
Deep read the paper and paste highlights.

Dinesh -> Antigravity:
Prime, interpret, shatter conceptually, identify contradictions.

Dinesh -> Claude or Codex:
Apply final formatting, lint the wiki, sync citations, verify structure.
```

Antigravity is most valuable in the middle of the workflow, where interpretation is central.

It should not displace the human reading step. It should amplify it.

---

## 7. Antigravity as the Constitution-facing agent

The most important difference between Antigravity and a normal summarising AI is that Antigravity is Constitution-facing.

That means:

- it should not overwrite contradictions;
- it should not create duplicate notes casually;
- it should not edit immutable sources;
- it should not collapse scholarly disagreement;
- it should not turn every source into a generic summary;
- it should keep the knowledge base atomic, linked, and governed.

This is why Antigravity is better understood as a knowledge-integrity agent than as a text generator.

---

## 8. The shortest definition

From Codex's point of view:

Antigravity is the conceptual eye of the PhD vault.

It reads the research system as a living knowledge graph. Its job is to interpret new material, protect scholarly nuance, preserve contradictions, and decide how each source should reshape the permanent PhD knowledge base.


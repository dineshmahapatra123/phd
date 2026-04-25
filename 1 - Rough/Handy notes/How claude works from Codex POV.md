# How Claude works in the PhD folder from Codex's point of view

From Codex's point of view, Claude is the execution-oriented agent in this PhD vault.

Claude is the agent most naturally connected to slash commands, scripts, terminal operations, file creation, formatting, and repeatable workflow execution. If Antigravity is strongest at conceptual steering, and Codex is strongest at translating natural language into safe workspace action, Claude is strongest at carrying out clearly specified operations.

---

## 1. Claude's basic role

Claude works as the technical operator of the PhD workflow.

It reads:

- `CLAUDE.md` for the vault architecture;
- `.claude/commands/` for slash-command playbooks;
- `.agent/workflows/` for shared workflow instructions;
- `scripts/` for Python automation;
- `9 - Knowledge_base/PHD_CONSTITUTION.md` for vault governance;
- `9 - Knowledge_base/PHD_SCHEMA.md` for note structure;
- `9 - Knowledge_base/TISS_STYLE.md` for PhD writing style.

In practical terms, Claude is the agent I would expect to be most comfortable with requests such as:

- "run `/scaffold`";
- "run `/sync-bib`";
- "execute `/lint-wiki` and show me the report";
- "style-check this chapter";
- "rename this PDF";
- "create the master note";
- "fix broken YAML across these files."

---

## 2. Claude's inventory in this vault

| Layer | File or folder | Claude's role |
|---|---|---|
| Main operating guide | `CLAUDE.md` | Claude's primary map of the vault |
| Slash commands | `.claude/commands/` | Command playbooks Claude can execute |
| Shared workflows | `.agent/workflows/` | Larger PhD workflow procedures Claude can read and follow |
| Shared skills | `.agent/skills/` | Specialised capabilities, especially PDF-to-Markdown |
| Python scripts | `scripts/` | Actual automation tools Claude runs |
| Constitution | `9 - Knowledge_base/PHD_CONSTITUTION.md` | Rules for safe knowledge-base work |
| Schema | `9 - Knowledge_base/PHD_SCHEMA.md` and `Types/` | Correct note types, YAML, and sections |
| Style guide | `9 - Knowledge_base/TISS_STYLE.md` | Rules for chapter prose and citation style |
| Bibliography | `PhD.bib` | Citation source of truth |
| Secrets note | `1 - Rough/Handy notes/HN_01.md` | Local credential source when needed, never to be printed |

Claude's strength is that it can take a command and execute the operational steps behind it.

---

## 3. How Claude fits the PhD workflow guide

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

Claude fits especially well at the moments where the workflow needs concrete execution.

### Phase 1: Ingestion

Claude is well suited for:

- renaming PDFs;
- checking file locations;
- running scaffold;
- creating master notes;
- ensuring the master note template is correct.

This is a technical preparation phase, so Claude is a natural fit.

### Phase 2: High-Integrity Analysis

Claude can run or follow the `prime` command, but it must respect the most important boundary:

```text
## Highlights belongs to Dinesh.
```

Claude should read highlights when asked, but should not write inside them. Its job is to produce the AI Primer from the curated material, not to decide what the primary highlights should be.

### Phase 3: The Truth Loop

Claude is very useful here because the work is technical and external-system oriented.

Claude can:

- call Zotero workflows;
- run bibliography sync;
- check whether the `APA Citation from Zotero:` line exists;
- use `PhD.bib`;
- diagnose sync errors;
- avoid printing credentials.

This is one of Claude's strongest zones because it involves APIs, scripts, and repeatable checks.

### Phase 4: Knowledge Engineering

Claude can run `compile-phd`, but this is where it must slow down and obey the Constitution.

Claude should:

1. check whether a source Markdown already exists;
2. use `pdf-to-markdown` if the source is missing;
3. read the full source;
4. inspect `index.md` before creating notes;
5. create or update Concepts, People, and Methods;
6. preserve contradictions instead of overwriting;
7. backlink to the master paper note;
8. update `index.md`;
9. log the operation.

Claude can do this well when the command file and governance files are clear.

### Phase 5: Neural Synthesis

Claude can run or assist with `refresh-topic`.

Its job here is to update topic notes cleanly and consistently. However, this phase is more conceptual than technical, so Antigravity may be better at deciding what the new evidence means. Claude is useful for implementing the update once the direction is clear.

### Phase 6: Wiki Vitality

Claude is very strong here.

Claude can:

- run `lint-wiki`;
- read `lint_report.md`;
- fix missing YAML;
- detect broken links;
- clean formatting;
- update index entries;
- re-run the linter to confirm the fix.

This is structural maintenance, which fits Claude well.

---

## 4. Claude compared with Antigravity and Codex

| Agent | Best role | Weakness if used alone |
|---|---|---|
| Claude | Execution hand | May focus on completing commands rather than questioning whether the scholarly move is right |
| Antigravity | Conceptual eye | May describe or guide more than directly execute technical repairs |
| Codex | Natural-language operator and adapter | Must preserve the existing architecture rather than inventing a new one |

The clean division is:

```text
Claude      = execute the workflow
Antigravity = judge the intellectual meaning
Codex       = translate intent into safe action
```

From Codex's point of view, Claude is the agent I would use when the task is already clear and needs to be carried out accurately.

---

## 5. How to prompt Claude well

Claude responds best to operational prompts.

Good Claude prompts:

> Claude, run `/scaffold` for the PDFs in `7 - Raw/` and report which master notes were created.

> Claude, run `/sync-bib`, then tell me which paper notes received APA citations and which were skipped.

> Claude, run `/lint-wiki`, read the report, and fix only missing YAML or broken index entries.

> Claude, style-check `6 - Writings/Chapter 1.md` against TISS style without changing the argument.

Less ideal Claude prompt:

> Claude, what does this whole literature mean for my thesis?

That kind of question may be better for Antigravity first. Claude can then implement the resulting changes.

---

## 6. The Claude handoff pattern

A good multi-agent workflow looks like this:

```text
Dinesh -> Claude:
Prepare the files, sync metadata, run scripts.

Dinesh -> Antigravity:
Interpret the concepts, contradictions, and thesis implications.

Dinesh -> Claude:
Apply the agreed changes, style-check, lint, and confirm structure.

Dinesh -> Codex:
Coordinate or translate natural-language requests into the right local operation.
```

Claude is especially useful at the start and end of a workflow:

- at the start, to prepare the paper technically;
- at the end, to clean, lint, sync, and verify.

Antigravity is most useful in the middle, where conceptual interpretation matters most.

Codex can move between both sides because it reads the inventory and chooses the right action.

---

## 7. The shortest definition

From Codex's point of view:

Claude is the execution hand of the PhD vault.

It turns explicit workflow commands into real file-system, script, citation, formatting, and linting operations. It is most valuable when the task is operationally clear and needs to be done reliably.


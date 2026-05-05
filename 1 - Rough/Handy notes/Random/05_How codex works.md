# How Codex works in the PhD folder

Codex works in this vault as a read-through adapter and workspace operator.

It does not replace Claude or Antigravity. It reads the existing Claude and Antigravity setup, understands the PhD workflow, and then turns natural-language requests into concrete local actions.

---

## 1. Codex's basic role

Codex is the agent that lets me speak like a researcher rather than like a terminal operator.

For example:

- "show vault status" means: run the Codex helper status command.
- "sync my bib" means: run the bibliography sync workflow.
- "lint the wiki" means: run the wiki health check and read the report.
- "compile this paper" means: follow the `compile-phd` workflow, read the Constitution and Schema, then create or update atomic knowledge-base notes.

So Codex is not just a script runner. It is a translator between research intent and workspace operations.

---

## 2. Codex's inventory in this vault

| Layer | File or folder | What Codex uses it for |
|---|---|---|
| Main Codex guide | `CODEX.md` | Codex's operating manual for this vault |
| Canonical architecture | `CLAUDE.md` | The broad map of the vault and workflow system |
| Governance | `9 - Knowledge_base/PHD_CONSTITUTION.md` | Rules that prevent unsafe edits, duplicates, and flattened contradictions |
| Schema | `9 - Knowledge_base/PHD_SCHEMA.md` | Correct note types, YAML fields, and body sections |
| Codex helper CLI | `.codex-phd/bin/phd.py` | Safe wrapper for repeated local commands |
| Codex workflows | `.codex-phd/workflows/` | Codex-readable versions of the PhD workflows |
| Codex vault skill | `.codex-phd/skills/phd-vault/SKILL.md` | Compact working instructions for this vault |
| Existing scripts | `scripts/` | Python automation Codex can run or inspect |
| Antigravity files | `.agent/` | Source material for workflows, skills, and vault memory |
| Claude commands | `.claude/commands/` | Source material for Claude-style slash commands |

The important design principle is that Codex reads the existing system before acting. It should preserve the current Claude and Antigravity setup rather than inventing a new one.

---

## 3. Codex and the PhD workflow guide

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

Codex fits into this workflow as follows.

### Phase 1: Ingestion

Goal: turn a raw PDF into a structured research object.

Codex can:

- inspect `7 - Raw/`;
- check whether a matching master note exists;
- run scaffolding through `.codex-phd/bin/phd.py`;
- help standardise filenames;
- avoid risky moves or renames unless explicitly asked.

Codex should be careful here because raw PDFs are canonical source material.

### Phase 2: High-Integrity Analysis

Goal: keep AI synthesis grounded in my reading.

The key rule is that `## Highlights` belongs to me.

Codex can read highlights if asked to prime or analyse a paper, but it should not write into that section. It can write to the AI Primer or produce a separate synthesis.

### Phase 3: The Truth Loop

Goal: keep bibliographic metadata correct.

Codex can:

- run `sync-bib`;
- inspect whether `APA Citation from Zotero:` exists in paper notes;
- help diagnose citation sync problems;
- avoid printing credentials or tokens.

It should treat Zotero credentials as secret and read them only when necessary.

### Phase 4: Knowledge Engineering

Goal: shatter a paper into the permanent knowledge base.

For `compile-phd`, Codex must:

1. read `CODEX.md`, `CLAUDE.md`, `PHD_CONSTITUTION.md`, and `PHD_SCHEMA.md`;
2. inspect `9 - Knowledge_base/index.md` before creating notes;
3. use existing source Markdown from `9 - Knowledge_base/sources/` when available;
4. create or update only atomic `Concept`, `Person`, and `Method` notes;
5. preserve contradictions instead of overwriting them;
6. backlink notes to the paper master note;
7. update the index;
8. log the work according to the Constitution.

This is where Codex becomes more than a command runner. It must reason about structure, duplication, contradiction, and provenance.

### Phase 5: Neural Synthesis

Goal: update living topic notes with new evidence.

Codex can help refresh topic notes by integrating new evidence into existing debates. It should not flatten disagreement into one clean answer. If papers disagree, Codex should preserve the disagreement as part of the scholarly debate.

### Phase 6: Wiki Vitality

Goal: keep the vault structurally healthy.

Codex can run:

```bash
python3 .codex-phd/bin/phd.py lint-wiki
```

Then it can read `9 - Knowledge_base/lint_report.md`, summarise the issues, and fix them if asked.

---

## 4. How Codex differs from Claude and Antigravity

| Agent | Main role | Best used for |
|---|---|---|
| Antigravity | Conceptual eye | Research synthesis, contradictions, topic evolution, knowledge integrity |
| Claude | Execution hand | Slash commands, scripts, formatting, file operations, API work |
| Codex | Natural-language operator | Translating research requests into safe workspace actions |

Another way to say it:

```text
Antigravity = research judgement and knowledge integrity
Claude      = workflow execution and technical operations
Codex       = natural-language adapter plus code/workspace operator
```

Codex can also directly execute work. If I say "lint the vault," Codex does not merely tell Claude what to do. It can run the helper command, inspect the result, and fix issues while following the same Constitution and Schema.

---

## 5. Why Codex has its own files

Codex has its own `.codex-phd/` layer because it needs a clean adapter surface.

The existing system already has:

- Claude instructions in `.claude/`;
- Antigravity workflows and skills in `.agent/`;
- shared scripts in `scripts/`;
- shared scholarly rules in `9 - Knowledge_base/`.

Codex's layer does not create a new PhD system. It creates a bridge.

The most important file is:

```text
.codex-phd/bin/phd.py
```

This provides safe repeated commands such as:

```bash
python3 .codex-phd/bin/phd.py status
python3 .codex-phd/bin/phd.py scaffold
python3 .codex-phd/bin/phd.py sync-bib
python3 .codex-phd/bin/phd.py lint-wiki
python3 .codex-phd/bin/phd.py paths
```

This makes Codex especially useful for quick operational requests.

---

## 6. The shortest definition

Codex is the agent that translates PhD intent into concrete workspace operations while preserving the Claude and Antigravity architecture already built in the folder.

It is useful because it lets me say:

> "Check the status of the vault."

instead of remembering:

```bash
python3 .codex-phd/bin/phd.py status
```

And it lets me say:

> "Compile this paper into the knowledge base."

instead of manually remembering every step of the Constitution, Schema, source handling, backlinking, indexing, and logging process.


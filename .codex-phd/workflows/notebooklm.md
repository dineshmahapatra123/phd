# Codex Workflow: notebooklm

Purpose: query the `PhD_Papers` NotebookLM notebook from Codex.

## Canonical CLI

Use the vault-local `notebooklm-py` CLI:

```bash
./.venv/bin/notebooklm
```

Codex helper equivalent:

```bash
python3 .codex-phd/bin/phd.py notebooklm-status
python3 .codex-phd/bin/phd.py notebooklm-sources
python3 .codex-phd/bin/phd.py notebooklm-ask "Question"
```

Active PhD notebook:

```bash
f802377d-2963-487f-8b74-5286f629eb91
```

## Steps

1. Check auth and context when starting a NotebookLM task:
   ```bash
   ./.venv/bin/notebooklm auth check
   ./.venv/bin/notebooklm status
   ```
2. Prefer explicit notebook IDs in every command so parallel agents do not overwrite shared context:
   ```bash
   ./.venv/bin/notebooklm ask -n f802377d-2963-487f-8b74-5286f629eb91 "Question"
   python3 .codex-phd/bin/phd.py notebooklm-ask "Question"
   ```
3. For structured answers with source references, use:
   ```bash
   ./.venv/bin/notebooklm ask -n f802377d-2963-487f-8b74-5286f629eb91 --json "Question"
   ```
4. To list available sources:
   ```bash
   ./.venv/bin/notebooklm source list -n f802377d-2963-487f-8b74-5286f629eb91 --json
   ```
5. Present NotebookLM answers as source-grounded output. Do not silently convert them into KB notes unless the user requests a KB workflow.

## Response Rule

For ordinary NotebookLM questions, return NotebookLM's answer directly.

- Remove CLI noise such as `Answer:` or resumed-conversation lines.
- Keep NotebookLM's structure and substance intact.
- Lightly clean formatting only when it improves readability.
- Do not add Codex synthesis, thesis framing, caveats, or process commentary unless the user explicitly asks for analysis.
- Do not separate "NotebookLM answer" from "Codex synthesis" unless the user asks for that distinction.

## Parallel-Agent Rule

Do not rely on `notebooklm use` in long or parallel workflows. Multiple agents may share the same default profile; explicit `-n f802377d-2963-487f-8b74-5286f629eb91` keeps Codex independent.

## Do Not

- Do not print auth cookies, storage files, or secrets.
- Do not save NotebookLM answers as NotebookLM notes unless the user asks; `--save-as-note` writes remotely.

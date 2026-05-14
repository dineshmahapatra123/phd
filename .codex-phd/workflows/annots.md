# Codex Workflow: annots

Purpose: extract embedded PDF annotations and highlighted passages into Markdown without relying on Claude, Antigravity, or Skim.

## Primary Command

```bash
python3 .codex-phd/bin/phd.py annots "7 - Raw/Paper.pdf"
```

Optional explicit output:

```bash
python3 .codex-phd/bin/phd.py annots "7 - Raw/Paper.pdf" \
  --output "1 - Rough/Handy_notes_02/Paper_annots.md"
```

## Behaviour

- Wraps `scripts/annots.py` through the vault `.venv`.
- Reads embedded PDF annotations with PyMuPDF.
- Extracts highlighted text and annotation comments.
- Cleans highlight text by fuzzy matching against `9 - Knowledge_base/sources/<PDF basename>.md`.
- Writes Markdown grouped by page.

## Preconditions

- The PDF must contain embedded annotations/highlights.
- A matching source Markdown must exist in `9 - Knowledge_base/sources/`.
- If the source Markdown is missing, run `pdf2md` first.

## Do Not

- Do not use Skim or `.skim` sidecars.
- Do not write extracted highlights into a master note's `## Highlights` section unless the user explicitly asks. That section remains user-curated.

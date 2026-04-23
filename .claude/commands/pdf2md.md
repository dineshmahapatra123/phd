---
description: Convert one or more PDF files to Markdown using opendataloader-pdf. Runs 100% locally on CPU.
---

# /pdf2md — PDF to Markdown

Converts a research PDF into clean, structured Markdown.

- **Output**: `9 - Knowledge_base/Full-Text/`
- **Requires**: Java 21 + `.venv-odl`

## Steps

1. **Set up the environment and run the conversion**:
   ```bash
   export JAVA_HOME="/opt/homebrew/opt/openjdk@21"
   export PATH="$JAVA_HOME/bin:$PATH"
   source "/Users/dineshmahapatra/Downloads/Dinesh/Code/Knowledge_Repo/.venv-odl/bin/activate"

   python3 "/Users/dineshmahapatra/Library/CloudStorage/GoogleDrive-dineshmahapatra123@gmail.com/My Drive/PhD/.agent/skills/pdf-to-markdown/scripts/convert.py" \
     --input "<input_path>" \
     --output "/Users/dineshmahapatra/Library/CloudStorage/GoogleDrive-dineshmahapatra123@gmail.com/My Drive/PhD/9 - Knowledge_base/Full-Text/" \
     --format "markdown"
   ```
   *(Replace `<input_path>` with the absolute path to the PDF the user specified.)*

2. **Report**: Show the first 20 lines of the generated `.md` as a preview, then confirm it is ready for `/compile-phd`.

---
name: pdf-to-markdown
description: Convert one or more PDF files to Markdown (and optionally JSON) using opendataloader-pdf. Runs 100% locally on CPU. Invoked via /pdf2md slash command.
---

# PDF to Markdown Skill (PhD Version)

## Overview
This skill converts research PDFs into clean, structured Markdown using [opendataloader-pdf].  
- **Outputs saved to**: "/Users/dineshmahapatra/Library/CloudStorage/GoogleDrive-dineshmahapatra123@gmail.com/My Drive/PhD/9 - Knowledge_base/sources/"

## Prerequisites
- **Java 21**: "/opt/homebrew/opt/openjdk@21"
- **Python venv**: "/Users/dineshmahapatra/Downloads/Dinesh/Code/Knowledge_Repo/.venv-odl"

## Invocation
The slash command /pdf2md triggers this skill.

## What the Agent Should Do
1. **Source the environment**:
   ```bash
   export JAVA_HOME="/opt/homebrew/opt/openjdk@21"
   export PATH="$JAVA_HOME/bin:$PATH"
   source "/Users/dineshmahapatra/Downloads/Dinesh/Code/Knowledge_Repo/.venv-odl/bin/activate"
   ```
2. **Run the conversion**:
   ```bash
   python3 "/Users/dineshmahapatra/Library/CloudStorage/GoogleDrive-dineshmahapatra123@gmail.com/My Drive/PhD/.agent/skills/pdf-to-markdown/scripts/convert.py" \
     --input "<input_path>" \
     --output "/Users/dineshmahapatra/Library/CloudStorage/GoogleDrive-dineshmahapatra123@gmail.com/My Drive/PhD/9 - Knowledge_base/sources/" \
     --format "markdown"
   ```
3. **Report**:
   - First 20 lines as a preview.
   - Confirmation that it is ready for @[/compile-phd].

#!/usr/bin/env python3
import sys
import subprocess
import plistlib
import os
import urllib.parse
import argparse

def extract_notes(pdf_path, output_dir=None):
    abs_path = os.path.abspath(pdf_path)
    if not os.path.exists(abs_path):
        print(f"Error: File not found at {abs_path}")
        sys.exit(1)

    # Check for sidecar .skim file (More reliable on Google Drive)
    # Google Drive often strips extended attributes from PDFs, so we prefer the .skim file if it exists.
    base_name = os.path.splitext(abs_path)[0]
    skim_file = base_name + ".skim"
    
    source_file = abs_path
    if os.path.exists(skim_file):
        # We read from the .skim file, but we keep the URL pointing to the PDF for deep links
        source_file = skim_file

    # Convert path to Skim URL format for deep linking
    # Format: skim:///full/path/to/doc.pdf#page=X
    # We always want the link to point to the PDF, even if we read from .skim
    url_path = urllib.parse.quote(abs_path)
    
    try:
        # Run skimnotes to get plist data
        result = subprocess.run(
            ['skimnotes', 'get', '-format', 'plist', source_file, '-'],
            capture_output=True,
            check=True
        )
        
        if not result.stdout:
            print("No notes found in this PDF.")
            return

        notes = plistlib.loads(result.stdout)
        
        # Sort notes by page index
        notes.sort(key=lambda x: x.get('pageIndex', 0))

        current_page = -1
        
        # Collect lines instead of printing immediately
        lines = []
        lines.append(f"# Notes from {os.path.basename(abs_path)}\n")
        
        for note in notes:
            page_idx = note.get('pageIndex', 0)
            page_num = page_idx + 1  # Humans use 1-based, Skim internal is 0-based
            note_type = note.get('type')
            
            # Text captured by the highlight
            # 'string' often holds the highlighted text in Skim plists
            # 'contents' holds the text user typed in the note note
            
            highlighted_text = note.get('string', '')
            user_note = note.get('contents', '')
            
            # Construct Deep Link
            # skim:// URL format: skim:///path/to/file.pdf#page=X
            deep_link = f"skim://{url_path}#page={page_num}"
            
            # Formatter
            # We want to group things or just list them.
            # Let's header the page if it changes
            if page_idx != current_page:
                # lines.append(f"\n## Page {page_num} [Link]({deep_link})")
                current_page = page_idx

            if highlighted_text:
                # Clean up newlines in highlights
                clean_highlight = highlighted_text.strip().replace('\n', ' ')
                lines.append(f"> {clean_highlight}")
                # Add the reference link immediately after quote
                lines.append(f" [Page {page_num}]({deep_link})\n")
            
            if user_note and user_note != highlighted_text:
                # If there's a user comment
                lines.append(f"**Note:** {user_note}")
                if not highlighted_text:
                     lines.append(f" [Page {page_num}]({deep_link})\n")
                else:
                    lines.append("\n")

        output_content = "\n".join(lines)

        if output_dir:
            # Create output directory if it doesn't exist
            if not os.path.exists(output_dir):
                os.makedirs(output_dir)
            
            # Determine filename
            pdf_name = os.path.basename(abs_path)
            md_name = os.path.splitext(pdf_name)[0] + ".md"
            out_path = os.path.join(output_dir, md_name)
            
            with open(out_path, "w") as f:
                f.write(output_content)
            print(f"Success: Notes saved to '{out_path}'")
        else:
            print(output_content)
            
    except subprocess.CalledProcessError as e:
        print(f"Error running skimnotes: {e}")
        # Sometimes skimnotes fails if no notes file exists and no embedded notes
        print("Ensure the PDF has Skim notes saved.")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Extract Skim notes to Markdown.")
    parser.add_argument("pdf_path", help="Path to the PDF file")
    parser.add_argument("--output", "-o", help="Directory to save the Markdown file (optional)")
    
    args = parser.parse_args()
    
    extract_notes(args.pdf_path, args.output)

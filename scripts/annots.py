#!/usr/bin/env python3
import sys
import os
import argparse
import fitz  # PyMuPDF
import re
from rapidfuzz import process, fuzz

def clean_text(text):
    """Basic cleanup for PDF text: merge hyphens and fix whitespace."""
    if not text:
        return ""
    # Merge hyphenated words at line breaks (handles newline or space after hyphen)
    text = re.sub(r'(\w+)-\s*\n?\s*(\w+)', r'\1\2', text)
    # Replace all newlines/tabs with spaces
    text = text.replace('\n', ' ').replace('\t', ' ')
    # Fix multiple spaces
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def find_clean_match(messy_text, source_md_content):
    """
    Uses fuzzy matching to find the cleanest version of messy_text in the source MD.
    QUALITY FILTER: If the PDF text is already high quality (score > 90), we keep it
    to preserve any manual OCR fixes (like Adobe's) that might not be in the Source MD.
    """
    cleaned_messy = clean_text(messy_text)
    if len(cleaned_messy) < 5:  # Noise filter: ignore very short fragments
        return ""
        
    if not source_md_content:
        return cleaned_messy
        
    # Split MD into sentences (roughly) using common delimiters
    sentences = re.split(r'(?<=[.!?])\s+', source_md_content)
    sentences = [s.strip() for s in sentences if len(s.strip()) > 10]
    
    # Use fuzzy search to find the best matching sentence
    best_match = process.extractOne(cleaned_messy, sentences, scorer=fuzz.partial_ratio)
    
    if best_match and best_match[1] > 65:
        # --- Option B: Quality Filter ---
        # If the match is extremely high (typo-level difference), 
        # and the PDF text has no obvious noise left, trust the PDF text.
        # This preserves 'modern' over 'modem' if the user fixed the PDF.
        if best_match[1] > 92 and '-' not in cleaned_messy:
            return cleaned_messy
        # Otherwise, the Source MD is still the Gold Standard for structural cleanup.
        return best_match[0]
    return cleaned_messy

def extract_annotations(pdf_path, output_path=None):
    if not os.path.exists(pdf_path):
        print(f"Error: File not found at {pdf_path}")
        return

    # --- 1. Check for Source MD ---
    base_name = os.path.splitext(os.path.basename(pdf_path))[0]
    sources_dir = "/Users/dineshmahapatra/Library/CloudStorage/GoogleDrive-dineshmahapatra123@gmail.com/My Drive/PhD/9 - Knowledge_base/sources"
    source_md_path = os.path.join(sources_dir, f"{base_name}.md")
    
    source_md_content = None
    if os.path.exists(source_md_path):
        with open(source_md_path, 'r') as f:
            source_md_content = f.read()
    else:
        print(f"!!! ALERT: High-fidelity source not found at: {source_md_path}")
        print("!!! ACTION REQUIRED: Please run @[/pdf2md] or finish the compile stage for this paper first to get perfect highlights.")
        return

    # --- 2. Extract from PDF ---
    doc = fitz.open(pdf_path)
    annotations_by_page = {}

    for i in range(len(doc)):
        page = doc[i]
        page_annots = []
        
        # Sort annotations by vertical position to keep reading order
        annots = sorted(list(page.annots()), key=lambda a: a.rect.y0)
        
        for annot in annots:
            subtype = annot.type[1]
            user_comment = annot.info.get("content", "").strip()
            
            highlighted_text = ""
            if annot.rect:
                # Grab the messy text from coordinates
                raw_text = page.get_text("text", clip=annot.rect)
                highlighted_text = find_clean_match(raw_text, source_md_content)

            # Skip if both are empty (noise filter)
            if not user_comment and not highlighted_text:
                continue
                
            page_annots.append({
                "subtype": subtype,
                "highlight": highlighted_text,
                "comment": user_comment
            })
        
        if page_annots:
            annotations_by_page[i + 1] = page_annots

    if not annotations_by_page:
        print("No annotations found in this PDF.")
        doc.close()
        return

    # --- 3. Format as Markdown ---
    lines = [f"# Clinical Annotations: {os.path.basename(pdf_path)}\n"]
    for page_num, annots in sorted(annotations_by_page.items()):
        lines.append(f"## Page {page_num}")
        for a in annots:
            if a['highlight']:
                lines.append(f"> {a['highlight']}\n")
            
            if a['comment']:
                if a['highlight']:
                    lines.append(f"**Note:** {a['comment']}\n")
                else:
                    lines.append(f"{a['comment']}\n")
        lines.append("")

    output_content = "\n".join(lines)
    doc.close()

    if output_path:
        with open(output_path, "w") as f:
            f.write(output_content)
        print(f"Success: Clinical notes saved to {output_path}")
    else:
        print(output_content)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Extract PDF annotations with Knowledge-Base matching.")
    parser.add_argument("pdf", help="Path to the PDF file")
    parser.add_argument("-o", "--output", help="Path to the output Markdown file")
    
    args = parser.parse_args()
    
    if not args.output:
        base_name = os.path.splitext(os.path.basename(args.pdf))[0]
        rough_dir = "/Users/dineshmahapatra/Library/CloudStorage/GoogleDrive-dineshmahapatra123@gmail.com/My Drive/PhD/1 - Rough/Handy_notes_02"
        args.output = os.path.join(rough_dir, f"{base_name}_annots.md")
        
    extract_annotations(args.pdf, args.output)

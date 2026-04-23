
import os
import re

# Paths
base_path = "/Users/dineshmahapatra/Library/CloudStorage/GoogleDrive-dineshmahapatra123@gmail.com/My Drive/PhD"
bib_path = os.path.join(base_path, "PhD.bib")
notes_dir = os.path.join(base_path, "2 - Notes/Papers")

import os
import re
from pybtex.database import parse_file
from citeproc import CitationStylesStyle, CitationStylesBibliography
from citeproc import formatter
from citeproc.source.bibtex import BibTeX

# Paths
base_path = "/Users/dineshmahapatra/Library/CloudStorage/GoogleDrive-dineshmahapatra123@gmail.com/My Drive/PhD"
bib_path = os.path.join(base_path, "PhD.bib")
notes_dir = os.path.join(base_path, "2 - Notes/Papers")

def parse_bib_file(file_path):
    """
    Parses a BibTeX file into a dictionary of title -> citation_string using citeproc-py for APA format.
    """
    if not os.path.exists(file_path):
        print(f"Error: Bib file not found at {file_path}")
        return {}

    print(f"Reading BibTeX library from: {file_path}")
    
    import tempfile
    import citeproc
    
    def to_sentence_case(text):
        result = []
        in_brace = 0
        capitalize_next = True
        for i, char in enumerate(text):
            if char == '{':
                in_brace += 1
                result.append(char)
            elif char == '}':
                in_brace = max(0, in_brace - 1)
                result.append(char)
            else:
                if in_brace > 0:
                    result.append(char)
                    if char.isalpha():
                        capitalize_next = False
                else:
                    if char.isalpha():
                        if capitalize_next:
                            result.append(char.upper())
                            capitalize_next = False
                        else:
                            result.append(char.lower())
                    elif not char.isspace() and char not in ['"', "'", '“', '”', '`', '{', '}']:
                        if char in [':', '.', '?', '!']:
                            capitalize_next = True
                            result.append(char)
                        else:
                            result.append(char)
                    else:
                        result.append(char)
        return "".join(result)

    # Parse the bib to get titles, but don't use it to write the file (to avoid formatting changes that break citeproc-py)
    # We do a preliminary parse of the file_path directly.
    bib_data_temp = parse_file(file_path)
    
    # Pre-process bib file text
    with open(file_path, 'r', encoding='utf-8') as f:
        bib_text = f.read()
    
    # 1. Fix bad 'year' values ('2025, June' -> '2025')
    bib_text = re.sub(r'(?i)year\s*=\s*(?:\{|")\s*(\d{4})[^\}\"]*(?:\}|")', r'year = {\1}', bib_text)
    
    # 2. Fix title casing by doing strict string replacements
    for key, entry in bib_data_temp.entries.items():
        if 'title' in entry.fields:
            old_title = entry.fields['title']
            new_title = to_sentence_case(old_title)
            # Replace exactly the braced substring to be safe
            bib_text = bib_text.replace("{" + old_title + "}", "{" + new_title + "}")
            bib_text = bib_text.replace('"' + old_title + '"', '"' + new_title + '"')

    with tempfile.NamedTemporaryFile(mode='w', suffix='.bib', delete=False, encoding='utf-8') as tf:
        tf.write(bib_text)
        temp_bib_path = tf.name

    # Load BibTeX source into citeproc using the carefully cleaned temporary file
    bib_source = BibTeX(temp_bib_path, encoding='utf-8')
    
    # Load the APA style
    style = CitationStylesStyle('apa', validate=False)
    
    # Create the bibliography model
    bibliography = CitationStylesBibliography(style, bib_source, formatter.plain)

    # The citeproc-py API requires a slightly different approach
    import citeproc

    entries = {}
    
    # Retrieve raw titles to build our dictionary
    bib_data = parse_file(temp_bib_path)
    
    # Cleanup temp file
    os.remove(temp_bib_path)
        
    for key, entry in bib_data.entries.items():
        if 'title' in entry.fields:
            raw_title = entry.fields['title']
            norm_title = normalize_title(raw_title)
            
            try:
                # Need a fresh bibliography for every item to get just that item's string cleanly
                temp_bib = CitationStylesBibliography(style, bib_source, formatter.plain)
                
                # Register specific citation
                citation_item = citeproc.CitationItem(key)
                citation = citeproc.Citation([citation_item])
                temp_bib.register(citation)
                
                # Get the formatted bibliography entry
                formatted_items = temp_bib.bibliography()
                if formatted_items:
                    formatted_citation = "".join(formatted_items[0])
                    # Remove any extra spaces or newlines that citeproc might add
                    formatted_citation = " ".join(formatted_citation.split())
                    entries[norm_title] = formatted_citation
            except Exception as e:
                 print(f"Warning: Could not format citation for {key}: {e}")

    print(f"Parsed and formatted {len(entries)} entries from Zotero library.")
    return entries

def normalize_title(title):
    # Remove special chars, extra spaces, lowercase
    # Also strip braces that might come from BibTeX
    title = title.replace('{', '').replace('}', '')
    clean = re.sub(r'[^a-zA-Z0-9\s]', '', title).lower()
    return " ".join(clean.split())

def sync_citations():
    zotero_db = parse_bib_file(bib_path)
    if not zotero_db:
        return

    updated_count = 0
    missing_count = 0
    
    if not os.path.exists(notes_dir):
        print(f"Notes directory not found: {notes_dir}")
        return
        
    for filename in os.listdir(notes_dir):
        if not filename.endswith(".md"):
            continue
            
        file_path = os.path.join(notes_dir, filename)
        
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Regex to find the Citation Line
        # We look for "APA Citation from Zotero:" followed by ANYTHING until the next newline
        # matching group 1 is the prefix, group 2 is existing value
        pattern = r"(APA Citation from Zotero:)(.*?)(\n|$)"
        match = re.search(pattern, content)
        
        if match:
            existing_val = match.group(2).strip()
            # We assume if it's currently empty OR if we spot our own previous weak output, we update
            # But to be safe for this "Fix" run, let's force update if Zotero has a match.
            
            note_title_raw = filename.replace(".md", "")
            note_title_norm = normalize_title(note_title_raw)
            
            citation = None
            if note_title_norm in zotero_db:
                citation = zotero_db[note_title_norm]
            else:
                for z_title, z_citation in zotero_db.items():
                    if note_title_norm in z_title or z_title in note_title_norm:
                        if len(z_title) > 10: 
                            citation = z_citation
                            break
            
            if citation:
                # If content changed (e.g. better format), update it
                if existing_val != citation:
                    print(f"Updating '{filename}'...\n   Old: {existing_val[:30]}...\n   New: {citation[:30]}...")
                    
                    new_line = f"APA Citation from Zotero: {citation}\n"
                    # Only replace the first occurrence
                    new_content = re.sub(pattern, new_line, content, count=1)
                    
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    
                    updated_count += 1
            else:
                missing_count += 1
                
    print("-" * 30)
    print(f"Sync Fix Complete.")
    print(f"Updated (Fixed): {updated_count} notes.")
    print(f"Missing (Still not in Zotero): {missing_count} notes.")

if __name__ == "__main__":
    sync_citations()

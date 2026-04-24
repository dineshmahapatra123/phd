import os
from datetime import date

# Paths
base_path = "/Users/dineshmahapatra/Library/CloudStorage/GoogleDrive-dineshmahapatra123@gmail.com/My Drive/PhD"
papers_dir = os.path.join(base_path, "7 - Raw")
notes_dir = os.path.join(base_path, "2 - Notes/Papers")
template_path = os.path.join(base_path, "5 - Templates/Paper Title as Zotero Cleaned.md")

def scaffold_notes():
    # 1. Read the template
    try:
        with open(template_path, 'r') as f:
            template_content = f.read()
    except FileNotFoundError:
        print(f"Error: Template not found at {template_path}")
        return

    # 2. List all PDFs
    if not os.path.exists(papers_dir):
        print(f"Error: Papers directory not found at {papers_dir}")
        return

    notes_created = 0
    today = date.today().strftime("%Y-%m-%d")

    for filename in os.listdir(papers_dir):
        if filename.lower().endswith('.pdf'):
            base_name = os.path.splitext(filename)[0]

            # --- 3. Scaffold Master Note ---
            note_filename = base_name + ".md"
            note_path = os.path.join(notes_dir, note_filename)

            if not os.path.exists(note_path):
                print(f"Creating Master Note for: {base_name}")
                # Substitute placeholders directly in the template
                note_content = (
                    template_content
                    .replace("{{paper_linked}}", filename)
                    .replace("{{date}}", today)
                )
                with open(note_path, 'w') as f:
                    f.write(note_content)
                notes_created += 1

    if notes_created == 0:
        print("No new scaffolding needed. All papers have corresponding notes.")
    else:
        print(f"Success: Created {notes_created} master notes.")

if __name__ == "__main__":
    scaffold_notes()

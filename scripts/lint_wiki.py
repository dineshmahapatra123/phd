import os
import re
from datetime import datetime

# Paths
base_path = "/Users/dineshmahapatra/Library/CloudStorage/GoogleDrive-dineshmahapatra123@gmail.com/My Drive/PhD/9 - Knowledge_base"
vault_path = os.path.dirname(base_path)
index_path = os.path.join(base_path, "index.md")
sources_dir = os.path.join(base_path, "sources")
raw_dir = os.path.join(vault_path, "7 - Raw")
folders_to_lint = ["Concepts", "People", "Methods", "Topics", "Comparisons"]
report_path = os.path.join(base_path, "lint_report.md")

def lint_wiki():
    report = []
    report.append(f"# 🔍 Neuro-Linter: Health Report ({datetime.now().strftime('%Y-%m-%d %H:%M:%S')})")
    report.append("\nThis report identifies structural and scholarly gaps in the PhD Knowledge Base. Review and address these to maintain high-integrity synthesis.")

    # 1. Load Index content
    try:
        with open(index_path, 'r') as f:
            index_content = f.read()
    except Exception as e:
        report.append(f"\n## ❌ ERROR: Could not read index.md at {index_path}")
        save_report(report)
        return
    indexed_targets = get_indexed_targets(index_content)

    # 2. Scan Folders
    all_issues = {
        "missing_yaml": [],
        "unindexed": [],
        "missing_pdfs": [],
        "missing_sources": [],
        "seed_notes": []
    }

    for folder in folders_to_lint:
        folder_path = os.path.join(base_path, folder)
        if not os.path.exists(folder_path):
            continue

        for filename in os.listdir(folder_path):
            if filename.endswith(".md"):
                file_path = os.path.join(folder_path, filename)
                with open(file_path, 'r') as f:
                    content = f.read()

                note_name = filename.replace(".md", "")

                # Check 1: YAML Presence
                if not content.startswith("---"):
                    all_issues["missing_yaml"].append(f"[[{folder}/{note_name}]]")
                else:
                    # Check 2: Index Presence
                    note_target = f"{folder}/{note_name}"
                    if note_name not in indexed_targets and note_target not in indexed_targets:
                        all_issues["unindexed"].append(f"[[{folder}/{note_name}]]")

                    # Check 3: Paper links and converted sources (handles multiple [[...]] values)
                    paper_linked_match = re.search(r"Paper_Linked:\s*(.+)", content)
                    if paper_linked_match:
                        linked_str = paper_linked_match.group(1)
                        linked_papers = re.findall(r"\[\[([^\]]+)\]\]", linked_str)
                        for paper_name in linked_papers:
                            pdf_name = paper_name if paper_name.lower().endswith(".pdf") else f"{paper_name}.pdf"
                            source_stem = paper_name[:-4] if paper_name.lower().endswith(".pdf") else paper_name
                            source_md = f"{source_stem}.md"

                            if not os.path.exists(os.path.join(raw_dir, pdf_name)):
                                all_issues["missing_pdfs"].append(f"[[{folder}/{note_name}]] -> Missing PDF: `{pdf_name}`")

                            if not os.path.exists(os.path.join(sources_dir, source_md)):
                                all_issues["missing_sources"].append(f"[[{folder}/{note_name}]] -> Missing source Markdown: `{source_md}`")

                    # Check 4: Seed Status / Vitality
                    if "Status: Seed" in content and len(content) < 500:
                        all_issues["seed_notes"].append(f"[[{folder}/{note_name}]] ({len(content)} chars)")

    # 3. Format Report
    if all_issues["missing_yaml"]:
        report.append("\n## ⚠️ Missing YAML Frontmatter")
        report.append("These notes do not follow the Layer 3 Schema. Run `@[/compile-phd]` or add manual YAML.")
        for item in all_issues["missing_yaml"]:
            report.append(f"- {item}")

    if all_issues["unindexed"]:
        report.append("\n## 🔗 Unindexed Articles")
        report.append("These articles exist but are not linked in the Master Index. Add them to `index.md` to prevent silos.")
        for item in all_issues["unindexed"]:
            report.append(f"- {item}")

    if all_issues["missing_pdfs"]:
        report.append("\n## 🚩 Missing Raw PDFs")
        report.append("`Paper_Linked` should point to PDFs in `7 - Raw/` with the `.pdf` extension.")
        for item in all_issues["missing_pdfs"]:
            report.append(f"- {item}")

    if all_issues["missing_sources"]:
        report.append("\n## 📄 Missing Converted Source Markdown")
        report.append("Each linked PDF should have a matching converted Markdown source in `9 - Knowledge_base/sources/` without the `.pdf` extension.")
        for item in all_issues["missing_sources"]:
            report.append(f"- {item}")

    if all_issues["seed_notes"]:
        report.append("\n## 🌱 Underdeveloped Seed Notes")
        report.append("These notes are currently very short. Consider performing 'Deep Curation' or more comparative reading.")
        for item in all_issues["seed_notes"]:
            report.append(f"- {item}")

    if not any(all_issues.values()):
        report.append("\n## ✅ All Systems Nominal")
        report.append("No structural or scholarly gaps detected. The Knowledge Base is fully integrated.")

    save_report(report)

def save_report(report):
    with open(report_path, 'w') as f:
        f.write("\n".join(report))
    print(f"Lint Report generated at: {report_path}")

def get_indexed_targets(index_content):
    targets = set()
    for raw_link in re.findall(r"\[\[([^\]]+)\]\]", index_content):
        target = raw_link.split("|", 1)[0].split("#", 1)[0]
        targets.add(target)
        targets.add(os.path.basename(target))
    return targets

if __name__ == "__main__":
    lint_wiki()

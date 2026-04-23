import os
import re
from datetime import datetime

# Paths
base_path = "/Users/dineshmahapatra/Library/CloudStorage/GoogleDrive-dineshmahapatra123@gmail.com/My Drive/PhD/9 - Knowledge_base"
index_path = os.path.join(base_path, "index.md")
sources_dir = os.path.join(base_path, "sources")
folders_to_lint = ["Concepts", "People", "Methods"]
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

    # 2. Scan Folders
    all_issues = {
        "missing_yaml": [],
        "unindexed": [],
        "broken_links": [],
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
                    if f"[[{note_name}]]" not in index_content:
                        all_issues["unindexed"].append(f"[[{folder}/{note_name}]]")

                    # Check 3: Broken Paper Links
                    match = re.search(r"Paper_Linked:\s*\[\[(.*?)\]\]", content)
                    if match:
                        paper_name = match.group(1)
                        paper_md = f"{paper_name}.md"
                        if not os.path.exists(os.path.join(sources_dir, paper_md)):
                            all_issues["broken_links"].append(f"[[{folder}/{note_name}]] -> Missing source: `{paper_name}`")

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

    if all_issues["broken_links"]:
        report.append("\n## 🚩 Broken Source Links")
        report.append("Metadata points to a paper that does not exist in the `sources/` folder.")
        for item in all_issues["broken_links"]:
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

if __name__ == "__main__":
    lint_wiki()

# 📖 Skim PDF Reader: Modern Research Guide

Skim is a specialized PDF reader for macOS designed for academic research. In our workflow, it acts as the **"Deep Reading"** interface where human intuition meets AI structure.

---

## ⚡ Essential Shortcuts

### 🖊️ Annotation & Highlights
| Task | Shortcut | Note |
| :--- | :--- | :--- |
| **Highlight Text** | `Cmd + Ctrl + H` | Most important for `@extract` |
| **Tool: New Note** | `Cmd + Ctrl + N` | Add specific thoughts to a page |
| **One-Swipe Highlight** | `Cmd + Ctrl + Tool Index` | Enter "Tool Mode" for rapid highlighting |
| **Save Notes** | `Cmd + S` | **CRITICAL**: Extraction won't work without saving! |
| **Toggle Reading Bar** | `Cmd + Shift + B` | Helps focus on one line at a time |

Control + H: Highlight + select -> highlight
### 🧭 Navigation & Reading
| Task | Shortcut | Note |
| :--- | :--- | :--- |
| **Full Screen** | `Fn + F` | Focus mode |
| **Magnify** | `Home` / `End` | Jump to start or end of document |
| **Snapshot** | `Cmd + Ctrl + S` | View two parts of a paper at once |
| **Table of Contents** | `Cmd + Opt + T` | Quick jump to chapters/sections |
| **Add Bookmark** | `Cmd + D` | Save internal locations |

### 🔍 Advanced Tool Modes
| Mode | Shortcut | Use Case |
| :--- | :--- | :--- |
| **Select Mode** | `Opt + Cmd + 1` | Standard cursor |
| **Magnify Mode** | `Opt + Cmd + 2` | Useful for reading tiny graph labels |
| **Select Tool** | `Opt + Cmd + 3` | Select regions to crop or screenshot |
| **Note Tool** | `Opt + Cmd + 4` | Click anywhere to drop a note |

---

## 🚀 Advanced Operations for Researchers

### 1. The "Snapshot" Feature
Researchers often need to look at a **Figure** on page 5 while reading **Results** on page 12. 
*   **Action**: Press `Cmd + Option + S`. 
*   A "Snapshot" window pops up of the current view. You can move this aside while you scroll through the rest of the text.

### 2. Smart Cropping (`Cmd + K`)
Academic papers often have huge white margins. 
*   **Auto Crop**: `Ctrl + Cmd + K` (Combined) or `Shift + Cmd + K` (Separate). 
*   This removes the margins so the text fills your screen, making reading much less fatiguing.

### 3. One-Swipe Highlighting (Speed Reading)
If you have a lot of text to highlight:
1.  Enable the Highlight tool: `Tools > Text Note > Highlight`.
2.  Now, every time you select text, it is **instantly** highlighted without needing a shortcut.
3.  **Pro Tip**: Open the **Color Panel** (`Cmd + Shift + C`) and keep it floating. You can click a new color in the panel to instantly change what your "auto-highlight" color is.

### 🌈 Color-Coded Research Strategy
Using colors helps the `@extract` process become a categorized knowledge base:
*   🟡 **Yellow**: General interesting points.
*   🟢 **Green**: Methodology / Evidence.
*   🔴 **Red**: Critiques / Gaps in literature.
*   🔵 **Blue**: Definitions / Core concepts.

### 📏 The Reading Bar (`Cmd + Shift + B`)
Large monitors can make reading long lines of text exhausting.
*   **How to use**: Toggle it with `Cmd + Shift + B`.
*   **Move it**: Use the **Arrow Keys** to move the bar down line-by-line.
*   **Resize**: Drag the edges to change its width/height.

---

## 🔄 PhD Workflow Integration (`@extract`)

The power of Skim in this system comes from its ability to export highlights that the AI can then process.

### The Standard Procedure:
1.  **Read & Highlight**: Open your paper in Skim. Use `Cmd + Ctrl + H` to highlight "Golden Nuggets."
2.  **Save**: Press `Cmd + S`. This writes the highlights to the file's extended attributes or a `.skim` sidecar.
3.  **Extract**: In the AI Chat, run:
    `@[/extract] [Paper Name]`
4.  **Result**: A new file appears in `Highlights/[Paper Name].md` containing your exact highlights with **Deep Links**.

---

## 🔗 Deep Linking & Sidecar Files

### 1. The Power of Deep Links
Every highlight extracted by the system includes a `skim://` URL. Clicking this in Obsidian will:
*   Open Skim.
*   Navigate directly to the specific page and highlight.
*   *Action*: Move the "Golden Nuggets" from the Highlight file into your `2 - Notes/Papers` note for permanent storage.

### 2. The `.skim` Sidecar (Google Drive Compatibility)
Google Drive often "strips" extended attributes from PDFs, which is where Skim normally stores notes. 
*   **Best Practice**: In Skim, go to `File > Export...` and choose **"Skim Notes"**. 
*   Save it in the same folder as the PDF (e.g., `Toward a Theory.pdf` and `Toward a Theory.skim`).
*   The `@extract` script is programmed to look for these `.skim` files first for maximum reliability.

---

## 🛠️ Customization Tips

*   **Custom Shortcuts**: You can change the highlight key in `System Settings > Keyboard > Keyboard Shortcuts > App Shortcuts`.
*   **Note Types**: Use different colors for different themes (e.g., Yellow for general, Red for critiques). The `@extract` tool captures all of them.
	
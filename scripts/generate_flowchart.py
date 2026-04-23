
import json
import random
import time

def get_id():
    return "".join(random.choices("abcdefghijklmnopqrstuvwxyz0123456789", k=10))

def get_now():
    return int(time.time() * 1000)

def create_rectangle(x, y, width, height, bg_color="transparent"):
    return {
        "type": "rectangle",
        "version": 1,
        "versionNonce": 0,
        "isDeleted": False,
        "id": get_id(),
        "fillStyle": "hachure",
        "strokeWidth": 1,
        "strokeStyle": "solid",
        "roughness": 1,
        "opacity": 100,
        "angle": 0,
        "x": x,
        "y": y,
        "strokeColor": "#000000",
        "backgroundColor": bg_color,
        "width": width,
        "height": height,
        "seed": random.randint(1, 100000),
        "groupIds": [],
        "strokeSharpness": "sharp",
        "boundElements": [],
        "updated": get_now(),
        "link": None,
        "locked": False
    }

def create_text(x, y, text_content, font_size=20, width=200):
    return {
        "type": "text",
        "version": 1,
        "versionNonce": 0,
        "isDeleted": False,
        "id": get_id(),
        "fillStyle": "hachure",
        "strokeWidth": 1,
        "strokeStyle": "solid",
        "roughness": 1,
        "opacity": 100,
        "angle": 0,
        "x": x,
        "y": y,
        "strokeColor": "#000000",
        "backgroundColor": "transparent",
        "width": width,
        "height": font_size + 5,
        "seed": random.randint(1, 100000),
        "groupIds": [],
        "strokeSharpness": "sharp",
        "boundElements": [],
        "updated": get_now(),
        "link": None,
        "locked": False,
        "text": text_content,
        "fontSize": font_size,
        "fontFamily": 1,
        "textAlign": "center",
        "verticalAlign": "middle",
        "baseline": 18
    }

def create_arrow(start_x, start_y, end_x, end_y):
    return {
        "type": "arrow",
        "version": 1,
        "versionNonce": 0,
        "isDeleted": False,
        "id": get_id(),
        "fillStyle": "hachure",
        "strokeWidth": 1,
        "strokeStyle": "solid",
        "roughness": 1,
        "opacity": 100,
        "angle": 0,
        "x": start_x,
        "y": start_y,
        "strokeColor": "#000000",
        "backgroundColor": "transparent",
        "width": end_x - start_x,
        "height": end_y - start_y,
        "seed": random.randint(1, 100000),
        "groupIds": [],
        "strokeSharpness": "round",
        "boundElements": [],
        "updated": get_now(),
        "link": None,
        "locked": False,
        "points": [[0, 0], [end_x - start_x, end_y - start_y]]
    }

elements = []
y_offset = 100
x_center = 400
node_width = 300
node_height = 60
gap = 40

colors = {
    "Researcher": "#dbeafe", # Blue
    "AI": "#f3e8ff",         # Purple
    "Script": "#fce7f3"      # Pink
}

# Define Phases
phases = [
    ("Phase 1: Ingestion", [
        ("Drop PDF in '7 - Raw'", "Researcher"),
        ("Rename Paper (@[/rename-paper])", "AI"),
        ("Scaffold Note (@[/scaffold])", "Script")
    ]),
    ("Phase 2: Analysis", [
        ("Deep Read in Skim", "Researcher"),
        ("Extract Highlights (@[/extract])", "AI"),
        ("Synthesize to Note", "Researcher"),
        ("Prime with AI (@[/prime])", "AI")
    ]),
    ("Phase 3: Truth Loop", [
        ("Add to Zotero (Metadata)", "Researcher"),
        ("Sync Citations (@[/sync-bib])", "Script")
    ]),
    ("Phase 4: Synthesis", [
        ("Snowball Concepts (@[/concept-snowballer])", "AI")
    ])
]

current_y = y_offset
previous_node_bottom_center = None

for phase_name, steps in phases:
    # Phase Header
    header = create_text(x_center - 150, current_y, phase_name, 24, 300)
    elements.append(header)
    current_y += 50
    
    for step_text, actor in steps:
        bg_color = colors.get(actor, "transparent")
        
        # Create Rectangle Node
        rect_x = x_center - node_width // 2
        rect_y = current_y
        rect = create_rectangle(rect_x, rect_y, node_width, node_height, bg_color)
        elements.append(rect)
        
        # Create Text Label
        text_x = rect_x + 10
        text_y = rect_y + 15
        text = create_text(text_x, text_y, step_text, 16, node_width - 20)
        elements.append(text)
        
        # Calculate connection points
        top_center = (x_center, rect_y)
        bottom_center = (x_center, rect_y + node_height)
        
        # Draw Arrow from previous node if exists
        if previous_node_bottom_center:
            start_x, start_y = previous_node_bottom_center
            end_x, end_y = top_center
            arrow = create_arrow(start_x, start_y, end_x, end_y)
            elements.append(arrow)
            
        previous_node_bottom_center = bottom_center
        current_y += node_height + gap
        
    current_y += gap # Extra gap between phases

# Add Legend
legend_y = current_y + 50
legend_x = x_center - 200

legend_title = create_text(legend_x, legend_y, "Legend:", 20, 100)
elements.append(legend_title)

# Draw Legend Items
offset = 120
for actor, color in colors.items():
    l_rect = create_rectangle(legend_x + offset, legend_y, 100, 30, color)
    l_text = create_text(legend_x + offset, legend_y + 5, actor, 14, 100)
    elements.append(l_rect)
    elements.append(l_text)
    offset += 120

data = {
  "type": "excalidraw",
  "version": 2,
  "source": "https://excalidraw.com",
  "elements": elements,
  "appState": {
    "viewBackgroundColor": "#ffffff",
    "gridSize": None
  },
  "files": {}
}


# Output nicely formatted JSON wrapped in Markdown for Obsidian
json_output = json.dumps(data, indent=2)

markdown_output = f"""---

excalidraw-plugin: parsed
tags: [excalidraw]

---
# Drawing
```json
{json_output}
```
"""

print(markdown_output)


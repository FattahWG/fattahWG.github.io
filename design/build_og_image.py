"""Social preview image (1200 x 630) in the dark glass direction.

Run:  python design/build_og_image.py design/og.json
      figcraft-cli run design/og.json --out design/og.figcraft
      figcraft-cli export design/og.figcraft -o apps/frontend/public/assets/og.png --format png
"""
import json
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS = os.path.join(ROOT, "apps", "frontend", "public", "assets")
FONT = "Montserrat"
BG, INK, MUTED, ACCENT = "#131316", "#F2F2F5", "#A9A9B6", "#FF6B57"

steps = []
next_id = [2]


def add(command, params):
    steps.append({"command": command, "params": params})
    next_id[0] += 1
    return next_id[0] - 1


def frame(x, y, w, h, parent=None, name="Frame", fill=None):
    p = {"type": "frame", "x": x, "y": y, "width": w, "height": h, "name": name, "props": {"fills": [fill] if fill else [], "clip": True}}
    if parent:
        p["parent"] = str(parent)
    return add("node.create", p)


def text(s, x, y, parent, size, color=INK, style="Regular", lh=None, track=None):
    props = {"fontFamily": FONT, "fontStyle": style, "fontSize": size, "fills": [color]}
    if lh:
        props["lineHeight"] = lh
    if track is not None:
        props["letterSpacing"] = track
    return add("node.create", {"type": "text", "x": x, "y": y, "parent": str(parent), "text": s, "name": s[:24], "props": props})


def image(rel, x, y, w, h, parent):
    holder = frame(x, y, w, h, parent, rel.split("/")[-1])
    add("image.place", {"path": os.path.join(ASSETS, rel), "x": 0, "y": 0, "width": w, "height": h, "parent": str(holder), "mode": "fill"})


og = frame(0, 0, 1200, 630, None, "og", BG)
text("Hi, I'm Fattah.\nI test software.", 56, 64, og, 80, style="Bold", lh="95%", track="-2%")
text("Fattah Widjaya Gandhi · SQA Engineer, Jakarta", 56, 262, og, 26)
text("Playwright and Bruno automation, a QA Lab you can run,\nand Roblox games at Lawak Studio.", 56, 302, og, 22, MUTED, lh="130%")
text("fattahwg.github.io", 56, 560, og, 22, style="Bold")

# A strip along the bottom right: real frames, the planted defect lifted.
x = 400
for rel, lifted in [("lab/step-sign-in.webp", False), ("sheet/ghost-3-m.webp", False), ("lab/step-def-001.webp", True),
                    ("sheet/gunung-2-m.webp", False)]:
    h = 200 if lifted else 90
    w = int(h * 1.6)
    image(rel, x, 520 - h, w, h, og)
    if lifted:
        text("DEF-001 · failed", x, 528, og, 18, ACCENT, "Bold")
    x += w + 8

json.dump(steps, open(sys.argv[1], "w", encoding="utf-8"), ensure_ascii=False)
print(len(steps), "steps")

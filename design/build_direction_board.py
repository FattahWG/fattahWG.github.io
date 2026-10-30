"""Direction board for the portfolio redesign (2026-10-31): palette, type, corner rule, hero at 1440 and 390.

Run:  python design/build_direction_board.py design/board.json
      figcraft-cli run design/board.json --out design/portfolio-direction.figcraft
      figcraft-cli render design/portfolio-direction.figcraft -o design/portfolio-direction.png
"""
import json
import math
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS = os.path.join(ROOT, "apps", "frontend", "public", "assets")
FONT = "Hanken Grotesk"
C = {"bg": "#18191b", "surface": "#222427", "ink": "#eff0f1", "muted": "#9c9ea3", "accent": "#ff4a1f", "field": "#eff0f1",
     "fieldInk": "#18191b"}

# Same order as apps/frontend/src/lib/sheet.ts (HERO_FRAMES).
HERO = ["img/ghost-expedition-cover", "sheet/store-shop-s", "sheet/gunung-2-s", "lab/step-def-001", "sheet/ghost-3-s",
        "sheet/qa-dashboard-cases-s", "sheet/gunung-4-s", "img/lawak-obstacle-cover", "sheet/store-admin-orders-s",
        "sheet/ghost-6-s", "lab/step-sign-in", "sheet/gunung-10-s", "img/desa-cover", "sheet/qa-showcase-s",
        "sheet/ghost-8-s", "lab/step-checkout", "img/gunung-lawak-cover", "sheet/store-admin-s",
        "sheet/ghost-soul-garden-s", "sheet/gunung-6-s", "projects/portfolio", "sheet/ghost-7-s"]

steps = []
next_id = [2]


def add(command, params):
    steps.append({"command": command, "params": params})
    nid = next_id[0]
    next_id[0] += 1
    return nid


def frame(x, y, w, h, parent=None, name="Frame", fill=None, rotation=0, clip=True):
    p = {"type": "frame", "x": x, "y": y, "width": w, "height": h, "name": name,
         "props": {"fills": [fill] if fill else [], "clip": clip, "rotation": rotation}}
    if parent:
        p["parent"] = str(parent)
    return add("node.create", p)


def text(s, x, y, parent, size, color="ink", style="Regular", width=None, lh=None, track=None):
    props = {"fontFamily": FONT, "fontStyle": style, "fontSize": size, "fills": [C.get(color, color)]}
    if lh:
        props["lineHeight"] = lh
    if track is not None:
        props["letterSpacing"] = track
    p = {"type": "text", "x": x, "y": y, "parent": str(parent), "text": s, "name": s[:24], "props": props}
    if width:
        p["width"] = width
        props["textAutoResize"] = "height"
    return add("node.create", p)


def image(rel, x, y, w, h, parent, rotation=0):
    holder = frame(x, y, w, h, parent, rel.split("/")[-1], None, rotation)
    add("image.place", {"path": os.path.join(ASSETS, rel + ".webp"), "x": 0, "y": 0, "width": w, "height": h,
                        "parent": str(holder), "mode": "fill"})


def ring(n, cx, cy, rx, ry, small, large):
    """Frame boxes on an ellipse: small at the top, large at the bottom and both ends; base along the curve."""
    out = []
    for i in range(n):
        a = -math.pi / 2 + i * 2 * math.pi / n
        x, y = cx + rx * math.cos(a), cy + ry * math.sin(a)
        grow = max((math.sin(a) + 1) / 2, abs(math.cos(a)))
        w = small + (large - small) * grow
        h = w * (0.75 if i % 2 == 0 else 1.333)
        tangent = math.degrees(math.atan2(ry * math.cos(a), -rx * math.sin(a)))
        if tangent > 90:
            tangent -= 180
        if tangent < -90:
            tangent += 180
        out.append((x - w / 2, y - h / 2, w, h, max(-30, min(30, tangent))))
    return out


board = frame(0, 0, 1600, 1220, None, "Portfolio direction board", C["bg"], 0, False)
text("Portfolio redesign: the contact sheet", 40, 32, board, 30, style="Medium", track="-2%")
text("tasteskill seed 1855925213 · Hanken Grotesk · graphite and orange · square corners", 40, 74, board, 16, "muted")

x = 40
for key in ["bg", "surface", "ink", "muted", "accent", "field"]:
    frame(x, 120, 140, 110, board, key, C[key])
    text(f"--{key}\n{C[key]}", x, 238, board, 14, "muted", lh="130%")
    x += 160

text("I test software\nand make games", 40, 330, board, 72, style="Medium", lh="90%", track="-5%")
text("Display 500, tracking -0.05em, leading 0.9. One statement size for every heading.", 40, 480, board, 16, "muted")
text("Lead: SQA Engineer in Jakarta. Banking, insurance and enterprise QA.", 40, 520, board, 24)
text("Body 17-19px, leading 1.45. Running text stays in the full ink. Small 13-14px for captions and values.", 40, 560,
     board, 18, width=900)
text("Corners: square on frames, buttons and panels. No 8-24px card radius. Not every block is a card.", 40, 600,
     board, 18, "accent", width=900)

# Hero at 1440 x 900, shown at half size.
hero = frame(40, 660, 720, 450, board, "Hero 1440", C["bg"])
for (fx, fy, fw, fh, rot), rel in zip(ring(22, 360, 225, 280, 155, 50, 75), HERO):
    image(rel, fx, fy, fw, fh, hero, rot)
text("I test software\nand make games", 230, 168, hero, 39, style="Medium", lh="95%", track="-5%")
text("Fattah Widjaya Gandhi, SQA Engineer in Jakarta.", 230, 254, hero, 10, "muted", width=260)
btn = frame(230, 278, 110, 22, hero, "Action", C["ink"])
text("Run my test suite", 10, 5, btn, 9, "fieldInk", "Medium")
text("fattahwg", 16, 14, hero, 9, style="Medium")
text("Work   QA Lab   Contact", 600, 14, hero, 8)
text("Hero at 1440 (half size)", 40, 1124, board, 14, "muted")

# Phone at 390 x 844, shown at 0.6.
phone = frame(820, 660, 234, 506, board, "Hero 390", C["bg"])
for (fx, fy, fw, fh, rot), rel in zip(ring(12, 117, 253, 154, 154, 40, 52), HERO[::2]):
    image(rel, fx, fy, fw, fh, phone, rot)
text("I test software\nand make games", 22, 222, phone, 24, style="Medium", lh="95%", track="-5%")
text("fattahwg", 12, 10, phone, 8, style="Medium")
text("Menu", 196, 10, phone, 8)
text("Hero at 390 (0.6 size)", 820, 1180, board, 14, "muted")

# The lifted frame run: DEF-001 stands above the other steps.
run = frame(1090, 660, 470, 300, board, "Frame run", C["bg"])
text("Automation you can check", 0, 0, run, 16, style="Medium")
xr = 0
for rel, lifted in [("lab/step-sign-in", False), ("lab/step-cart", False), ("lab/step-def-001", True),
                    ("lab/step-checkout", False), ("lab/step-admin-order", False)]:
    h = 150 if lifted else 68
    w = h * 1.6
    image(rel, xr, 250 - h, w, h, run)
    if lifted:
        text("TC-CHK-006 failed: DEF-001", xr, 256, run, 11, "accent", "Medium")
    xr += w + 6
text("Showcase: one frame lifted (the planted defect)", 1090, 980, board, 14, "muted")

json.dump(steps, open(sys.argv[1], "w", encoding="utf-8"), ensure_ascii=False)
print(len(steps), "steps")

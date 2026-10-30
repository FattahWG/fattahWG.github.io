"""Two glassmorphism boards (dark and light) after Fattah's Behance reference, 2026-10-31.

Run:  python design/build_glass_boards.py design/glass.json
      figcraft-cli run design/glass.json --out design/portfolio-glass.figcraft
      figcraft-cli export design/portfolio-glass.figcraft -o design/glass --format png
"""
import json
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
A = os.path.join(ROOT, "apps", "frontend", "public", "assets")
FONT = "Montserrat"
steps = []
nid = [2]


def add(cmd, params):
    steps.append({"command": cmd, "params": params})
    nid[0] += 1
    return nid[0] - 1


def effect(node, kind, radius):
    steps.append({"command": "effect.add", "params": {"ids": [str(node)], "type": kind, "effect": {"type": kind, "radius": radius}}})


def box(x, y, w, h, parent=None, fill=None, r=0, name="Box", stroke=None, clip=True):
    props = {"fills": [fill] if fill else [], "cornerRadius": r, "clip": clip}
    if stroke:
        props.update({"strokes": [stroke], "strokeWeight": 1, "strokeAlign": "inside"})
    p = {"type": "frame", "x": x, "y": y, "width": w, "height": h, "name": name, "props": props}
    if parent:
        p["parent"] = str(parent)
    return add("node.create", p)


def glow(x, y, d, parent, color, radius):
    e = add("node.create", {"type": "ellipse", "x": x, "y": y, "width": d, "height": d, "parent": str(parent), "props": {"fills": [color]}})
    effect(e, "layerBlur", radius)


def glass(x, y, w, h, parent, t, r=20, name="Glass"):
    g = box(x, y, w, h, parent, t["glass"], r, name, t["edge"])
    effect(g, "backgroundBlur", 24)
    return g


def text(s, x, y, parent, size, color, style="Regular", width=None, lh=None, track=None):
    props = {"fontFamily": FONT, "fontStyle": style, "fontSize": size, "fills": [color]}
    if lh:
        props["lineHeight"] = lh
    if track is not None:
        props["letterSpacing"] = track
    p = {"type": "text", "x": x, "y": y, "parent": str(parent), "text": s, "name": s[:24], "props": props}
    if width:
        p["width"] = width
        props["textAutoResize"] = "height"
    return add("node.create", p)


def image(rel, x, y, w, h, parent, r=0):
    holder = box(x, y, w, h, parent, None, r, rel.split("/")[-1])
    add("image.place", {"path": os.path.join(A, rel), "x": 0, "y": 0, "width": w, "height": h, "parent": str(holder), "mode": "fill"})


def pill(label, x, y, parent, fill, ink, size=10, stroke=None):
    w = int(len(label) * size * 0.62 + 30)
    b = box(x, y, w, size * 2 + 12, parent, fill, 999, "Button " + label, stroke)
    text(label, 15, 6 + size * 0.3, b, size, ink, "SemiBold")
    return w


def grid_lines(parent, w, h, color, step=48):
    for gx in range(0, w, step):
        box(gx, 0, 1, h, parent, color, 0, "grid")
    for gy in range(0, h, step):
        box(0, gy, w, 1, parent, color, 0, "grid")


def mini_run(x, y, w, parent, t):
    rows = [("TC-AUTH-001", "Sign in with the demo admin", True), ("TC-CART-001", "Add a product to the cart", True),
            ("TC-CHK-001", "Pay with the test card", True), ("TC-CHK-006", "Postal code needs 5 digits", False),
            ("TC-AOR-002", "Admin moves the order", True)]
    c = glass(x, y, w, 38 + len(rows) * 24, parent, t, 18, "Mini run")
    text("lawak-store · smoke", 14, 12, c, 9, t["ink"], "SemiBold")
    pill("Run again", w - 84, 7, c, t["accent"], "#FFFFFF", 8)
    for i, (tid, title, ok) in enumerate(rows):
        yy = 38 + i * 24
        box(14, yy + 2, 10, 10, c, t["pass"] if ok else t["fail"], 99)
        text(f"{tid}  {title}", 32, yy, c, 9, t["ink"])
        text("passed" if ok else "DEF-001", w - 56, yy, c, 9, t["soft"] if ok else t["fail"], "SemiBold")


def board(index, title, sub, t, notes):
    bx = index * 1660
    b = box(bx, 0, 1600, 1000, None, t["page"], 0, f"Glass {title}")
    text(title, 40, 28, b, 28, t["ink"], "Bold")
    text(sub, 40, 70, b, 14, t["soft"], width=1500)
    x = 40
    for name, hexv in t["swatches"]:
        box(x, 104, 92, 52, b, hexv, 14, name, t["edge"])
        text(f"{name}\n{hexv}", x, 162, b, 10, t["soft"], lh="130%")
        x += 104
    text("Aa · I test software.", 820, 104, b, 40, t["ink"], "Bold", track="-2%")
    text("Montserrat · 700 headings, 400 body", 820, 156, b, 13, t["soft"])

    # Hero, half size.
    h = box(40, 220, 720, 450, b, t["bg"], 24, "Hero 1440 (half size)")
    grid_lines(h, 720, 450, t["line"])
    glow(420, -80, 300, h, t["glow1"], 90)
    glow(-60, 260, 260, h, t["glow2"], 90)
    nav = glass(110, 14, 500, 34, h, t, 999, "Nav")
    text("fattahwg", 16, 10, nav, 10, t["ink"], "Bold")
    text("Experience   Projects   Games   QA Lab   Contact", 140, 11, nav, 8, t["soft"], "Medium")
    pill("CV", 452, 6, nav, t["accent"], "#FFFFFF", 8)
    chip = glass(36, 92, 196, 22, h, t, 999, "Status")
    text("QA Software Engineer at Astragraphia", 12, 6, chip, 7, t["soft"], "Medium")
    text("Hi, I'm Fattah.", 36, 126, h, 40, t["ink"], "Bold", track="-2%")
    text("I test software and\nbuild Roblox games.", 36, 176, h, 22, t["accent_text"], "SemiBold", lh="115%")
    text("SQA Engineer in Jakarta, 2.5+ years in banking,\ninsurance and enterprise QA.", 36, 238, h, 10, t["soft"], lh="150%")
    pill("Watch my tests run", 36, 282, h, t["accent"], "#FFFFFF", 9)
    w2 = pill("Download CV", 172, 282, h, t["glass"], t["ink"], 9, t["edge"])
    photo = glass(470, 70, 200, 240, h, t, 22, "Photo")
    image("img/github-avatar.webp", 8, 8, 184, 224, photo, 16)
    mini_run(380, 250, 300, h, t)
    text("Hero at 1440, half size", 40, 680, b, 12, t["soft"])

    # Section, half size: projects with tabs, then games.
    s = box(840, 220, 720, 450, b, t["bg"], 24, "Section")
    grid_lines(s, 720, 450, t["line"])
    glow(500, 200, 320, s, t["glow1"], 100)
    text("Automation you can check", 32, 26, s, 24, t["ink"], "Bold", track="-2%")
    tabs = glass(32, 70, 250, 30, s, t, 999, "Tabs")
    pill("Lawak Store", 4, 3, tabs, t["accent"], "#FFFFFF", 8)
    text("Portfolio test suite", 118, 9, tabs, 8, t["soft"], "SemiBold")
    p = glass(32, 116, 656, 190, s, t, 20, "Project panel")
    text("Lawak Store", 18, 18, p, 15, t["ink"], "Bold")
    text("A demo shop with an admin panel,\ncovered by 50 test cases.", 18, 44, p, 9, t["soft"], lh="150%")
    px = 18
    for tech in ["Playwright", "Bruno CLI", "GitHub Actions"]:
        px += pill(tech, px, 90, p, t["glass"], t["ink"], 7, t["edge"]) + 5
    pill("Read the QA case study", 18, 140, p, t["accent"], "#FFFFFF", 8)
    image("lab/step-def-001.webp", 300, 14, 340, 162, p, 14)
    x = 32
    for slug in ["ghost-expedition", "lawak-obstacle", "gunung-lawak", "desa"]:
        g = glass(x, 320, 158, 116, s, t, 16, slug)
        image(f"img/{slug}-cover.webp", 6, 6, 146, 78, g, 12)
        text(slug.replace("-", " ").title(), 10, 92, g, 8, t["ink"], "SemiBold")
        x += 166
    text("One section, half size", 840, 680, b, 12, t["soft"])

    text("Interactions", 40, 730, b, 17, t["ink"], "Bold")
    text("\n".join("• " + n for n in notes), 40, 760, b, 14, t["soft"], width=1500, lh="160%")


DARK = {
    "page": "#0E0E10", "bg": "#131316", "glass": "#FFFFFF12", "edge": "#FFFFFF2B", "line": "#FFFFFF0A",
    "ink": "#F2F2F5", "soft": "#A9A9B6", "accent": "#7B61FF", "accent_text": "#B9AEFF", "pass": "#5BD6A0", "fail": "#FF6B57",
    "glow1": "#3E3392", "glow2": "#221F45",
    "swatches": [("ground", "#131316"), ("glass", "#FFFFFF12"), ("edge", "#FFFFFF2B"), ("ink", "#F2F2F5"), ("soft", "#A9A9B6"), ("violet", "#7B61FF"), ("fail", "#FF6B57")],
}
LIGHT = {
    "page": "#FFFFFF", "bg": "#F3F4F9", "glass": "#FFFFFF8C", "edge": "#FFFFFFE6", "line": "#14172410",
    "ink": "#161827", "soft": "#555A70", "accent": "#5B45E0", "accent_text": "#4B37C9", "pass": "#1FA971", "fail": "#E5482F",
    "glow1": "#B9AEFF", "glow2": "#BDE7FF",
    "swatches": [("ground", "#F3F4F9"), ("glass", "#FFFFFF8C"), ("edge", "#FFFFFFE6"), ("ink", "#161827"), ("soft", "#555A70"), ("violet", "#5B45E0"), ("fail", "#E5482F")],
}
NOTES = [
    "Glass cards with a soft blur and a thin light edge; one violet glow drifts slowly behind the hero and follows the pointer a little.",
    "Hero: your photo in a glass frame and the mini test run; press Run again and DEF-001 fails in red. Headline lines fade up.",
    "Projects: glass tabs (Lawak Store / Portfolio suite); step buttons switch the screenshot. QA Lab: module filters on the test list.",
    "Games: glass cards lift and tilt on hover; the cover plays gameplay screenshots. Only one accent colour, violet.",
]

board(0, "Dark glass", "After your Behance reference: charcoal ground, faint line grid, violet glow, frosted cards. Calm colours: grey-white and one violet.", DARK, NOTES)
board(1, "Light glass", "Closer to the GitHub version: soft light ground, lavender and sky glows, white frosted cards. Same layout and interactions.", LIGHT, NOTES)

json.dump(steps, open(sys.argv[1], "w", encoding="utf-8"), ensure_ascii=False)
print(len(steps), "steps")

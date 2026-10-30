"""Three light, playful option boards for the portfolio (2026-10-31, after Fattah rejected the contact sheet).

Run:  python design/build_option_boards.py design/options.json
      figcraft-cli run design/options.json --out design/portfolio-options.figcraft
      figcraft-cli export design/portfolio-options.figcraft -o design/options --format png
"""
import json
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
A = os.path.join(ROOT, "apps", "frontend", "public", "assets")
steps = []
nid = [2]


def add(cmd, params):
    steps.append({"command": cmd, "params": params})
    nid[0] += 1
    return nid[0] - 1


def box(x, y, w, h, parent=None, fill=None, r=0, name="Box", stroke=None):
    props = {"fills": [fill] if fill else [], "cornerRadius": r, "clip": True}
    if stroke:
        props.update({"strokes": [stroke], "strokeWeight": 2, "strokeAlign": "inside"})
    p = {"type": "frame", "x": x, "y": y, "width": w, "height": h, "name": name, "props": props}
    if parent:
        p["parent"] = str(parent)
    return add("node.create", p)


def text(s, x, y, parent, size, color, font, style="Regular", width=None, lh=None, track=None):
    props = {"fontFamily": font, "fontStyle": style, "fontSize": size, "fills": [color]}
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
    return holder


def pill(label, x, y, parent, fill, ink, font, size=11, w=None):
    w = w or int(len(label) * size * 0.58 + 28)
    b = box(x, y, w, size * 2 + 10, parent, fill, 999, "Button " + label)
    text(label, 14, 5 + size * 0.35, b, size, ink, font, "Bold" if "Cabinet" in font or "Schibsted" in font else "SemiBold")
    return w


def runner(x, y, w, parent, font, ink, pass_c, fail_c, card, r):
    """The mini test run: rows tick green, TC-CHK-006 turns red."""
    rows = [("TC-AUTH-001", "Sign in with the demo admin", True), ("TC-CART-001", "Add a product to the cart", True),
            ("TC-CHK-001", "Pay with the test card", True), ("TC-CHK-006", "Postal code needs 5 digits", False),
            ("TC-AOR-002", "Admin moves the order", True)]
    c = box(x, y, w, 40 + len(rows) * 26, parent, card, r, "Mini run")
    text("lawak-store · smoke", 16, 12, c, 10, ink, font, "Bold" if "Cabinet" in font or "Schibsted" in font else "SemiBold")
    pill("Run again", w - 92, 8, c, ink, card, font, 9, 78)
    for i, (tid, title, ok) in enumerate(rows):
        yy = 40 + i * 26
        box(16, yy + 2, 14, 14, c, pass_c if ok else fail_c, 999)
        text(f"{tid}  {title}", 38, yy, c, 10, ink, font)
        text("passed" if ok else "DEF-001", w - 64, yy, c, 10, ink if ok else fail_c, font, "Bold" if "Cabinet" in font or "Schibsted" in font else "SemiBold")


def board(index, title, sub, font, display_style, palette, hero, section, notes):
    bx = index * 1660
    b = box(bx, 0, 1600, 1040, None, "#ffffff", 0, f"Option {title}")
    text(title, 40, 28, b, 30, "#111111", font, display_style, track="-3%")
    text(sub, 40, 70, b, 15, "#444444", font)
    x = 40
    for name, hexv in palette:
        box(x, 108, 92, 56, b, hexv, 16, name, "#00000022" if hexv.lower() in ("#ffffff", "#f7f7f2") else None)
        text(f"{name}\n{hexv}", x, 170, b, 11, "#444444", font, lh="130%")
        x += 104
    text("Aa · I test software.", 760, 112, b, 46, "#111111", font, display_style, track="-4%")
    text(font, 760, 172, b, 14, "#444444", font)
    hero(box(40, 230, 720, 450, b, None, 24, "Hero 1440 (half size)"))
    section(box(840, 230, 720, 450, b, None, 24, "Section"))
    text("Hero at 1440, half size", 40, 690, b, 13, "#666666", font)
    text("One section, half size", 840, 690, b, 13, "#666666", font)
    text("Interactions", 40, 740, b, 18, "#111111", font, display_style)
    text("\n".join("• " + n for n in notes), 40, 772, b, 15, "#333333", font, width=1500, lh="150%")


# ---------- Option A: colour chapters ----------
FA = "Cabinet Grotesk"
PA = [("sky", "#BFE3FF"), ("mint", "#C6F0D6"), ("lemon", "#FFEA7F"), ("lilac", "#D9CCFF"), ("peach", "#FFCBA8"), ("ink", "#14213D"), ("tomato", "#FF5A36")]


def hero_a(h):
    box(0, 0, 720, 450, h, "#BFE3FF")
    text("fattahwg", 24, 18, h, 12, "#14213D", FA, "Extrabold")
    text("QA   Lab   Games   Contact", 470, 18, h, 11, "#14213D", FA, "Medium")
    text("hi, i'm fattah.\ni test software.", 24, 96, h, 46, "#14213D", FA, "Extrabold", lh="90%", track="-3.5%")
    text("SQA Engineer in Jakarta. I also make Roblox games.", 26, 214, h, 13, "#14213D", FA, width=300)
    pill("Watch my tests run", 24, 256, h, "#FF5A36", "#ffffff", FA, 11)
    pill("Download CV", 170, 256, h, "#ffffff", "#14213D", FA, 11)
    runner(404, 90, 296, h, FA, "#14213D", "#2BB673", "#FF5A36", "#ffffff", 22)
    image("img/ghost-expedition-icon.webp", 640, 300, 64, 64, h, 32)
    box(0, 380, 720, 70, h, "#C6F0D6")
    text("where i test  →", 24, 398, h, 26, "#14213D", FA, "Extrabold", track="-3%")


def section_a(s):
    box(0, 0, 720, 450, s, "#D9CCFF")
    text("games we made", 24, 22, s, 40, "#14213D", FA, "Extrabold", track="-3.5%")
    x = 24
    for i, (cover, name) in enumerate([("ghost-expedition", "Ghost Expedition"), ("lawak-obstacle", "Lawak Obstacle"), ("gunung-lawak", "Gunung Lawak")]):
        c = box(x, 96, 214, 300, s, "#ffffff", 28, name)
        image(f"img/{cover}-cover.webp", 10, 10, 194, 110, c, 20)
        text(name, 14, 132, c, 15, "#14213D", FA, "Extrabold")
        text("Hover: cover plays a\nshort preview, card tilts.", 14, 156, c, 11, "#14213D", FA, lh="130%")
        pill("Play on Roblox", 14, 252, c, "#14213D", "#ffffff", FA, 10)
        x += 228


board(0, "A · Colour chapters", "Each section is one bright colour taken from your games, floor to ceiling. Rounded cards, pill buttons.", FA, "Extrabold", PA, hero_a, section_a, [
    "Hero: the mini test run plays by itself; the visitor presses Run again and watches DEF-001 fail in tomato.",
    "Scroll: each colour chapter slides up; the headline letters bounce in once; the page colour of the nav changes per chapter.",
    "Games: cards tilt toward the pointer; the cover swaps to a short gameplay loop on hover; a small ghost follows the cursor in the games chapter.",
    "Tabs: QA work / Games switch at the top of the projects chapter.",
])

# ---------- Option B: the well-kept board ----------
FB = "Schibsted Grotesk"
PB = [("paper", "#F7F7F2"), ("lime", "#D8F36A"), ("sky", "#A6D8FF"), ("lilac", "#CDB8FF"), ("white", "#FFFFFF"), ("ink", "#161616"), ("tomato", "#FF5A36")]


def hero_b(h):
    box(0, 0, 720, 450, h, "#F7F7F2")
    text("fattahwg", 16, 12, h, 12, "#161616", FB, "Bold")
    x = 470
    for label, on in [("All", True), ("QA work", False), ("Games", False)]:
        x += pill(label, x, 8, h, "#161616" if on else "#ffffff", "#ffffff" if on else "#161616", FB, 10) + 6
    t = box(12, 44, 344, 170, h, "#D8F36A", 28, "Name tile")
    text("hi, i'm\nfattah.", 18, 18, t, 56, "#161616", FB, "ExtraBold", lh="88%", track="-5%")
    s = box(364, 44, 344, 80, h, "#ffffff", 28, "Statement")
    text("SQA Engineer in Jakarta. I test software\nand direct Roblox games.", 18, 18, s, 14, "#161616", FB, lh="130%")
    act = box(364, 132, 168, 82, h, "#FF5A36", 28, "Action")
    text("Watch my\ntests run →", 18, 16, act, 15, "#ffffff", FB, "Bold", lh="110%")
    cv = box(540, 132, 168, 82, h, "#A6D8FF", 28, "CV")
    text("Download\nCV ↓", 18, 16, cv, 15, "#161616", FB, "Bold", lh="110%")
    runner(12, 222, 344, h, FB, "#161616", "#2BB673", "#FF5A36", "#ffffff", 28)
    image("img/ghost-expedition-cover.webp", 364, 222, 168, 172, h, 28)
    image("img/gunung-lawak-cover.webp", 540, 222, 168, 172, h, 28)
    stat = box(12, 402, 696, 40, h, "#CDB8FF", 20, "Marquee")
    text("Playwright · Bruno · SIT · UAT · JMeter · Roblox Studio · Luau · Playwright · Bruno", 16, 11, stat, 12, "#161616", FB, "SemiBold")


def section_b(s):
    box(0, 0, 720, 450, s, "#F7F7F2")
    t = box(12, 12, 344, 210, s, "#ffffff", 28, "Experience tile")
    text("Where I test", 18, 16, t, 24, "#161616", FB, "ExtraBold", track="-4%")
    for i, (n, d) in enumerate([("Manulife · EBClick", "2026 – now"), ("Toyota Astra · ESS", "2025 – 2026"), ("CIMB Niaga · e-procurement", "2023 – 2024")]):
        r = box(18, 62 + i * 46, 308, 38, t, "#F7F7F2", 19, n)
        text(n, 14, 11, r, 12, "#161616", FB, "SemiBold")
        text(d, 222, 11, r, 11, "#555555", FB)
    q = box(364, 12, 344, 100, s, "#A6D8FF", 28, "Number tile")
    text("40/41", 18, 12, q, 48, "#161616", FB, "ExtraBold", track="-5%")
    text("tests passed · DEF-001 planted", 18, 70, q, 11, "#161616", FB, "SemiBold")
    image("lab/step-def-001.webp", 364, 120, 344, 102, s, 28)
    image("sheet/gunung-2-m.webp", 12, 230, 228, 208, s, 28)
    image("sheet/ghost-3-m.webp", 248, 230, 228, 208, s, 28)
    g = box(484, 230, 224, 208, s, "#CDB8FF", 28, "Games tile")
    text("4 games on\nRoblox →", 18, 16, g, 22, "#161616", FB, "ExtraBold", lh="100%", track="-4%")


board(1, "B · The well-kept board", "One tidy board of rounded tiles on light paper. Filter tabs on top. Every tile is one real thing.", FB, "ExtraBold", PB, hero_b, section_b, [
    "Tabs: All / QA work / Games filter the board; tiles reshuffle with a smooth layout animation.",
    "Hero tile: the mini test run plays in its tile; press Run again to replay; DEF-001 turns the row tomato.",
    "Hover: tiles lift 4px and tilt slightly; image tiles zoom inside their rounded frame; the skills strip scrolls as a marquee.",
    "Game tiles: hover plays a short loop; click opens the game card with Play on Roblox.",
])

# ---------- Option C: the product performs ----------
FC = "Bricolage Grotesque"
PC = [("cloud", "#F3F6FF"), ("blue", "#3D5AFE"), ("mint", "#7CE0B5"), ("sun", "#FFD54A"), ("white", "#FFFFFF"), ("ink", "#101631"), ("tomato", "#FF5A36")]


def hero_c(h):
    box(0, 0, 720, 450, h, "#F3F6FF")
    text("fattahwg", 24, 18, h, 12, "#101631", FC, "SemiBold")
    text("Experience   Projects   Games   Contact", 400, 18, h, 11, "#101631", FC)
    text("I test software.\nPress Run.", 24, 70, h, 38, "#101631", FC, "SemiBold", lh="92%", track="-4%")
    text("Fattah Widjaya Gandhi, SQA Engineer in Jakarta.\nThis is my real Lawak Store suite.", 26, 170, h, 12, "#101631", FC, lh="140%")
    pill("Run the smoke suite ▶", 24, 214, h, "#3D5AFE", "#ffffff", FC, 12)
    stage = box(350, 60, 350, 360, h, "#3D5AFE", 32, "Runner stage")
    runner(16, 16, 318, stage, FC, "#101631", "#2BB673", "#FF5A36", "#ffffff", 22)
    image("lab/step-def-001.webp", 16, 190, 318, 154, stage, 18)
    note = box(24, 300, 280, 120, h, "#FFD54A", 28, "Note")
    text("TC-CHK-006 fails on purpose.\nI planted DEF-001 so you can\nsee how a failure is reported.", 16, 18, note, 12, "#101631", FC, lh="140%")


def section_c(s):
    box(0, 0, 720, 450, s, "#F3F6FF")
    text("Games I direct", 24, 20, s, 34, "#101631", FC, "SemiBold", track="-4%")
    x = 24
    for label, on in [("Ghost Expedition", True), ("Gunung Lawak", False), ("Lawak Obstacle", False), ("Desa", False)]:
        x += pill(label, x, 70, s, "#101631" if on else "#ffffff", "#ffffff" if on else "#101631", FC, 10) + 6
    image("img/ghost-expedition-cover.webp", 24, 116, 400, 225, s, 28)
    c = box(436, 116, 260, 225, s, "#7CE0B5", 28, "Game info")
    text("Become a Ghost\nExpedition", 16, 16, c, 20, "#101631", FC, "SemiBold", lh="100%")
    text("20 checkpoints toward Eternal Rest.\nExplore, stay hidden, play with friends.", 16, 72, c, 11, "#101631", FC, lh="140%")
    pill("Play on Roblox", 16, 178, c, "#101631", "#ffffff", FC, 10)
    text("Tabs switch the game; the cover becomes a gameplay loop.", 24, 360, s, 12, "#444444", FC)


board(2, "C · The product performs", "Your test suite is the hero: a working mini runner on the first screen. Soft blue stage, big rounded shapes.", FC, "SemiBold", PC, hero_c, section_c, [
    "Hero: press Run; five real steps tick one by one with their screenshot changing in the stage; DEF-001 fails in tomato with a small shake.",
    "Scroll: one pinned section where three short lines change the runner (smoke, regression, API).",
    "Games: tabs switch the game; the cover crossfades to a gameplay loop; buttons squash a little when pressed.",
    "Hover: rounded panels lift; links get a sliding underline.",
])

json.dump(steps, open(sys.argv[1], "w", encoding="utf-8"), ensure_ascii=False)
print(len(steps), "steps")

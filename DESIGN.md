---
version: alpha
name: FattahWG portfolio
description: White and red glass. Warm white surfaces, red glossy spheres behind one glass hero card. QA first, Roblox games second.
colors:
  bg: "#f5f1ee"
  surface: "#ffffff"
  surface-hover: "#fffaf8"
  sunken: "#ece6e2"
  line: "rgba(36, 28, 32, 0.10)"
  line-strong: "rgba(36, 28, 32, 0.18)"
  text: "#3a3035"
  heading: "#241c20"
  muted: "#5c5257"
  faint: "#6b6166"
  primary: "#c8262b"
  primary-hover: "#b0201f"
  qa: "#b0201f"
  red-deep: "#961a1c"
  game: "#a84a0c"
  ok: "#1d7a48"
  glass-bar: "rgba(245, 241, 238, 0.72)"
  glass-card: "rgba(255, 255, 255, 0.72)"
  glass-edge: "rgba(255, 255, 255, 0.85)"
typography:
  display:
    fontFamily: Figtree
    fontSize: 64px
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: -0.02em
  title:
    fontFamily: Figtree
    fontSize: 44px
    fontWeight: 800
    lineHeight: 1.2
  section:
    fontFamily: Figtree
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: Figtree
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: Figtree
    fontSize: 13px
    fontWeight: 700
    lineHeight: 1.4
rounded:
  sm: 8px
  md: 12px
  lg: 16px
  stage: 24px
  pill: 9999px
spacing:
  gutter: 16px to 32px
  section: 48px to 80px
  card: 22px to 30px
components:
  button-primary:
    background: "{colors.primary}"
    color: "#ffffff"
    rounded: "{rounded.sm}"
    minHeight: 44px
  button:
    background: transparent
    border: "{colors.line-strong}"
    rounded: "{rounded.sm}"
    minHeight: 44px
  glass-bar:
    background: "{colors.glass-bar}"
    backdropFilter: blur(20px) saturate(160%)
  glass-card:
    background: "{colors.glass-card}"
    border: "{colors.glass-edge}"
    backdropFilter: blur(20px) saturate(160%)
    rounded: "{rounded.lg}"
---

# FattahWG portfolio

Dial: ENERGY 2 / RHYTHM 2 / MOTION 1

Reading this as: a personal portfolio for QA hiring managers and Roblox players, in a white and red glass style, with a dashboard shell.

## Overview

The site belongs to a QA Software Engineer who also directs Roblox games at Lawak Studio. QA comes first, automation second, games third.
The direction comes from the owner's reference image (2026-10-13): warm white, frosted glass cards, glossy red and orange spheres.
The shell stays a left sidebar with a top bar, so the portfolio and the test demo share one layout.
The identity motif is the red glossy sphere seen through glass. It appears only in the hero stage on Home and Projects, and on the test demo Overview.

## Colors

- Neutrals: `bg`, `surface`, `sunken`, `text`, `heading`, `muted`, `faint`. They do not count toward the palette.
- Core 1, red (`primary` #c8262b, `qa` #b0201f, `red-deep` #961a1c): the main action, QA labels and links, and labels on glass.
- Core 2, orange (`game` #a84a0c): Lawak Studio and the games only.
- Accent, green (`ok` #1d7a48): a real pass state only.
- Light only. Reason: the owner chose the white and red reference. There is no theme toggle.
- All text passes WCAG AA. On glass, use only `heading`, `text` and `red-deep` (checked at the darkest sphere color). `muted` on glass is for large text only.

## Typography

- Figtree for all text. Reason: a rounded, friendly sans that suits a game studio and reads well in long QA text. It is free on Google Fonts.
- No monospace headings. No uppercase labels with wide tracking. Labels are sentence case.
- Weight steps: 800 for page titles, 700 for section titles and labels, 400 for body.

## Layout

- Dashboard shell: sidebar 232px, icon rail at 761px to 1080px, drawer at 760px and below.
- Content width 1120px, gutter 16px to 32px.
- Sections vary. The home path gives the QA card more width, because most of the work time goes there. About uses a list, not a card grid.
- No horizontal scroll at any width. Tap targets are 44px.

## Elevation & Depth

- Glass is an accent, on two elements of a page at most (antislop R-10). The owner confirmed this on 2026-10-13.
  1. The top bar, on every page. Reason: content scrolls under it, and the blur keeps the page title readable.
  2. One stage card over the spheres, on Home and Projects only. Reason: it is the focal point of the page.
- All other cards are solid white with a 1px border.
- Spheres (antislop R-01, radial orbs): allowed here. Reason: they are the motif of the owner's reference, and they appear only behind the hero glass. Do not add them to other sections.
- Glass rules: blur 20px with saturate 160%, fill 72% white, a 1px edge at 85% white.
- The top bar blurs a layer that is 200% tall and masked to the bar. Then content below the bar also feeds the blur.
- If `backdrop-filter` is not supported, or the user sets `prefers-reduced-transparency`, glass becomes solid white.
- Shadow: only the stage card has one, a soft warm shadow. All other surfaces are flat with a border.

## Shapes

- 8px for buttons and nav items, 12px for small tiles, 16px for cards, 24px for the stage.
- Pills are for chips and status tags only.

## Components

- Buttons: outlined by default, red fill for the main action, dark fill for "Play on Roblox".
- Arrows: `arrow-up-right` marks a link to another site. Internal links and buttons have no arrow.
- Icons: Lucide line icons. Reason: each icon names its content (briefcase for work, gamepad for games), and the thin line suits the light theme. Do not add sparkle, star or robot icons.
- Section labels: plain colored text above a section title, red for QA and orange for games. No pill and no dot. Do not put a label above a page title when the title says the same thing.
- Chips: tool names. A chip with an official site links to it, with the external arrow.

## Do's and Don'ts

- Do show only real facts: employers, dates and projects come from the CV. Game text comes from the Roblox pages.
- Do keep the test suite green: Playwright, axe and Bruno run before each deploy.
- Do not add statistics, testimonials or logos without a real source.
- Do not add a status dot that marks no real state.
- Do not animate on scroll. Motion is hover states, the drawer slide and the page view transition.
- Do not use em dashes in page text.
- Do not put glass on cards, the sidebar and the top bar at the same time.
- Do not add inline scripts. The Content Security Policy in `Base.astro` blocks them.

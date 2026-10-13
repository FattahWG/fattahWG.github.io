---
version: alpha
name: FattahWG portfolio
description: Dark creator dashboard with glass over real game art. QA first, Roblox games second.
colors:
  bg: "#121215"
  surface: "#1a1b1f"
  sunken: "#0d0d10"
  line: "rgba(208, 217, 251, 0.08)"
  line-strong: "rgba(208, 217, 251, 0.16)"
  text: "#e5e5e6"
  heading: "#f7f7f8"
  muted: "#bcbec8"
  faint: "#9a9cab"
  primary: "#335fff"
  qa: "#8aa6ff"
  game: "#f6b702"
  ok: "#39c582"
  glass-bar: "rgba(18, 18, 21, 0.62)"
  glass-card: "rgba(22, 23, 27, 0.60)"
  glass-edge: "rgba(255, 255, 255, 0.10)"
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
    backdropFilter: blur(16px) saturate(140%)
  glass-card:
    background: "{colors.glass-card}"
    border: "{colors.glass-edge}"
    backdropFilter: blur(16px) saturate(140%)
    rounded: "{rounded.lg}"
---

# FattahWG portfolio

Dial: ENERGY 2 / RHYTHM 2 / MOTION 1

Reading this as: a personal portfolio for QA hiring managers and Roblox players, in a dark creator dashboard style with glass over real game art.

## Overview

The site belongs to a QA Software Engineer who also directs Roblox games at Lawak Studio. QA comes first, automation second, games third.
The look comes from the Roblox Creator Hub (create.roblox.com): left sidebar, top bar, flat dark cards. The owner asked for this look on 2026-10-13.
The site does not copy Roblox assets, logos or the Builder Sans font.
The identity motif is real game art seen through glass. The four game covers sit behind the hero on Home and behind the header on Projects.

## Colors

- Neutrals: `bg`, `surface`, `sunken`, `text`, `heading`, `muted`, `faint`. They do not count toward the palette.
- Core 1, blue (`primary` #335fff, `qa` #8aa6ff): QA work. `primary` fills the one main button of a section. `qa` marks QA links and icons on dark.
- Core 2, yellow (`game` #f6b702): Lawak Studio and the games only.
- Accent, green (`ok` #39c582): a real pass state only. Do not use it as decoration.
- Dark only. Reason: the game art and the glass need a dark ground, and the Creator Hub direction is dark. There is no theme toggle.
- All text must pass WCAG AA (4.5:1 body, 3:1 large) against the worst point behind it.

## Typography

- Figtree for all text. Reason: a rounded, friendly sans that is close to the Creator Hub voice and is free on Google Fonts.
- No monospace headings. No uppercase labels with wide tracking. Labels are sentence case.
- Weight steps: 800 for page titles, 700 for section titles and labels, 400 for body.

## Layout

- Dashboard shell: sidebar 232px, icon rail at 761px to 1080px, drawer at 760px and below.
- Content width 1120px, gutter 16px to 32px.
- Sections vary. The home path gives the QA card more width, because most of the work time goes there. About uses a list, not a card grid.
- No horizontal scroll at any width. Tap targets are 44px.

## Elevation & Depth

- Glass is an accent, at most two elements on a page (antislop R-10):
  1. The top bar, on every page. Reason: content scrolls under it, and the blur keeps the page title readable.
  2. One stage card over the game art, on Home and Projects only. Reason: it shows the games behind the intro.
- Cards, the sidebar and the drawer stay solid.
- Glass rules: blur 16px with saturate 140%, fill 60% or more, a 1px edge at 10% white. Text sits on the glass fill, not on the art.
- The top bar blurs a layer that is 200% tall and masked to the bar. Then content below the bar also feeds the blur.
- If `backdrop-filter` is not supported, or the user sets `prefers-reduced-transparency`, glass becomes a solid surface.
- Shadow: only the stage card has one. Reason: it lifts the card off the art. All other surfaces are flat with a border.

## Shapes

- 8px for buttons and nav items, 12px for small tiles, 16px for cards, 24px for the art stage.
- Pills are for chips and status tags only.

## Components

- Buttons: outlined by default, blue fill for the main action, white fill for "Play on Roblox".
- Arrows: `arrow-up-right` marks a link to another site. Internal links and buttons have no arrow.
- Icons: Lucide line icons. Reason: they match the Creator Hub line style, and each icon names its content (briefcase for work, gamepad for games). Do not add sparkle, star or robot icons.
- Section labels: plain colored text above a section title, blue for QA and yellow for games. No pill and no dot. Do not put a label above a page title when the title says the same thing.
- Chips: tool names. A chip with an official site links to it, with the external arrow.

## Do's and Don'ts

- Do show only real facts: employers, dates and projects come from the CV. Game text comes from the Roblox pages.
- Do keep the test suite green: Playwright, axe and Bruno run before each deploy.
- Do not add statistics, testimonials or logos without a real source.
- Do not add a status dot that marks no real state.
- Do not animate on scroll. Motion is hover states, the drawer slide and the page view transition.
- Do not use em dashes in page text.
- Do not put glass on cards, the sidebar and the top bar at the same time.

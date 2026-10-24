---
version: alpha
name: FattahWG portfolio
description: Test-terminal green. Light and dark themes, a green and purple glow behind the hero, a dark QA Lab. QA first, Roblox games second.
colors:
  background-light: "hsl(150 20% 98%)"
  background-dark: "hsl(160 30% 4%)"
  card-light: "#ffffff"
  card-dark: "hsl(160 22% 7%)"
  foreground-light: "hsl(160 30% 8%)"
  foreground-dark: "hsl(150 20% 95%)"
  muted-foreground-light: "hsl(160 8% 38%)"
  muted-foreground-dark: "hsl(155 8% 64%)"
  primary-light: "hsl(158 84% 27%)"
  primary-dark: "hsl(156 72% 52%)"
  accent-light: "hsl(262 70% 56%)"
  accent-dark: "hsl(262 85% 72%)"
  ink: "hsl(160 35% 5%)"
  danger: "hsl(0 72% 52%)"
typography:
  display:
    fontFamily: Space Grotesk
    fontWeight: 700
    letterSpacing: -0.02em
  body:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  mono:
    fontFamily: JetBrains Mono
    fontSize: 12px
rounded:
  button: 9999px
  card: 24px
  panel: 32px
spacing:
  gutter: 20px
  section: 64px to 112px
components:
  btn-primary:
    background: "{colors.primary}"
    rounded: "{rounded.button}"
  btn-ghost:
    border: 1px
    background: card at 60%, blurred
    rounded: "{rounded.button}"
  card:
    background: "{colors.card}"
    border: 1px
    rounded: "{rounded.card}"
---

# FattahWG portfolio

Dial: ENERGY 3 / RHYTHM 2 / MOTION 2

Reading this as: a personal portfolio for QA hiring managers and Roblox players, with a QA Lab where visitors run a real suite.

## Overview

The site belongs to a QA Software Engineer who also directs Roblox games at Lawak Studio. QA comes first, automation second, games third.
The direction (2026-10-25): the owner chose the theme of a friend's portfolio, keianggoro12/kei-portofolio, with his own content.
This replaces the earlier white and red glass theme.
The identity motif is the test terminal: a Playwright run where each test is a claim from the CV, plus a live QA Lab.

## Colors

- Neutrals: background, card, muted, border. They follow the light or dark theme.
- Core, green (`primary`): main actions, QA labels, pass states.
- Accent, purple (`accent`): Lawak Studio and the games, and the second color of the hero gradient.
- `ink`: the QA Lab and the terminal. It stays dark in both themes.
- Light and dark: the first visit follows the system setting, and the switch in the navbar saves the choice.
- All text passes WCAG AA. The light-theme green is 27% lightness, not 32%: 32% gave 3.8:1 on white (TC-A11Y-001).

## Typography

- Space Grotesk for headings, Inter for text, JetBrains Mono for labels, chips, and the terminal.
- All three load from this site (`@fontsource`), not from a font CDN.

## Layout

- One long home page: hero, stats, about, experience, skills, projects, QA Lab, games, education, contact.
- Separate pages: `/lab`, `/lab/run?id=…`, `/projects/<slug>`. The old URLs `/about`, `/experience`, `/projects`, `/contact` open the home page at their section.
- Content width 1200px, gutter 20px. No horizontal scroll at any width. Tap targets on phones are 40px or more.

## Motion

- Fade-up on scroll, the terminal typing its tests, the tech marquee, and count-up stats.
- With reduced motion, everything shows at once and the demo video waits for a click.
- Content never depends on JavaScript: each route is prerendered, and the reveal only hides content when scripts run.

## Do's and Don'ts

- Do show only real facts: employers, dates, and projects come from the CV. Game text comes from the Roblox pages.
- Do keep the test suite green: Playwright, axe, and Bruno run before each deploy.
- Do not add skill levels, statistics, or testimonials without a real source.
- Do not add inline scripts. The Content Security Policy in `apps/frontend/index.html` blocks them.
- Do not point the QA Lab at a production system. It runs the Lawak Store suite against its local demo server.

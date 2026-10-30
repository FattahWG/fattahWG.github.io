---
version: alpha
name: FattahWG portfolio
description: Glassmorphism, dark and light. Frosted glass cards on a faint grid with soft violet glows; Montserrat; one violet accent; the earlier home structure.
colors:
  dark-ground: "hsl(240 8% 8%)"
  dark-glass: "rgb(255 255 255 / 0.06), edge rgb(255 255 255 / 0.16)"
  dark-ink: "hsl(240 14% 95%)"
  dark-violet: "hsl(250 89% 64%)"
  light-ground: "hsl(230 33% 96%)"
  light-glass: "rgb(255 255 255 / 0.55), edge rgb(255 255 255 / 0.9)"
  light-ink: "hsl(233 25% 12%)"
  light-violet: "hsl(249 72% 57%)"
  fail: "dark hsl(8 100% 67%), light hsl(9 76% 43%)"
typography:
  face: Montserrat (variable, @fontsource-variable/montserrat)
  hero: "700, clamp(2.75rem, 1.9rem + 3.8vw, 5rem)"
  heading: "700, clamp(2rem, 1.4rem + 2.6vw, 3.5rem), tracking -0.02em"
  body: "clamp(1rem, 0.96rem + 0.2vw, 1.125rem), leading 1.6"
rounded:
  button: 9999px
  card: 1.5rem
  nav: 1.75rem
components:
  glass: "translucent fill, 1px light edge, backdrop blur 20px, soft shadow"
  glass-nav: "fuller fill (dark 82%, light 90%) for the nav and the mini run, so text stays readable over photos and dark panels"
  btn-primary: "violet fill, white text, violet glow shadow"
  btn-ghost: "glass"
---

# FattahWG portfolio

## Direction (2026-10-31)

Fattah asked for glassmorphism after a Behance reference (Glassmorphism Website Design UI/UX). He liked the calm GitHub version and found the colour-chapters build too colourful. He chose both a dark and a light glass theme from two FigCraft boards (`design/portfolio-glass.figcraft`), with the violet as on the boards.

## Page

- One fixed backdrop for every page: a faint grid that fades out and two soft glows. The upper glow drifts toward the pointer.
- Home keeps the earlier structure: hero (status chip, headline with a violet gradient line, photo with the test terminal, tech marquee), stats, about, experience timeline, skills, projects, QA Lab band, games, education, contact card.
- Floating glass navbar; slim glass footer with the name, credits and copyright.
- Light and dark follow the system setting; the navbar switch saves the choice.

## Rules

- One accent: violet. Red only marks the failed test (DEF-001).
- Violet text uses `accent-text` (lighter in dark mode); violet fills use `primary`. Text on glass that can sit over a photo or a dark panel uses `glass-nav`. All text passes WCAG AA (TC-A11Y-001).
- Never use fonts from earlier versions: Inter, Space Grotesk, JetBrains Mono, Figtree, Hanken Grotesk, Cabinet Grotesk.
- Show only real facts from the CV and the Roblox pages. No inline scripts.

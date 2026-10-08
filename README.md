# fattahWG.github.io

[![Test and deploy](https://github.com/FattahWG/fattahWG.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/FattahWG/fattahWG.github.io/actions/workflows/deploy.yml)

Personal portfolio of Fattah Widjaya Gandhi: SQA Engineer working on QA automation, and Studio Director for
Roblox games at Lawak Studio.

- Live site: https://fattahwg.github.io/
- Latest Playwright report: https://fattahwg.github.io/qa-report/
- Latest Bruno report: https://fattahwg.github.io/qa-report/api

The site is also the system under test. Every push builds the site, runs the test suites, and deploys only if
every test passes.

## Test suite

| Suite | Tool | What it checks |
| --- | --- | --- |
| `tests/e2e/smoke.spec.ts` | Playwright | The visitor path from Home to Contact (the same steps as the video on `/experience`) |
| `tests/e2e/navigation.spec.ts` | Playwright | Clean URLs, the active nav link, the 404 page, the phone menu, the skip link |
| `tests/e2e/content.spec.ts` | Playwright | Tool and game links, contact links, page metadata, demo video files |
| `tests/e2e/contact.spec.ts` | Playwright | Copy email to the clipboard |
| `tests/e2e/quality.spec.ts` | Playwright + axe | WCAG 2.1 A/AA scan on every page, no sideways scroll, touch target size |
| `tests/api/*.bru` | Bruno CLI | Status codes, content types, titles, and canonical URLs over plain HTTP |

Every Playwright test runs on two profiles: `desktop` (Desktop Chrome) and `mobile` (Pixel 7). Test names start
with a test case ID, for example `TC-NAV-003`. Smoke tests have the `@smoke` tag.

The suite follows the rules from my [Automations Test Preset](https://github.com/FattahWG/Automations-Test-Preset):
a failing test is fixed in the script only when the script is wrong. When the site is wrong, the site gets fixed.
For example, `TC-NAV-001` caught that the Home link lost its active state after the move to Astro 7.

### Run the tests

```
npm ci
npx playwright install chromium   # once; locally the config uses Microsoft Edge instead
npm run build
npm run test:e2e                  # all Playwright tests
npm run test:smoke                # smoke tests only
npx astro preview --port 4321     # in a second terminal, for the Bruno checks
npm run test:api                  # Bruno against the local build
npm run test:api:prod             # Bruno against the live site
```

## Site structure

| URL | Source | Content |
| --- | --- | --- |
| `/` | `src/pages/index.astro` | Hero, the QA → automation → games path, featured QA work, game tiles |
| `/about` | `src/pages/about.astro` | About me, how I work, current focus |
| `/experience` | `src/pages/experience.astro` | SQA role, Studio Director role, demo videos, skills |
| `/projects` | `src/pages/projects.astro` | Test suites, the automation preset, Roblox games |
| `/contact` | `src/pages/contact.astro` | Email, LinkedIn, GitHub, TikTok, Roblox, Discord |

- [Astro](https://astro.build) 7 static site. Pages build to `about.html` and so on, which GitHub Pages serves at `/about`.
- `src/layouts/Base.astro` holds the head, header, and footer. `src/data/site.js` holds all content lists and links.
- Dark soft-UI theme in `public/assets/style.css`, with a light [Motion](https://motion.dev) scroll reveal.
  Visitors who ask for reduced motion get no animation, and the demo videos wait for a click.
- Icons: SVG sprite from [Lucide](https://github.com/lucide-icons/lucide) (ISC) and
  [Simple Icons](https://github.com/simple-icons/simple-icons) (CC0).

## Demo videos

Both videos in `public/assets/video/` are our own recordings, so there is no copyright issue:

- `qa-playwright.*`: the smoke test, recorded in Microsoft Edge through the browser screencast.
- `studio-loop.*`: an illustrated 12 s loop of the idea-to-playtest process, shown with the four game covers.

## Known issues

`npm audit` reports advisories in dependencies of the Bruno CLI (for example `axios` and `@faker-js/faker`).
Bruno is a dev tool here. It only sends requests to this site in CI and is not part of the published pages.
I will update it when a fixed Bruno release is available.

## Deploy

`.github/workflows/deploy.yml` runs on every push to `main`: build, Playwright, Bruno, then publish the site with
both reports. In the repository settings, **Pages → Source** is **GitHub Actions**.

# fattahWG.github.io

[![Test and deploy](https://github.com/FattahWG/fattahWG.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/FattahWG/fattahWG.github.io/actions/workflows/deploy.yml)

Personal portfolio of Fattah Widjaya Gandhi: SQA Engineer working on QA automation, and Studio Director for
Roblox games at Lawak Studio.

- Live site: https://fattahwg.github.io/
- QA Lab (run the Lawak Store suite live): https://fattahwg.github.io/lab
- Latest Playwright report: https://fattahwg.github.io/qa-report/
- Latest Bruno report: https://fattahwg.github.io/qa-report/api

The site is also the system under test. Every push builds the site, runs the test suites, and deploys only if
every test passes.

## Structure

| Folder | Contents |
| --- | --- |
| `apps/frontend` | React 19 + Vite + Tailwind site. The build prerenders every route to static HTML for GitHub Pages. |
| `apps/backend` | QA Lab API: a Cloudflare Worker (Hono) with D1 for run data and R2 for screenshots and videos. |
| `packages/shared` | Profile, experience, projects, and games in English and Indonesian, and the runner data contract. |
| `tests/e2e`, `tests/api` | Playwright and Bruno suites for this site. |

All text is in `packages/shared/src/profile.ts` and `projects.ts`. UI labels are in `apps/frontend/src/lib/i18n.tsx`.
The design direction is in [`DESIGN.md`](DESIGN.md).

## QA Lab

The QA Lab runs the Lawak Store UI suite (41 Playwright cases) from
[Automations-Test-Preset](https://github.com/FattahWG/Automations-Test-Preset) on GitHub Actions, and shows each
step, log line, screenshot, and video while it runs.

1. A visitor presses **Run** on `/lab`. Cloudflare Turnstile and a rate limit protect the button.
2. The Worker stores a queued run in D1 and starts `e2e-lawak-store.yml` in the test repo.
3. The workflow starts the local demo server and runs the suite in Chromium. A cloud reporter sends the events,
   screenshots, and videos back to the Worker.
4. The page reads the run every 2 seconds. Old runs stay available for replay for 14 days.

The suite only targets its local demo server. One failure is expected: DEF-001 is planted on purpose.
Setup steps for Cloudflare and GitHub are in [`docs/QA-LAB-SETUP.md`](docs/QA-LAB-SETUP.md).
Without the API URL, the Lab shows the last recorded run.

## Test suite

| Suite | Tool | What it checks |
| --- | --- | --- |
| `tests/e2e/smoke.spec.ts` | Playwright | The visitor path from Home to the QA Lab and Contact |
| `tests/e2e/navigation.spec.ts` | Playwright | Clean URLs, old URLs, the 404 page, the menu, the skip link, language and theme switches |
| `tests/e2e/content.spec.ts` | Playwright | Game and contact links, page metadata, the CV download, CV content, the QA Lab sample run |
| `tests/e2e/quality.spec.ts` | Playwright + axe | WCAG 2.1 A/AA scan of each page in light and dark, no sideways scroll, touch targets, CSP |
| `tests/api/*.bru` | Bruno CLI | Status codes, content types, titles, canonical URLs, and prerendered text over plain HTTP |

Every Playwright test runs on two profiles: `desktop` (Desktop Chrome) and `mobile` (Pixel 7). Test names start
with a test case ID, for example `TC-NAV-003`. Smoke tests have the `@smoke` tag.

A failing test is fixed in the script only when the script is wrong. When the site is wrong, the site gets fixed.
For example, `TC-A11Y-001` found that the original green failed WCAG contrast in the light theme, so the light
theme now uses a darker green.

### Run the tests

```
npm ci
npx playwright install chromium   # once; locally the config uses Microsoft Edge instead
npm run build
npm run test:e2e                  # all Playwright tests (starts the local server by itself)
npm run test:smoke                # smoke tests only
npm run preview                   # in a second terminal, for the Bruno checks
npm run test:api                  # Bruno against the local build
npm run test:api:prod             # Bruno against the live site
```

`npm run preview` serves the build like GitHub Pages: `/lab` from `lab.html`, and a real 404 status for unknown URLs.

## Deploy

| Workflow | Trigger | Job |
| --- | --- | --- |
| `deploy.yml` | Push to `main` | Typecheck, build, Playwright, Bruno, then publish the site with both reports to GitHub Pages |
| `deploy-backend.yml` | Push to `main` in `apps/backend` or `packages/shared` | Apply D1 migrations, then deploy the Worker |

In the repository settings, **Pages → Source** is **GitHub Actions**.

## Credits

The visual theme and the QA Lab design are based on the portfolio of Juliardi Dwi Anggoro (Kei),
[keianggoro12/kei-portofolio](https://github.com/keianggoro12/kei-portofolio). Icons are from
[Lucide](https://lucide.dev) (ISC). Fonts are Inter, Space Grotesk, and JetBrains Mono (SIL OFL), served from this site.

## Known issues

`npm audit` reports advisories in dependencies of the Bruno CLI. Bruno is a dev tool here. It only sends requests
to this site in CI and is not part of the published pages.

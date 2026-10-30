# Changelog

Every push adds a dated entry below, newest first: what changed, where, and why.

## 2026-10-31: Glassmorphism theme

### What

- New theme for the whole site, dark and light glass: frosted glass cards on a faint grid with soft violet glows, Montserrat, one violet accent. The theme switch follows the system setting first.
- The home page keeps the earlier structure and contact section, now in glass: hero with photo and test terminal, stats, about, experience, skills, projects, QA Lab, games, education, contact.
- One page backdrop for every page; the upper glow drifts toward the pointer.
- Floating glass navbar and a slim glass footer.
- Violet text uses a lighter tone than the violet buttons, so links and labels pass WCAG AA in dark mode.
- New social image (built in FigCraft) and portfolio screenshot.

### Where

- `apps/frontend/src/index.css`, `tailwind.config.ts`: tokens, `.glass`, `.glass-strong`, `.glass-nav`.
- `apps/frontend/src/components/Backdrop.tsx` (new), `Navbar.tsx`, `showcase.tsx` (footer, glass run report and step gallery), `Hero.tsx`, `sections.tsx`, `TestTerminal.tsx`, `Reveal.tsx`, `App.tsx`, `main.tsx`, `lib/i18n.tsx`.
- `packages/shared/src/profile.ts`: a short `kind` for each client project.
- `apps/frontend/public/assets/og.png`, `projects/portfolio.webp`.
- `design/`: FigCraft boards (`portfolio-glass.figcraft` is the chosen one), the social image, and their build scripts. `DESIGN.md`: the new direction.

### Why

Fattah asked for glassmorphism after a Behance reference, chose both themes from two FigCraft boards, and asked to keep the home structure and contact section of the earlier version. The Playwright suite passes (79 passed, 3 skipped), with axe scans in light and dark.

## 2026-10-28: QA Lab picker, live view and Word evidence

### What

- On `/lab`, a visitor picks a suite: Smoke (13 UI cases), Regression (41), Custom, or API (9 Bruno cases). Custom lets the visitor pick modules, then test cases. The Run button shows the number of cases.
- The backend accepts only case IDs from the shared list, never free text, and sends the choice to the workflow.
- The run page has a Live tab: the browser frame updates every 2 seconds while the run is active. An API run opens on the Log tab. The Video tab is gone.
- Each run has a "Download Word evidence" button when the runner uploaded the document.
- Storage: the live frame is deleted when the run ends, failed-step screenshots after 1 day, the Word document with its run after 14 days.
- The Discord run log shows the suite and the number of cases.
- TC-CNT-010 and TC-SMK-001 use an empty run history, so live runs cannot change their result.

### Where

- `packages/shared/src/lawakCases.ts`: the case list, copied from the test repo catalog. `runner.ts`: `suite` and `reportKey` on a run.
- `apps/backend/src/choice.ts`: the choice check. `routes/public.ts`, `routes/runner.ts`, `github.ts`, `cron.ts`, `storage.ts`, `discord.ts`, `db.ts`.
- `apps/backend/migrations/0003_run_choice.sql`: columns `cases` and `report_key`.
- `apps/frontend/src/pages/Lab.tsx` (picker), `RunView.tsx` (Live tab, Word download), `lib/api.ts`, `lib/i18n.tsx`.
- `tests/e2e/support.ts`: `emptyRunHistory`.

### Why

- Visitors can choose what to test, like in a real QA team, and keep a Word record of the run.
- The live view replaces videos, so R2 keeps almost nothing.

## 2026-10-28: R2 free tier guard and a shorter tools list

### What

- The QA Lab stops before it goes over the R2 free tier (10 GB-month, 1 million Class A operations a month). For safety, the bucket stays at half of the storage limit. No new run starts at 4 GB stored or at 900,000 writes this month. No upload can take the bucket over 5 GB. Visitors see a clear message in English and Indonesian.
- The retention job deletes files by the keys in D1. It does not list the bucket, because a list is a Class A operation.
- One "QA Tools" group replaces the four tool groups: Python, Playwright, Bruno API, Swagger UI, Google Docs, Jira. The hero shows the same six tools. "Performance testing" moved to the Testing group.
- The QA Lab is live on `https://fattahwg-qa-lab.off-fattah.workers.dev`. TC-SEC-001 no longer waits for a quiet network, because the QA Lab polls the API. It ignores errors inside the Turnstile frame, because Turnstile refuses the headless browser.
- Each visitor run posts to the owner's private Discord channel twice: when it starts and when it ends, with the result and a link to the run. The visitor shows as the first 8 characters of the salted IP hash, never the IP.

### Where

- `apps/backend/migrations/0002_r2_usage.sql`: tables `artifacts` (key, run, bytes) and `r2_usage` (Class A count per month).
- `apps/backend/src/storage.ts`: the guard. `routes/public.ts`, `routes/runner.ts` and `cron.ts` use it. The limits are vars in `wrangler.toml`.
- `apps/frontend/src/lib/i18n.tsx`: messages `storage_full` and `r2_writes_full`.
- `apps/backend/src/discord.ts`: the run log. Secret `DISCORD_RUNS_WEBHOOK_URL`, var `SITE_URL`. Without the secret, nothing posts.
- `packages/shared/src/profile.ts`, `apps/frontend/src/components/Hero.tsx`: the tools list.

### Why

- Cloudflare bills R2 use above the free tier. It does not block it.
- The old tools list was too long.

## 2026-10-25: New theme and the QA Lab

### What

- New look based on the portfolio of Juliardi Dwi Anggoro (Kei): green and purple glow, light and dark themes, an English and Indonesian switch, a test terminal in the hero, and a dark QA Lab section.
- The QA Lab (`/lab`): visitors run the Lawak Store UI suite (41 Playwright cases) on GitHub Actions and watch the steps, logs, screenshots, and video live. Old runs can be replayed.
- One long home page. The old URLs `/about`, `/experience`, `/projects`, and `/contact` still work and open their section.
- New project pages: `/projects/lawak-store` (with the QA case study and DEF-001) and `/projects/portfolio-tests`.

### Where

- `apps/frontend`: React 19 + Vite + Tailwind site. `scripts/prerender.mjs` writes a static HTML file per route. `scripts/serve.mjs` serves the build like GitHub Pages for the tests.
- `apps/backend`: Cloudflare Worker (Hono, D1, R2) for the QA Lab API.
- `packages/shared`: all content in English and Indonesian, and the runner data contract.
- `tests/e2e`, `tests/api`: rewritten for the new pages (79 Playwright tests on desktop and mobile, 10 Bruno requests).
- `.github/workflows/deploy.yml` builds `apps/frontend`. New `deploy-backend.yml` deploys the Worker; it waits until the variable `QA_LAB_API_URL` is set.
- `apps/backend/wrangler.toml`: the D1 database ID and the public Turnstile site key. The secrets are in Cloudflare, not in the repo.
- `docs/QA-LAB-SETUP.md`: the Cloudflare and GitHub steps.
- Removed: the Astro site in `src/` and the old Playwright demo video, which showed the old design.

### Why

- Fattah chose the theme of a friend's portfolio, with his own content.
- A suite that visitors can run themselves shows the QA work better than a recorded video.
- `TC-A11Y-001` found that the original green failed WCAG contrast in the light theme, so the light theme uses a darker green (27% lightness).

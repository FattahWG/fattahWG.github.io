# Changelog

Every push adds a dated entry below, newest first: what changed, where, and why.

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

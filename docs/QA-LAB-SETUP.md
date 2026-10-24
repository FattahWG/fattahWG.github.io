# QA Lab setup

The QA Lab needs a Cloudflare Worker (API), a D1 database, an R2 bucket, a Turnstile widget, and two GitHub repos
that know about each other. Do these steps once. Until they are done, `/lab` shows the last recorded run and the
Run button stays off.

Names used below:

| Thing | Name |
| --- | --- |
| Worker | `fattahwg-qa-lab` |
| D1 database | `fattahwg-qa-lab` |
| R2 bucket | `fattahwg-qa-lab-artifacts` |
| Test repo | `FattahWG/Automations-Test-Preset` (holds `e2e-lawak-store.yml` and the cloud reporter) |
| Site repo | `FattahWG/fattahWG.github.io` |

## 1. Cloudflare resources

Run these commands from `apps/backend`:

1. Sign in: `npx wrangler login`.
2. Make the database: `npx wrangler d1 create fattahwg-qa-lab`.
3. Copy the `database_id` from the output into `wrangler.toml`.
4. Make the bucket: `npx wrangler r2 bucket create fattahwg-qa-lab-artifacts`.
   If Wrangler says that R2 is not enabled, enable R2 in the Cloudflare dashboard first.
5. Make the tables: `npx wrangler d1 migrations apply DB --remote`.
6. Deploy: `npx wrangler deploy`. Write down the Worker URL, for example `https://fattahwg-qa-lab.<account>.workers.dev`.

## 2. Turnstile

1. In the Cloudflare dashboard, open **Turnstile** and add a widget.
2. Add the hostnames `fattahwg.github.io` and `localhost`. Use the mode **Managed**.
3. Put the site key in `TURNSTILE_SITE_KEY` in `wrangler.toml`. The site key is public.
4. Store the secret key: `npx wrangler secret put TURNSTILE_SECRET_KEY`.

## 3. Secrets

1. Make a fine-grained GitHub token. Give it access to `Automations-Test-Preset` only, with **Actions: Read and write**.
2. Store it: `npx wrangler secret put GITHUB_TOKEN`.
3. Make a long random runner token, for example with `node -e "console.log(crypto.randomUUID()+crypto.randomUUID())"`.
4. Store it in the Worker: `npx wrangler secret put RUNNER_TOKEN`.
5. Store a random salt for the IP hash: `npx wrangler secret put IP_HASH_SALT`.
6. Deploy again: `npx wrangler deploy`.

Do not put any of these values in a file in a repo.

## 4. Test repo (Automations-Test-Preset)

In **Settings → Secrets and variables → Actions**:

| Kind | Name | Value |
| --- | --- | --- |
| Secret | `RUNNER_TOKEN` | The same runner token as in step 3 |
| Variable | `QA_LAB_BACKEND_URL` | The Worker URL |

Then open **Actions → E2E Lawak Store (QA Lab) → Run workflow** once. The run shows in `/lab` with the trigger "Owner".

## 5. Site repo (fattahWG.github.io)

In **Settings → Secrets and variables → Actions**:

| Kind | Name | Value |
| --- | --- | --- |
| Variable | `QA_LAB_API_URL` | The Worker URL |
| Secret (environment `production`) | `CLOUDFLARE_API_TOKEN` | A Cloudflare API token with the template **Edit Cloudflare Workers**, plus D1 edit |
| Secret (environment `production`) | `CLOUDFLARE_ACCOUNT_ID` | The Cloudflare account ID |

Push to `main`, or run **Test and deploy** by hand. The build puts the Worker URL into the page and into the
Content Security Policy.

## Limits

| Rule | Value | Where |
| --- | --- | --- |
| Active runs at the same time | 1 | Unique index in D1, and `concurrency` in the workflow |
| Runs per visitor per day | 3 | `MAX_RUNS_PER_IP_PER_DAY` |
| Public runs per day | 10 | `MAX_PUBLIC_RUNS_PER_DAY` |
| Stuck runs | Queued over 15 min or silent over 30 min become expired | `apps/backend/src/cron.ts` |
| Retention | 14 days, except pinned runs | `apps/backend/src/cron.ts` |
| Scheduled run | Every day at 08:00 WIB | `e2e-lawak-store.yml` |

To turn the Run button off, clear `TURNSTILE_SITE_KEY` and deploy the Worker.

## Run it locally

1. In `apps/backend`, copy `.dev.vars.example` to `.dev.vars`.
2. Run `npx wrangler d1 migrations apply DB --local`, then `npm run dev` (port 8788).
3. In `Automations-Test-Preset/demo`, run the suite with the local backend:

   ```
   BACKEND_URL=http://127.0.0.1:8788 RUNNER_TOKEN=local-runner-token npx playwright test --project=msedge --grep "TC-CART"
   ```

4. Build the site with `VITE_API_URL=http://127.0.0.1:8788 npm run build`, then `npm run preview`, and open `/lab`.

export interface Env {
  DB: D1Database;
  ARTIFACTS: R2Bucket;
  GITHUB_REPO: string;
  GITHUB_REF: string;
  MAX_RUNS_PER_IP_PER_DAY: string;
  MAX_PUBLIC_RUNS_PER_DAY: string;
  /** R2 free tier guard (storage.ts). */
  R2_STOP_RUNS_GB: string;
  R2_STOP_UPLOADS_GB: string;
  R2_MAX_CLASS_A_PER_MONTH: string;
  TURNSTILE_SITE_KEY: string;
  /** Comma-separated origins that can call the public API (the site on GitHub Pages, local dev). */
  ALLOWED_ORIGINS: string;
  // Secrets. They can be empty in a local run.
  GITHUB_TOKEN?: string;
  TURNSTILE_SECRET_KEY?: string;
  RUNNER_TOKEN?: string;
  IP_HASH_SALT?: string;
  /** Private Discord webhook for visitor runs (discord.ts). Empty: no log. */
  DISCORD_RUNS_WEBHOOK_URL?: string;
  /** The portfolio, for the run links in the log. */
  SITE_URL: string;
}

export type AppEnv = { Bindings: Env };

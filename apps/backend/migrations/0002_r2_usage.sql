-- R2 free tier guard: every stored artifact and the Class A writes per month.
CREATE TABLE artifacts (
  key TEXT PRIMARY KEY,
  run_id TEXT NOT NULL,
  bytes INTEGER NOT NULL,
  created_at TEXT NOT NULL
);
CREATE INDEX artifacts_run ON artifacts (run_id);

CREATE TABLE r2_usage (
  month TEXT PRIMARY KEY,
  class_a INTEGER NOT NULL DEFAULT 0
);

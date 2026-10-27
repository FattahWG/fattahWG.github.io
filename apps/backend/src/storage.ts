import type { Env } from './env';
import { nowIso } from './lib';

// R2 free tier: 10 GB-month of storage and 1 million Class A operations a month.
// Cloudflare bills usage above it, so the Worker stops before the limit.
// D1 keeps the numbers: an R2 list to measure the bucket is a Class A operation too.
const GB = 1_000_000_000;

export type StorageBlock = 'storage_full' | 'r2_writes_full';

function month(): string {
  return nowIso().slice(0, 7);
}

async function usage(db: D1Database): Promise<{ bytes: number; classA: number }> {
  const [stored, writes] = await db.batch([
    db.prepare('SELECT COALESCE(SUM(bytes), 0) AS n FROM artifacts'),
    db.prepare('SELECT class_a AS n FROM r2_usage WHERE month = ?').bind(month()),
  ]);
  return {
    bytes: (stored.results[0] as { n: number } | undefined)?.n ?? 0,
    classA: (writes.results[0] as { n: number } | undefined)?.n ?? 0,
  };
}

/** A new run must not start when the bucket or this month's writes are near the free limit. */
export async function newRunBlock(env: Env): Promise<StorageBlock | null> {
  const { bytes, classA } = await usage(env.DB);
  if (bytes >= Number(env.R2_STOP_RUNS_GB) * GB) return 'storage_full';
  if (classA >= Number(env.R2_MAX_CLASS_A_PER_MONTH)) return 'r2_writes_full';
  return null;
}

/** An upload must not take the bucket over the hard limit. A started run can finish, without its last files. */
export async function uploadBlock(env: Env, size: number): Promise<StorageBlock | null> {
  const { bytes, classA } = await usage(env.DB);
  if (bytes + size > Number(env.R2_STOP_UPLOADS_GB) * GB) return 'storage_full';
  if (classA >= Number(env.R2_MAX_CLASS_A_PER_MONTH)) return 'r2_writes_full';
  return null;
}

/** Record the file before the put: a failed put only over-counts until the retention cron deletes the row. */
export async function recordUpload(db: D1Database, key: string, runId: string, size: number): Promise<void> {
  await db.batch([
    db.prepare('INSERT OR REPLACE INTO artifacts (key, run_id, bytes, created_at) VALUES (?, ?, ?, ?)').bind(key, runId, size, nowIso()),
    db
      .prepare('INSERT INTO r2_usage (month, class_a) VALUES (?, 1) ON CONFLICT (month) DO UPDATE SET class_a = class_a + 1')
      .bind(month()),
  ]);
}

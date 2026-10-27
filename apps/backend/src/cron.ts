import type { Env } from './env';
import { isoMinutesAgo, nowIso } from './lib';

const QUEUED_TIMEOUT_MIN = 15;
const RUNNING_IDLE_TIMEOUT_MIN = 30;
const RETENTION_DAYS = 14;
const RETENTION_BATCH = 10;

/** Stuck runs become expired. Then delete runs older than the retention time, except pinned runs. */
export async function runScheduled(env: Env): Promise<void> {
  await env.DB.prepare(
    `UPDATE runs SET status = 'expired', finished_at = ?
     WHERE (status = 'queued' AND created_at < ?)
        OR (status = 'running' AND COALESCE(last_event_at, started_at, created_at) < ?)`
  )
    .bind(nowIso(), isoMinutesAgo(QUEUED_TIMEOUT_MIN), isoMinutesAgo(RUNNING_IDLE_TIMEOUT_MIN))
    .run();

  const { results } = await env.DB.prepare('SELECT id FROM runs WHERE created_at < ? AND pinned = 0 LIMIT ?')
    .bind(isoMinutesAgo(RETENTION_DAYS * 24 * 60), RETENTION_BATCH)
    .all<{ id: string }>();
  for (const { id } of results) {
    // Keys come from D1, not from an R2 list: a list is a Class A operation, a delete is free.
    const { results: files } = await env.DB.prepare('SELECT key FROM artifacts WHERE run_id = ?').bind(id).all<{ key: string }>();
    for (let i = 0; i < files.length; i += 1000) {
      await env.ARTIFACTS.delete(files.slice(i, i + 1000).map((f) => f.key));
    }
    await env.DB.batch([
      env.DB.prepare('DELETE FROM artifacts WHERE run_id = ?').bind(id),
      env.DB.prepare('DELETE FROM steps WHERE run_id = ?').bind(id),
      env.DB.prepare('DELETE FROM run_logs WHERE run_id = ?').bind(id),
      env.DB.prepare('DELETE FROM test_results WHERE run_id = ?').bind(id),
      env.DB.prepare('DELETE FROM runs WHERE id = ?').bind(id),
    ]);
  }
}

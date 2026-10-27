import type { Env } from './env';

// Visitor runs go to the owner's private Discord channel. A failed post never stops a run.
const COLOR = { started: 0x4d96ff, passed: 0x2ec4b6, failed: 0xff5c5c, cancelled: 0x9e9e9e };

export interface RunLogInfo {
  runId: string;
  project: string;
  /** First characters of the salted IP hash: the same visitor shows the same tag, the IP stays private. */
  visitor?: string | null;
  status?: 'passed' | 'failed' | 'cancelled';
  passed?: number;
  failed?: number;
  skipped?: number;
  durationMs?: number;
}

export async function logVisitorRun(env: Env, info: RunLogInfo): Promise<void> {
  if (!env.DISCORD_RUNS_WEBHOOK_URL) return;
  const state = info.status ?? 'started';
  const fields = [
    { name: 'Run', value: `[${info.runId}](${env.SITE_URL}/lab/run?id=${info.runId})`, inline: true },
    { name: 'Project', value: info.project, inline: true },
  ];
  if (info.visitor) fields.push({ name: 'Visitor', value: info.visitor, inline: true });
  if (info.status) {
    fields.push(
      { name: 'Result', value: `${info.passed ?? 0} passed, ${info.failed ?? 0} failed, ${info.skipped ?? 0} skipped`, inline: true },
      { name: 'Time', value: `${Math.round((info.durationMs ?? 0) / 1000)} s`, inline: true }
    );
  }
  try {
    const response = await fetch(env.DISCORD_RUNS_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [{ title: `Visitor run ${state}`, color: COLOR[state], fields, timestamp: new Date().toISOString() }],
      }),
    });
    if (!response.ok) console.error(`discord log ${response.status}`);
  } catch (err) {
    console.error(`discord log ${(err as Error).message}`);
  }
}

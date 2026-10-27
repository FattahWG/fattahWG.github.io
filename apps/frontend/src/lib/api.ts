import type { RunDetail, RunLog, RunStatus, RunSuite, RunSummary } from '@fattah/shared';
import { useEffect, useState } from 'react';
import { API_URL } from './config';

export interface LabConfig {
  runEnabled: boolean;
  turnstileSiteKey: string | null;
}

export class ApiError extends Error {
  constructor(public status: number, public code: string) {
    super(code);
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  if (!API_URL) throw new ApiError(503, 'runner_disabled');
  const response = await fetch(`${API_URL}/api${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  });
  const body = (await response.json().catch(() => ({}))) as T & { error?: string };
  if (!response.ok) throw new ApiError(response.status, body.error ?? 'request_failed');
  return body;
}

export const api = {
  config: () => request<LabConfig>('/config'),
  runs: (project: string) => request<{ runs: RunSummary[] }>(`/runs?project=${project}&limit=20`).then((r) => r.runs),
  run: (id: string) => request<{ run: RunDetail }>(`/runs/${encodeURIComponent(id)}`).then((r) => r.run),
  logs: (id: string, after: number) => request<{ logs: RunLog[] }>(`/runs/${encodeURIComponent(id)}/logs?after=${after}`).then((r) => r.logs),
  createRun: (project: string, turnstileToken: string, suite: RunSuite, cases: string[]) =>
    request<{ runId: string; joined: boolean }>('/runs', { method: 'POST', body: JSON.stringify({ project, turnstileToken, suite, cases }) }),
};

export function artifactUrl(key: string): string {
  return `${API_URL}/api/artifacts/${key}`;
}

export function runUrl(id: string): string {
  return `/lab/run?id=${encodeURIComponent(id)}`;
}

export function isActive(status: RunStatus): boolean {
  return status === 'queued' || status === 'running';
}

/** Read the Lab config once per page. On failure the Run button stays hidden. */
let configPromise: Promise<LabConfig> | null = null;
export function useLabConfig(): LabConfig | null {
  const [config, setConfig] = useState<LabConfig | null>(null);
  useEffect(() => {
    configPromise ??= api.config().catch(() => ({ runEnabled: false, turnstileSiteKey: null }));
    let alive = true;
    void configPromise.then((c) => alive && setConfig(c));
    return () => {
      alive = false;
    };
  }, []);
  return config;
}

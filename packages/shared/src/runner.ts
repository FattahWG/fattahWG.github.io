// Data contract between the runner, the backend and the frontend.
// One shared file, so the reporter, the API and the UI cannot drift apart.

export type RunStatus = 'queued' | 'running' | 'passed' | 'failed' | 'cancelled' | 'expired';
export type RunTrigger = 'visitor' | 'owner' | 'schedule';
export type TestStatus = 'running' | 'passed' | 'failed' | 'skipped';

export const ACTIVE_RUN_STATUSES: RunStatus[] = ['queued', 'running'];

/** Projects that visitors can run. Each one has a workflow e2e-<project>.yml in the test repo. */
export const RUNNABLE_PROJECTS = ['lawak-store'] as const;
export type RunnableProject = (typeof RUNNABLE_PROJECTS)[number];

export type RunnerEvent =
  | { type: 'run.started'; githubRunId?: number; githubRunUrl?: string; total?: number }
  | { type: 'test.begin'; testId: string; tcId: string; title: string; file: string }
  | { type: 'step'; testId: string; index: number; label: string; screenshotKey?: string }
  | { type: 'log'; seq: number; level: 'info' | 'error'; message: string }
  | {
      type: 'test.end';
      testId: string;
      status: Exclude<TestStatus, 'running'>;
      durationMs: number;
      error?: string;
      videoKey?: string;
      networkKey?: string;
    }
  | {
      type: 'run.finished';
      status: 'passed' | 'failed' | 'cancelled';
      passed: number;
      failed: number;
      skipped: number;
      durationMs: number;
    };

export interface RunSummary {
  id: string;
  project: string;
  /** smoke, regression, custom or api; 'full' for runs made before the picker. */
  suite: string;
  /** R2 key of the Word evidence document, when the runner uploaded one. */
  reportKey: string | null;
  trigger: RunTrigger;
  status: RunStatus;
  githubRunUrl: string | null;
  createdAt: string;
  startedAt: string | null;
  finishedAt: string | null;
  total: number | null;
  passed: number;
  failed: number;
  skipped: number;
  durationMs: number | null;
}

export interface RunStep {
  index: number;
  label: string;
  screenshotKey: string | null;
  at: string;
}

export interface RunTest {
  id: string;
  tcId: string | null;
  title: string;
  file: string | null;
  status: TestStatus;
  durationMs: number | null;
  error: string | null;
  videoKey: string | null;
  networkKey: string | null;
  steps: RunStep[];
}

export interface RunDetail extends RunSummary {
  tests: RunTest[];
}

export interface RunLog {
  seq: number;
  level: 'info' | 'error';
  message: string;
  at: string;
}

/** Every R2 artifact key starts with the prefix of its run. */
export function artifactPrefix(runId: string): string {
  return `runs/${runId}/`;
}

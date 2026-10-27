import { LAB_CASES, RUN_SUITES, type RunSuite } from '@fattah/shared';

// The visitor's choice becomes workflow inputs. Only IDs from LAB_CASES pass, never free text.
const UI_IDS = new Set(LAB_CASES.filter((c) => c.kind === 'ui').map((c) => c.id));

export interface RunChoice {
  suite: RunSuite;
  /** The case IDs that run. */
  cases: string[];
  /** Workflow inputs: suite ui or api, and the case list (empty = every UI case). */
  inputs: { suite: 'ui' | 'api'; cases: string; label: RunSuite };
}

/** Null when the choice is not valid. No suite (an older page) means the full regression. */
export function parseChoice(suite: unknown, cases: unknown): RunChoice | null {
  const picked = suite === undefined ? 'regression' : suite;
  if (!(RUN_SUITES as unknown[]).includes(picked)) return null;
  const s = picked as RunSuite;

  if (s === 'api') {
    const ids = LAB_CASES.filter((c) => c.kind === 'api').map((c) => c.id);
    return { suite: s, cases: ids, inputs: { suite: 'api', cases: '', label: s } };
  }
  if (s === 'regression') {
    return { suite: s, cases: [...UI_IDS], inputs: { suite: 'ui', cases: '', label: s } };
  }
  if (s === 'smoke') {
    const ids = LAB_CASES.filter((c) => c.kind === 'ui' && c.smoke).map((c) => c.id);
    return { suite: s, cases: ids, inputs: { suite: 'ui', cases: ids.join(','), label: s } };
  }
  if (!Array.isArray(cases) || cases.length === 0 || cases.length > UI_IDS.size) return null;
  const ids = [...new Set(cases)];
  if (!ids.every((id) => typeof id === 'string' && UI_IDS.has(id))) return null;
  // Keep the catalog order, so the run reads like the test plan.
  const ordered = LAB_CASES.filter((c) => ids.includes(c.id)).map((c) => c.id);
  return { suite: s, cases: ordered, inputs: { suite: 'ui', cases: ordered.join(','), label: s } };
}

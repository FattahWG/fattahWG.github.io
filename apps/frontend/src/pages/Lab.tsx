import { LAB_CASES, LAB_MODULES, projects, RUN_SUITES, type LabCase, type RunSuite, type RunSummary } from '@fattah/shared';
import { Activity, Cloud, Loader2, MousePointerClick, Play, Server } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Reveal } from '@/components/Reveal';
import { formatMs, RunStatusBadge } from '@/components/RunStatusBadge';
import { RunReport, StepGallery } from '@/components/showcase';
import { Turnstile } from '@/components/Turnstile';
import { api, ApiError, isActive, runUrl, useLabConfig } from '@/lib/api';
import { API_URL } from '@/lib/config';
import { useLang } from '@/lib/i18n';
import { cn } from '@/lib/utils';

const PROJECT = 'lawak-store';
const FLOW_ICONS = [MousePointerClick, Server, Cloud, Activity];
const UI_CASES = LAB_CASES.filter((c) => c.kind === 'ui');

function casesFor(suite: RunSuite, modules: Set<string>, picked: Set<string>): LabCase[] {
  if (suite === 'api') return LAB_CASES.filter((c) => c.kind === 'api');
  if (suite === 'smoke') return UI_CASES.filter((c) => c.smoke);
  if (suite === 'regression') return UI_CASES;
  return UI_CASES.filter((c) => modules.has(c.module) && picked.has(c.id));
}

const chip = (on: boolean) =>
  cn('min-h-10 rounded-full border px-4 py-2 text-sm transition', on ? 'border-emerald-400 bg-emerald-400/15 text-white' : 'border-white/15 text-white/70 hover:border-white/40 hover:text-white');

/** Suite, then modules, then test cases. The backend checks the same list again. */
function RunPicker({ suite, setSuite, modules, setModules, picked, setPicked }: {
  suite: RunSuite;
  setSuite: (s: RunSuite) => void;
  modules: Set<string>;
  setModules: (m: Set<string>) => void;
  picked: Set<string>;
  setPicked: (p: Set<string>) => void;
}) {
  const { ui, lang } = useLang();
  const toggle = (set: Set<string>, value: string) => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    return next;
  };
  const visible = UI_CASES.filter((c) => modules.has(c.module));

  return (
    <div className="space-y-5">
      <fieldset>
        <legend className="font-mono text-xs text-white/60">{ui.runner.suiteLabel}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {RUN_SUITES.map((s) => (
            <button key={s} type="button" aria-pressed={suite === s} onClick={() => setSuite(s)} className={chip(suite === s)}>
              {ui.runner.suites[s]}
              <span className="ml-2 font-mono text-xs text-white/50">{casesFor(s, new Set(LAB_MODULES.map((m) => m.code)), new Set(UI_CASES.map((c) => c.id))).length}</span>
            </button>
          ))}
        </div>
        <p className="mt-2 text-sm text-white/60">{ui.runner.suiteHints[suite]}</p>
      </fieldset>

      {suite === 'custom' && (
        <>
          <fieldset>
            <legend className="font-mono text-xs text-white/60">{ui.runner.modulesLabel}</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {LAB_MODULES.map((m) => (
                <button key={m.code} type="button" aria-pressed={modules.has(m.code)} onClick={() => setModules(toggle(modules, m.code))} className={chip(modules.has(m.code))}>
                  {m.name[lang]}
                  <span className="ml-2 font-mono text-xs text-white/50">{UI_CASES.filter((c) => c.module === m.code).length}</span>
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="font-mono text-xs text-white/60">{ui.runner.casesLabel}</legend>
            <div className="mt-1 flex flex-wrap items-center justify-end gap-2">
              <div className="flex gap-2">
                <button type="button" onClick={() => setPicked(new Set([...picked, ...visible.map((c) => c.id)]))} className="min-h-10 rounded-full px-3 text-sm text-emerald-300 hover:text-emerald-200">
                  {ui.runner.selectAll}
                </button>
                <button type="button" onClick={() => setPicked(new Set([...picked].filter((id) => !visible.some((c) => c.id === id))))} className="min-h-10 rounded-full px-3 text-sm text-white/60 hover:text-white">
                  {ui.runner.clear}
                </button>
              </div>
            </div>
            <ul className="mt-3 grid max-h-72 gap-1 overflow-y-auto rounded-2xl border border-white/10 p-2 sm:grid-cols-2">
              {visible.map((c) => (
                <li key={c.id}>
                  <label className="flex min-h-10 cursor-pointer items-start gap-3 rounded-xl px-2 py-2 hover:bg-white/5">
                    <input type="checkbox" checked={picked.has(c.id)} onChange={() => setPicked(toggle(picked, c.id))} className="mt-1 h-4 w-4 shrink-0 accent-emerald-400" />
                    <span className="min-w-0 text-sm">
                      <span className="block font-mono text-xs text-white/55">{c.id}</span>
                      <span className="block text-white/85">{c.title}</span>
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>
        </>
      )}
    </div>
  );
}

function RunPanel({ runs }: { runs: RunSummary[] | null }) {
  const { ui } = useLang();
  const config = useLabConfig();
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [resetKey, setResetKey] = useState(0);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suite, setSuite] = useState<RunSuite>('smoke');
  const [modules, setModules] = useState(() => new Set(LAB_MODULES.map((m) => m.code)));
  const [picked, setPicked] = useState(() => new Set(UI_CASES.map((c) => c.id)));
  const active = runs?.find((run) => isActive(run.status));
  const chosen = casesFor(suite, modules, picked);

  const start = async () => {
    if (!token || !chosen.length) return;
    setPending(true);
    setError(null);
    try {
      const { runId } = await api.createRun(PROJECT, token, suite, suite === 'custom' ? chosen.map((c) => c.id) : []);
      navigate(runUrl(runId));
    } catch (err) {
      const code = err instanceof ApiError ? err.code : 'generic';
      setError((ui.runner.errors as Record<string, string>)[code] ?? ui.runner.errors.generic);
      // A Turnstile token works only once.
      setResetKey((k) => k + 1);
      setPending(false);
    }
  };

  if (active) {
    return (
      <div className="flex flex-wrap items-center gap-4 rounded-3xl border border-sky-400/30 bg-sky-400/10 p-5">
        <RunStatusBadge status={active.status} />
        <p className="flex-1 text-white/80">{ui.runner.active}</p>
        <Link to={runUrl(active.id)} className="btn bg-emerald-400 text-ink hover:-translate-y-0.5 hover:bg-emerald-300">
          <Play className="h-4 w-4" />
          {ui.runner.watch}
        </Link>
      </div>
    );
  }

  if (API_URL && !config) return <div className="h-24 animate-pulse rounded-3xl bg-white/5" />;

  if (!config?.runEnabled || !config.turnstileSiteKey) {
    return (
      <p className="inline-flex items-center gap-2 rounded-2xl border border-amber-400/30 bg-amber-400/10 px-3 py-1.5 font-mono text-xs text-amber-300">
        <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-amber-400" />
        {ui.runner.disabled}
      </p>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
      <RunPicker suite={suite} setSuite={setSuite} modules={modules} setModules={setModules} picked={picked} setPicked={setPicked} />
      <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:flex-wrap sm:items-center">
        <button type="button" onClick={start} disabled={!token || pending || !chosen.length} className="btn bg-emerald-400 px-6 text-base text-ink hover:-translate-y-0.5 hover:bg-emerald-300">
          {pending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Play className="h-5 w-5" />}
          {pending ? ui.runner.starting : `${ui.runner.run} ${chosen.length} ${ui.runner.cases}`}
        </button>
        <Turnstile siteKey={config.turnstileSiteKey} onToken={setToken} resetKey={resetKey} />
      </div>
      <p className="mt-3 text-sm text-white/65">{!chosen.length ? ui.runner.pickOne : token ? ui.runner.note : ui.runner.verify}</p>
      {error && (
        <p role="alert" className="mt-3 rounded-xl bg-red-400/10 px-3 py-2 text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

function RunHistory({ runs }: { runs: RunSummary[] }) {
  const { ui, lang } = useLang();
  const dateFormat = new Intl.DateTimeFormat(lang === 'id' ? 'id-ID' : 'en-GB', { dateStyle: 'medium', timeStyle: 'short' });
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
      <p className="border-b border-white/10 px-5 py-3 font-mono text-xs text-white/60">{ui.runner.history}</p>
      <ul className="divide-y divide-white/5">
        {runs.map((run) => (
          <li key={run.id}>
            <Link to={runUrl(run.id)} className="flex flex-wrap items-center gap-x-4 gap-y-1 px-5 py-3 transition hover:bg-white/[0.04]">
              <RunStatusBadge status={run.status} />
              <span className="min-w-[9rem] flex-1 text-sm text-white/85">{dateFormat.format(new Date(run.createdAt))}</span>
              <span className="font-mono text-xs text-white/60">
                {ui.runner.trigger[run.trigger]}
                {run.suite in ui.runner.suites ? ` · ${ui.runner.suites[run.suite as RunSuite]}` : ''}
              </span>
              <span className="w-16 text-right font-mono text-xs text-white/75">{run.total ? `${run.passed}/${run.total}` : '–'}</span>
              <span className="w-16 text-right font-mono text-xs text-white/60">{formatMs(run.durationMs)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Lab() {
  const { ui } = useLang();
  const automated = projects.filter((p) => p.runnable);
  const [runs, setRuns] = useState<RunSummary[] | null>(null);

  useEffect(() => {
    if (!API_URL) {
      setRuns([]);
      return;
    }
    let alive = true;
    const load = () =>
      api
        .runs(PROJECT)
        .then((list) => alive && setRuns(list))
        .catch(() => alive && setRuns([]));
    void load();
    // The status of an active run changes by itself. Refresh the list now and then.
    const timer = window.setInterval(load, 10_000);
    return () => {
      alive = false;
      window.clearInterval(timer);
    };
  }, []);

  const hasRuns = runs !== null && runs.length > 0;

  return (
    <div className="min-h-screen bg-ink pb-24 pt-28 text-white">
      <div className="container">
        <Reveal className="max-w-3xl">
          <p className="eyebrow !text-emerald-400">
            <span className="h-px w-6 bg-emerald-400" />
            {ui.lab.eyebrow}
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">{ui.lab.title}</h1>
          <p className="mt-4 text-lg text-white/70">{ui.lab.subtitle}</p>
        </Reveal>

        <Reveal className="mt-10">
          <RunPanel runs={runs} />
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.15fr]">
          <Reveal className="min-w-0">
            {hasRuns ? (
              <RunHistory runs={runs} />
            ) : (
              <>
                <p className="mb-3 font-mono text-xs text-white/60">{ui.runner.sample}</p>
                <RunReport />
              </>
            )}
            <div className="mt-6 flex flex-wrap gap-2">
              {automated.map((p) => (
                <Link key={p.slug} to={`/projects/${p.slug}`} className="rounded-full border border-white/15 px-3 py-1.5 text-sm text-white/80 hover:border-emerald-400 hover:text-white">
                  {p.name} →
                </Link>
              ))}
            </div>
          </Reveal>
          <Reveal delay={100} className="min-w-0">
            <StepGallery />
          </Reveal>
        </div>

        <section className="mt-20">
          <Reveal>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">{ui.labPage.how}</h2>
          </Reveal>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ui.labPage.flow.map((step, i) => {
              const Icon = FLOW_ICONS[i];
              return (
                <li key={step.title}>
                  <Reveal delay={i * 90} className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                    <div className="flex items-center justify-between">
                      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-emerald-400/15 text-emerald-300">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="font-mono text-xs text-white/50">0{i + 1}</span>
                    </div>
                    <h3 className="mt-5 font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">{step.body}</p>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </section>
      </div>
    </div>
  );
}

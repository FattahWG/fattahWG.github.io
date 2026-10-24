import { projects, type RunSummary } from '@fattah/shared';
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

const PROJECT = 'lawak-store';
const FLOW_ICONS = [MousePointerClick, Server, Cloud, Activity];

function RunPanel({ runs }: { runs: RunSummary[] | null }) {
  const { ui } = useLang();
  const config = useLabConfig();
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [resetKey, setResetKey] = useState(0);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const active = runs?.find((run) => isActive(run.status));

  const start = async () => {
    if (!token) return;
    setPending(true);
    setError(null);
    try {
      const { runId } = await api.createRun(PROJECT, token);
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
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
        <button type="button" onClick={start} disabled={!token || pending} className="btn bg-emerald-400 px-6 text-base text-ink hover:-translate-y-0.5 hover:bg-emerald-300">
          {pending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Play className="h-5 w-5" />}
          {pending ? ui.runner.starting : ui.runner.run}
        </button>
        <Turnstile siteKey={config.turnstileSiteKey} onToken={setToken} resetKey={resetKey} />
      </div>
      <p className="mt-3 text-sm text-white/65">{token ? ui.runner.note : ui.runner.verify}</p>
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
      <p className="border-b border-white/10 px-5 py-3 font-mono text-xs uppercase tracking-widest text-white/60">{ui.runner.history}</p>
      <ul className="divide-y divide-white/5">
        {runs.map((run) => (
          <li key={run.id}>
            <Link to={runUrl(run.id)} className="flex flex-wrap items-center gap-x-4 gap-y-1 px-5 py-3 transition hover:bg-white/[0.04]">
              <RunStatusBadge status={run.status} />
              <span className="min-w-[9rem] flex-1 text-sm text-white/85">{dateFormat.format(new Date(run.createdAt))}</span>
              <span className="font-mono text-xs text-white/60">{ui.runner.trigger[run.trigger]}</span>
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
                <p className="mb-3 font-mono text-xs uppercase tracking-widest text-white/60">{ui.runner.sample}</p>
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

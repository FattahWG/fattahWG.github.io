import { latestRun, profile, qaMonths } from '@fattah/shared';
import { ArrowRight, Download, Gamepad2, PlayCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLang } from '@/lib/i18n';
import { formatDuration } from '@/lib/utils';
import { TestTerminal } from './TestTerminal';

const TECH = ['Python', 'Playwright', 'Bruno API', 'Swagger UI', 'Google Docs', 'Jira'];

export function Hero() {
  const { ui, t, lang } = useLang();
  const passed = latestRun.tests.filter((test) => test.status === 'passed').length;

  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      {/* Background: grid plus a green and a purple glow */}

      <div className="container relative grid items-center gap-14 pb-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:pb-28">
        <div>
          <div className="flex animate-fade-up items-center gap-3">
            <img src={profile.photo} alt="" width={44} height={44} className="h-11 w-11 rounded-full object-cover lg:hidden" />
            <p className="chip">
              <span className="h-2 w-2 animate-pulse-ring rounded-full bg-primary" />
              {ui.hero.status} <span className="font-semibold text-foreground">{profile.currentCompany}</span>
            </p>
          </div>

          <h1 className="mt-6 animate-fade-up font-display text-5xl font-bold leading-[1.02] tracking-tight [animation-delay:80ms] sm:text-6xl lg:text-7xl">
            {ui.hero.hi}
            <span className="mt-3 block text-balance text-3xl leading-tight sm:text-4xl lg:text-[2.75rem]">
              <span className="text-gradient">{t(profile.headline)}</span>
            </span>
          </h1>

          <p className="mt-6 max-w-xl animate-fade-up text-lg text-muted-foreground text-pretty [animation-delay:160ms]">
            <span className="font-semibold text-foreground">{profile.name}</span>. {t(profile.intro)}
          </p>

          <div className="mt-8 flex animate-fade-up flex-wrap gap-3 [animation-delay:240ms]">
            <Link to="/#contact" className="btn-primary">
              {ui.hero.cta.contact}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/lab" className="btn-ghost">
              <PlayCircle className="h-4 w-4 text-accent-text" />
              {ui.hero.cta.lab}
            </Link>
            {profile.resumeUrl && (
              <a href={profile.resumeUrl} className="btn-ghost" download={profile.resumeName}>
                <Download className="h-4 w-4" />
                {ui.hero.cta.cv}
              </a>
            )}
          </div>

          <div className="mt-8 flex animate-fade-up flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground [animation-delay:320ms]">
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-accent-text" />
              {formatDuration(qaMonths(), lang)} {ui.stats.qa}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Gamepad2 className="h-4 w-4 text-accent-text" />
              {ui.hero.side}
            </span>
          </div>
        </div>

        {/* Photo and the test terminal */}
        <div className="relative mx-auto w-full max-w-md animate-fade-up [animation-delay:200ms] lg:max-w-none">
          <div className="relative ml-auto aspect-[4/5] w-[80%] max-w-[380px] overflow-hidden rounded-[2rem] border bg-muted shadow-2xl shadow-primary/10 sm:w-[72%]">
            <img src={profile.photo} alt={`Portrait of ${profile.name}`} className="h-full w-full object-cover object-[45%_20%]" width={320} height={320} fetchPriority="high" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <div className="absolute right-4 top-4 rounded-2xl border border-white/15 bg-black/50 px-3 py-2 text-white backdrop-blur-md">
              <p className="font-display text-xl font-bold leading-none">
                {passed}/{latestRun.tests.length}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-widest text-white/75">{ui.hero.passRate}</p>
            </div>
          </div>
          <TestTerminal className="absolute -bottom-16 left-0 w-full animate-float sm:w-[94%] lg:-left-12" />
        </div>
      </div>

      {/* Tech marquee */}
      <div className="glass relative border-x-0 py-4 shadow-none" aria-hidden>
        <div className="flex w-max animate-marquee gap-10 pr-10 font-mono text-sm text-muted-foreground [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          {[...TECH, ...TECH, ...TECH].map((tech, i) => (
            <span key={i} className="inline-flex items-center gap-2 whitespace-nowrap">
              <span className="text-accent-text">✓</span>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

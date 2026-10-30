import { automationHistory, careerSummary, education, experiences, games, profile, qaMonths, skillGroups, strengths, type SkillGroup } from '@fattah/shared';
import { Award, Bot, Braces, Briefcase, ClipboardList, Gamepad2, Gauge, GraduationCap, Layers, ListChecks, ShieldCheck, Users, Workflow } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useLang } from '@/lib/i18n';
import { cn, formatDuration, formatMonth, halfYears, monthsBetween } from '@/lib/utils';
import { Reveal, SectionHeader } from './Reveal';

/** Counts up from 0 when it comes into view. The server renders the final value. */
function CountUp({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setShown(0);
    let frameId = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const frame = (now: number) => {
        const progress = Math.min(1, (now - start) / 1200);
        setShown(value * (1 - Math.pow(1 - progress, 3)));
        if (progress < 1) frameId = requestAnimationFrame(frame);
      };
      frameId = requestAnimationFrame(frame);
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, [value]);

  return <span ref={ref}>{shown.toFixed(decimals)}</span>;
}

export function Stats() {
  const { ui } = useLang();
  const years = halfYears(qaMonths());
  const clientProjects = experiences.reduce((sum, job) => sum + job.projects.length, 0);
  const caseCount = 50;
  const stats = [
    { value: years, decimals: years % 1 ? 1 : 0, suffix: ui.stats.yrs, label: ui.stats.qa },
    { value: clientProjects, decimals: 0, suffix: '', label: ui.stats.clients },
    { value: caseCount, decimals: 0, suffix: '', label: ui.stats.cases },
    { value: games.length, decimals: 0, suffix: '', label: ui.stats.games },
  ];

  return (
    <section className="container pt-24" aria-label="Highlights">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border bg-border lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 80} className="bg-card p-6 sm:p-8">
            <p className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
              <CountUp value={stat.value} decimals={stat.decimals} />
              <span className="text-accent-text">{stat.suffix}</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const STRENGTH_ICONS = { plan: ClipboardList, shield: ShieldCheck, bot: Bot, game: Gamepad2 };

export function About() {
  const { ui, t } = useLang();
  return (
    <section id="about" className="section container">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeader eyebrow={ui.about.eyebrow} title={ui.about.title} />
          <Reveal delay={100}>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">{t(profile.summary)}</p>
          </Reveal>
        </div>
        <div>
          <Reveal>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">{ui.about.bring}</p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {strengths.map((item, i) => {
              const Icon = STRENGTH_ICONS[item.icon];
              const game = item.icon === 'game';
              return (
                <Reveal key={item.icon} delay={i * 90} className={cn('card group p-6 transition hover:-translate-y-1', game ? 'hover:border-accent/40' : 'hover:border-primary/40')}>
                  <span
                    className={cn(
                      'grid h-11 w-11 place-items-center rounded-2xl transition',
                      game ? 'bg-accent/10 text-accent-text group-hover:bg-accent group-hover:text-accent-foreground' : 'bg-primary/10 text-accent-text group-hover:bg-primary group-hover:text-primary-foreground'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold">{t(item.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(item.body)}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ExperienceSection() {
  const { ui, t, lang } = useLang();
  return (
    <section id="experience" className="section relative overflow-hidden bg-muted/40">
      <div className="container">
        <SectionHeader eyebrow={ui.experience.eyebrow} title={ui.experience.title} subtitle={t(careerSummary)} />
        <ol className="relative mt-14 space-y-6 border-l pl-6 sm:pl-10">
          {experiences.map((job, i) => {
            const current = job.end === null;
            const months = monthsBetween(job.start, job.end) + 1;
            return (
              <li key={`${job.company}-${job.start}`} className="relative">
                <span
                  className={cn(
                    'absolute -left-[33px] top-7 grid h-4 w-4 place-items-center rounded-full border-2 bg-background sm:-left-[49px]',
                    current ? 'border-primary' : 'border-border'
                  )}
                >
                  {current && <span className="h-1.5 w-1.5 animate-pulse-ring rounded-full bg-primary" />}
                </span>
                <Reveal delay={i * 60}>
                  <article className={cn('card p-6 sm:p-8', current && 'border-primary/40')}>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-xl font-semibold">{job.role}</h3>
                        <p className="mt-1 flex flex-wrap items-center gap-x-2 text-muted-foreground">
                          <Briefcase className="h-4 w-4" />
                          <span className="font-medium text-foreground">{job.company}</span>
                        </p>
                      </div>
                      <div className="sm:text-right">
                        <p className={cn('chip', current && 'border-primary/40 text-accent-text')}>
                          {formatMonth(job.start, lang)} – {job.end ? formatMonth(job.end, lang) : ui.experience.present}
                        </p>
                        <p className="mt-1.5 font-mono text-xs text-muted-foreground">{formatDuration(months, lang)}</p>
                      </div>
                    </div>
                    <div className="mt-6 space-y-6">
                      {job.projects.map((project) => (
                        <div key={project.name} className="rounded-2xl border bg-background/60 p-5">
                          <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <h4 className="font-semibold">{project.name}</h4>
                            {project.start && (
                              <span className="font-mono text-xs text-muted-foreground">
                                {formatMonth(project.start, lang)} – {project.end ? formatMonth(project.end, lang) : ui.experience.present}
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">{t(project.domain)}</p>
                          <ul className="mt-4 space-y-2.5">
                            {project.items.map((item) => (
                              <li key={item.en} className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground">
                                <span className="mt-0.5 font-mono text-accent-text" aria-hidden>
                                  ✓
                                </span>
                                {t(item)}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {job.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-muted px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
          <li id="automation" className="relative">
            <span className="absolute -left-[33px] top-7 grid h-4 w-4 place-items-center rounded-full border-2 border-accent bg-background sm:-left-[49px]" />
            <Reveal>
              <article className="card p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl font-semibold">{ui.experience.automation}</h3>
                    <p className="mt-1 text-muted-foreground">{ui.experience.automationSub}</p>
                  </div>
                  <p className="chip border-accent/40 text-accent-text">
                    <Workflow className="h-3.5 w-3.5" />
                    {ui.experience.growing}
                  </p>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {automationHistory.map((item) => (
                    <li key={item.en} className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground">
                      <span className="mt-0.5 font-mono text-accent-text" aria-hidden>
                        ✓
                      </span>
                      {t(item)}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {['Playwright', 'Bruno', 'GitHub Actions', 'Claude Code', 'GitHub Copilot'].map((tag) => (
                    <span key={tag} className="rounded-full bg-muted px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          </li>
        </ol>
      </div>
    </section>
  );
}

const SKILL_ICONS: Record<SkillGroup['icon'], typeof ListChecks> = {
  list: ListChecks,
  workflow: Workflow,
  gauge: Gauge,
  layers: Layers,
  braces: Braces,
  users: Users,
  game: Gamepad2,
};

export function SkillsSection() {
  const { ui, t } = useLang();
  return (
    <section id="skills" className="section container">
      <SectionHeader eyebrow={ui.skills.eyebrow} title={ui.skills.title} subtitle={ui.skills.subtitle} />
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, gi) => {
          const Icon = SKILL_ICONS[group.icon];
          return (
            <Reveal key={group.icon} delay={(gi % 3) * 90} className={cn('card p-6 sm:p-8', group.game && 'border-accent/30')}>
              <h3 className="flex items-center gap-3 font-display text-lg font-semibold">
                <span className={cn('grid h-10 w-10 place-items-center rounded-2xl', group.game ? 'bg-accent/10 text-accent-text' : 'bg-primary/10 text-accent-text')}>
                  <Icon className="h-5 w-5" />
                </span>
                {t(group.title)}
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="rounded-full bg-muted px-3 py-1.5 font-mono text-xs text-muted-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export function EducationSection() {
  const { ui, t } = useLang();
  return (
    <section id="education" className="section container">
      <SectionHeader eyebrow={ui.education.eyebrow} title={ui.education.title} />
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {education.map((item, i) => {
          const Icon = item.kind === 'school' ? GraduationCap : Award;
          return (
            <Reveal key={item.name} delay={i * 90} className="card flex flex-col p-6 sm:p-8">
              <Icon className={cn('h-8 w-8', item.kind === 'school' ? 'text-accent-text' : 'text-accent-text')} />
              <h3 className="mt-5 font-display text-xl font-semibold">{item.name}</h3>
              <p className="mt-1 text-muted-foreground">{t(item.detail)}</p>
              <p className="mt-4 font-mono text-xs text-muted-foreground">{item.dates}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

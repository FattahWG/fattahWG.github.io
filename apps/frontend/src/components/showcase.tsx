import { games, latestRun, links, profile, projects, studioDuties, type Project } from '@fattah/shared';
import { ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Copy, Download, Gamepad2, Github, Linkedin, Mail, MessageCircle, Music2, PlayCircle, Users, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLabConfig } from '@/lib/api';
import { useLang } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { DemoVideo } from './DemoVideo';
import { Logo } from './Navbar';
import { Reveal, SectionHeader } from './Reveal';

export function AutomationBadge({ project, className }: { project: Project; className?: string }) {
  const { ui } = useLang();
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold text-primary-foreground', className)}>
      {project.runnable ? <PlayCircle className="h-3 w-3" strokeWidth={3} /> : <Check className="h-3 w-3" strokeWidth={3} />}
      {project.runnable ? ui.projects.runnable : ui.projects.automated}
    </span>
  );
}

function ProjectCard({ project, featured }: { project: Project; featured: boolean }) {
  const { ui, t } = useLang();
  return (
    <article className={cn('card group flex h-full flex-col overflow-hidden transition hover:-translate-y-1 hover:border-primary/40', featured && 'lg:flex-row')}>
      <Link to={`/projects/${project.slug}`} className={cn('relative block overflow-hidden bg-muted', featured ? 'aspect-[16/10] lg:aspect-auto lg:w-[58%]' : 'aspect-[16/10]')}>
        <img src={project.image} alt={`${project.name} screenshot`} loading="lazy" className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.04]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <AutomationBadge project={project} className="absolute left-4 top-4" />
      </Link>
      <div className={cn('flex flex-1 flex-col p-6 sm:p-8', featured && 'lg:justify-center')}>
        <h3 className="font-display text-2xl font-semibold">{project.name}</h3>
        <p className="mt-2 text-muted-foreground">{t(project.tagline)}</p>
        {featured && <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t(project.description)}</p>}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span key={tech} className="rounded-full bg-muted px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-6 text-sm font-semibold">
          <Link to={`/projects/${project.slug}`} className="inline-flex items-center gap-1.5 text-primary">
            {project.caseStudy ? ui.projects.caseStudy : ui.projects.details}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
          {project.runnable && (
            <Link to="/lab" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
              <PlayCircle className="h-4 w-4" />
              {ui.lab.open}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

export function ProjectsSection() {
  const { ui } = useLang();
  return (
    <section id="projects" className="section container">
      <SectionHeader eyebrow={ui.projects.eyebrow} title={ui.projects.title} subtitle={ui.projects.subtitle} />
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 90} className={cn(i === 0 && 'lg:col-span-2')}>
            <ProjectCard project={project} featured={i === 0} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function GamesSection() {
  const { ui, t } = useLang();
  return (
    <section id="games" className="section relative overflow-hidden bg-muted/40">
      <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-accent/15 blur-[120px]" />
      <div className="container relative">
        <SectionHeader eyebrow={ui.games.eyebrow} title={ui.games.title} subtitle={ui.games.subtitle} game />

        <Reveal className="card mt-12 border-accent/30 p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-xl font-semibold">{ui.games.role}</h3>
              <p className="mt-1 text-muted-foreground">{ui.games.roleSub}</p>
            </div>
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent/10 text-accent">
              <Gamepad2 className="h-5 w-5" />
            </span>
          </div>
          <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-start">
            <div>
              <ul className="space-y-2.5">
                {studioDuties.map((duty) => (
                  <li key={duty.en} className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground">
                    <span className="mt-0.5 font-mono text-accent" aria-hidden>
                      ✓
                    </span>
                    {t(duty)}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-muted-foreground">{ui.games.note}</p>
            </div>
            <DemoVideo slug="studio-loop" caption={ui.games.loop} />
          </div>
        </Reveal>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {games.map((game, i) => (
            <Reveal key={game.slug} delay={(i % 2) * 90}>
              <article id={game.slug} className="card group flex h-full flex-col overflow-hidden transition hover:-translate-y-1 hover:border-accent/40">
                <div className="aspect-video overflow-hidden bg-muted">
                  <img
                    src={`/assets/img/${game.slug}-cover.webp`}
                    alt={`${game.name} thumbnail`}
                    width={768}
                    height={432}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3">
                    <img src={`/assets/img/${game.slug}-icon.webp`} alt="" width={40} height={40} loading="lazy" className="h-10 w-10 rounded-xl" />
                    <h3 className="font-display text-xl font-semibold">{game.name}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t(game.text)}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {game.chips.map((chip) => (
                      <span key={chip} className="rounded-full bg-muted px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
                        {chip}
                      </span>
                    ))}
                  </div>
                  <a href={game.url} target="_blank" rel="noopener" className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-accent">
                    {ui.games.play}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="card mt-6 flex flex-col items-start gap-5 p-6 sm:flex-row sm:items-center sm:p-8">
          <img src="/assets/img/lawak-gamehouse.webp" alt="Lawak Gamehouse logo" width={72} height={72} loading="lazy" className="h-[72px] w-[72px] rounded-2xl" />
          <div className="flex-1">
            <h3 className="font-display text-lg font-semibold">{ui.games.community}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{ui.games.communityText}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href={profile.robloxGroup} target="_blank" rel="noopener" className="btn-ghost px-4 py-2">
              <Users className="h-4 w-4" />
              {ui.games.group}
            </a>
            <a href={profile.discord} target="_blank" rel="noopener" className="btn-ghost px-4 py-2">
              <MessageCircle className="h-4 w-4" />
              {ui.games.discord}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function formatSeconds(ms: number): string {
  return `${(ms / 1000).toFixed(1)}s`;
}

/** Summary of the recorded run, like a Playwright report. */
export function RunReport({ className }: { className?: string }) {
  const { ui } = useLang();
  const passed = latestRun.tests.filter((test) => test.status === 'passed').length;
  const total = latestRun.tests.reduce((sum, test) => sum + test.durationMs, 0);
  return (
    <div className={cn('overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] font-mono text-sm', className)}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-white/60">
            {ui.lab.latest} · {latestRun.date} · {latestRun.source === 'local' ? ui.lab.local : 'GitHub Actions'}
          </p>
          <p className="mt-1 text-white">lawak-store / regression</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300">
            {passed}/{latestRun.tests.length} {ui.lab.passed}
          </span>
          <span className="text-xs text-white/60">
            {ui.lab.duration} {formatSeconds(total)}
          </span>
        </div>
      </div>
      {/* tabIndex: keyboard users can scroll the list too. */}
      <ul className="max-h-[360px] divide-y divide-white/5 overflow-y-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400" tabIndex={0} aria-label={ui.lab.latest}>
        {latestRun.tests.map((test) => (
          <li key={test.id} className="flex items-center gap-3 px-5 py-3">
            <span
              className={cn('grid h-5 w-5 shrink-0 place-items-center rounded-full', test.status === 'passed' ? 'bg-emerald-400/20 text-emerald-300' : 'bg-red-400/20 text-red-300')}
              role="img"
              aria-label={test.status}
            >
              {test.status === 'passed' ? <Check className="h-3 w-3" strokeWidth={3} /> : <X className="h-3 w-3" strokeWidth={3} />}
            </span>
            <span className="hidden w-24 shrink-0 text-xs text-white/55 sm:block">{test.id}</span>
            <span className="min-w-0 flex-1 font-sans text-white/85 sm:truncate">
              <span className="block font-mono text-[11px] text-white/55 sm:hidden">{test.id}</span>
              {test.title}
            </span>
            <span className="text-xs text-white/55">{formatSeconds(test.durationMs)}</span>
          </li>
        ))}
      </ul>
      <p className="border-t border-white/10 px-5 py-3 font-sans text-xs text-white/65">{ui.lab.defect}</p>
    </div>
  );
}

/** Step screenshots from the recorded run. */
export function StepGallery({ className }: { className?: string }) {
  const { ui, t } = useLang();
  const [index, setIndex] = useState(0);
  const steps = latestRun.steps;
  const step = steps[index];
  const go = (delta: number) => setIndex((i) => (i + delta + steps.length) % steps.length);

  return (
    <div className={cn('overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]', className)}>
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 font-mono text-xs text-white/60">
        <span className="uppercase tracking-widest">{ui.lab.steps}</span>
        <span>
          {String(index + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
        </span>
      </div>
      <div className="relative aspect-video bg-black">
        <img key={step.image} src={step.image} alt={t(step.label)} className="h-full w-full animate-fade-up object-cover object-top [animation-duration:.4s]" loading="lazy" />
        <button type="button" onClick={() => go(-1)} aria-label="Previous step" className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/80">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button type="button" onClick={() => go(1)} aria-label="Next step" className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/80">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <p className="px-5 pt-4 text-sm text-white/80">{t(step.label)}</p>
      <div className="flex gap-2 overflow-x-auto px-5 pb-5 pt-3">
        {steps.map((s, i) => (
          <button
            key={s.image}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={t(s.label)}
            className={cn('aspect-video w-20 shrink-0 overflow-hidden rounded-lg border-2 transition', i === index ? 'border-emerald-400' : 'border-transparent opacity-50 hover:opacity-100')}
          >
            <img src={s.image} alt="" className="h-full w-full object-cover object-top" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}

export function LabSection() {
  const { ui } = useLang();
  const runEnabled = useLabConfig()?.runEnabled ?? false;
  return (
    <section id="lab" className="relative overflow-hidden bg-ink py-20 text-white sm:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(hsl(156_72%_52%/0.18)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-emerald-500/20 blur-[120px]" />
      <div className="container relative">
        <Reveal className="max-w-2xl">
          <p className="eyebrow !text-emerald-400">
            <span className="h-px w-6 bg-emerald-400" />
            {ui.lab.eyebrow}
          </p>
          <h2 className="heading mt-4 text-balance">{ui.lab.title}</h2>
          <p className="mt-4 text-lg text-white/70 text-pretty">{ui.lab.subtitle}</p>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.15fr]">
          <Reveal className="min-w-0">
            <RunReport />
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link to="/lab" className="btn bg-emerald-400 text-ink hover:-translate-y-0.5 hover:bg-emerald-300">
                <PlayCircle className="h-4 w-4" />
                {ui.lab.open}
              </Link>
              <span className="inline-flex items-center gap-2 font-mono text-xs text-white/65">
                <span className={cn('h-2 w-2 animate-pulse rounded-full', runEnabled ? 'bg-emerald-400' : 'bg-amber-400')} />
                {runEnabled ? ui.lab.live : ui.lab.soon}
              </span>
            </div>
          </Reveal>
          <Reveal delay={120} className="min-w-0">
            <StepGallery />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const SOCIALS = [
  { href: profile.linkedin, label: 'LinkedIn', Icon: Linkedin },
  { href: profile.github, label: 'GitHub', Icon: Github },
  { href: profile.tiktok, label: 'TikTok', Icon: Music2 },
  { href: profile.discord, label: 'Discord', Icon: MessageCircle },
  { href: profile.roblox, label: 'Roblox', Icon: Gamepad2 },
];

export function ContactSection() {
  const { ui } = useLang();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="section container">
      <Reveal className="relative overflow-hidden rounded-[2.5rem] border bg-card px-6 py-16 text-center sm:px-12 sm:py-20">
        <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" />
        <div className="pointer-events-none absolute -bottom-32 left-1/2 h-72 w-[600px] -translate-x-1/2 rounded-full bg-primary/25 blur-[100px]" />
        <div className="relative">
          <img src={profile.photo} alt="" width={80} height={80} loading="lazy" className="mx-auto h-20 w-20 rounded-full border-4 border-background object-cover shadow-lg" />
          <p className="eyebrow mt-6 justify-center">{ui.contact.eyebrow}</p>
          <h2 className="heading mx-auto mt-4 max-w-2xl text-balance">{ui.contact.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">{ui.contact.subtitle}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={`mailto:${profile.email}`} className="btn-primary">
              <Mail className="h-4 w-4" />
              {ui.contact.email}
            </a>
            {profile.resumeUrl && (
              <a href={profile.resumeUrl} download={profile.resumeName} className="btn-ghost">
                <Download className="h-4 w-4" />
                {ui.hero.cta.cv}
              </a>
            )}
          </div>
          <button
            type="button"
            onClick={copy}
            data-testid="copy-email"
            className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-full px-3 font-mono text-xs text-muted-foreground transition hover:text-foreground sm:text-sm"
          >
            {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
            {copied ? ui.contact.copied : profile.email}
          </button>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {SOCIALS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener"
                aria-label={label}
                title={label}
                className="grid h-11 w-11 place-items-center rounded-full border bg-background transition hover:-translate-y-0.5 hover:border-primary hover:text-primary"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  const { ui } = useLang();
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-8 text-sm text-muted-foreground sm:flex-row">
        <Logo />
        <p className="text-center">{ui.footer.built}</p>
        <p className="font-mono text-xs">
          © {new Date().getFullYear()} {profile.name} ·{' '}
          <a href={links.siteRepo} target="_blank" rel="noopener" className="underline-offset-4 hover:text-foreground hover:underline">
            Source
          </a>
        </p>
      </div>
    </footer>
  );
}

import { profile } from '@fattah/shared';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '@/lib/i18n';
import { useTheme } from '@/lib/theme';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" aria-label="Fattah Widjaya Gandhi, home" className={cn('text-lg font-bold tracking-[-0.02em]', className)}>
      fattahwg
    </Link>
  );
}

/** A floating glass bar with a fuller fill, so its links stay readable over any panel. */
export function Navbar() {
  const { ui, lang, setLang } = useLang();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  const links = [
    { href: '/#experience', label: ui.nav.experience },
    { href: '/#projects', label: ui.nav.projects },
    { href: '/#games', label: ui.nav.games },
    { href: '/lab', label: ui.nav.lab },
    { href: '/#contact', label: ui.nav.contact },
  ];
  const control = 'grid h-10 min-w-10 place-items-center rounded-full px-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground';

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3">
      <div className={'glass-nav mx-auto max-w-[1200px] rounded-[1.75rem]'}>
        <nav className="flex h-14 items-center justify-between gap-4 pl-5 pr-2" aria-label="Main">
          <Logo />

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <div className="flex rounded-full bg-muted/70 p-0.5" role="group" aria-label="Language">
              {(['en', 'id'] as const).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  aria-pressed={lang === code}
                  className={cn('min-h-9 rounded-full px-3 text-xs font-semibold uppercase transition-colors', lang === code ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground')}
                >
                  {code}
                </button>
              ))}
            </div>
            <button type="button" onClick={toggle} aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'} className={control}>
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            {profile.resumeUrl && (
              <a href={profile.resumeUrl} download={profile.resumeName} className="btn-primary hidden min-h-10 px-5 py-2 text-sm xl:inline-flex">
                {ui.hero.cta.cv}
              </a>
            )}
            <button type="button" onClick={() => setOpen((v) => !v)} aria-label="Menu" aria-expanded={open} aria-controls="mobile-nav" className={cn(control, 'lg:hidden')}>
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {open && (
          <ul id="mobile-nav" className="grid gap-1 px-3 pb-4 lg:hidden">
            {links.map((link) => (
              <li key={link.href}>
                <Link to={link.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 text-lg font-semibold hover:bg-muted">
                  {link.label}
                </Link>
              </li>
            ))}
            {profile.resumeUrl && (
              <li className="pt-2">
                <a href={profile.resumeUrl} download={profile.resumeName} className="btn-primary w-full">
                  {ui.hero.cta.cv}
                </a>
              </li>
            )}
          </ul>
        )}
      </div>
    </header>
  );
}

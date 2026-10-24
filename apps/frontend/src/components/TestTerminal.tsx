import { useEffect, useState } from 'react';
import { useLang } from '@/lib/i18n';
import { cn } from '@/lib/utils';

// A "test" about Fattah. Each line is a claim from the CV.
const TESTS = {
  en: [
    { title: 'owns QA as the independent tester', ms: 412 },
    { title: 'runs SIT, UAT and regression', ms: 388 },
    { title: 'checks APIs and load with JMeter', ms: 351 },
    { title: 'automated with UFT One at work', ms: 297 },
    { title: 'runs Playwright and Bruno in CI', ms: 446 },
    { title: 'directs Roblox games at Lawak Studio', ms: 233 },
  ],
  id: [
    { title: 'memegang QA sebagai tester independen', ms: 412 },
    { title: 'menjalankan SIT, UAT dan regression', ms: 388 },
    { title: 'mengecek API dan beban dengan JMeter', ms: 351 },
    { title: 'membuat automation UFT One di kantor', ms: 297 },
    { title: 'menjalankan Playwright dan Bruno di CI', ms: 446 },
    { title: 'memimpin game Roblox di Lawak Studio', ms: 233 },
  ],
};

const STEP_MS = 520;

export function TestTerminal({ className }: { className?: string }) {
  const { lang, ui } = useLang();
  const tests = TESTS[lang];
  // The server renders the finished state, so the text is in the HTML without JavaScript.
  const [done, setDone] = useState(tests.length);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDone(tests.length);
      return;
    }
    setDone(0);
    // Start after the hero fades in, then one line per STEP_MS.
    let count = 0;
    let timer = window.setTimeout(function tick() {
      count += 1;
      setDone(count);
      if (count < tests.length) timer = window.setTimeout(tick, STEP_MS);
    }, 900);
    return () => window.clearTimeout(timer);
  }, [lang, tests.length]);

  const finished = done >= tests.length;
  const total = (tests.reduce((sum, t) => sum + t.ms, 0) / 1000).toFixed(1);

  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-white/10 bg-ink/95 font-mono text-[12.5px] leading-relaxed text-emerald-50 shadow-2xl shadow-black/40 backdrop-blur',
        className
      )}
      role="img"
      aria-label={tests.map((t) => `passed: ${t.title}`).join('. ')}
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 truncate text-[11px] text-white/55">~/fattah $ npx playwright test {ui.terminal.title}</span>
      </div>
      <div className="space-y-1 px-4 py-3.5" aria-hidden>
        <p className="text-white/55">{ui.terminal.running}</p>
        {tests.map((test, i) => (
          <p key={test.title} className={cn('flex gap-2 transition-opacity duration-300', i < done ? 'opacity-100' : 'opacity-0')}>
            <span className="text-emerald-400">✓</span>
            <span className="hidden text-white/45 sm:inline">{i + 1}</span>
            <span className="flex-1 truncate">
              <span className="hidden text-white/55 sm:inline">Fattah › </span>
              {test.title}
            </span>
            <span className="text-white/45">{test.ms}ms</span>
          </p>
        ))}
        <p className={cn('pt-2 transition-opacity duration-500', finished ? 'opacity-100' : 'opacity-0')}>
          <span className="font-semibold text-emerald-400">
            {tests.length} {ui.terminal.passed}
          </span>{' '}
          <span className="text-white/55">({total}s)</span>
        </p>
        <p className={cn('text-white/80 transition-opacity delay-200 duration-500', finished ? 'opacity-100' : 'opacity-0')}>
          {ui.terminal.ready}
          <span className="ml-1 inline-block h-3.5 w-2 translate-y-0.5 animate-blink bg-emerald-400" />
        </p>
      </div>
    </div>
  );
}

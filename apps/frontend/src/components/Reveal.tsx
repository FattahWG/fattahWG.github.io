import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** Fades in when it enters the viewport. The CSS in index.css hides it only when JavaScript runs. */
export function Reveal({ children, className, delay = 0, as: Tag = 'div' }: { children: ReactNode; className?: string; delay?: number; as?: 'div' | 'li' }) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Also show blocks the page jumped past (an anchor link or a fast scroll), so none stays hidden above.
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [shown]);

  return (
    <Tag ref={ref} style={delay ? { transitionDelay: `${delay}ms` } : undefined} className={cn('reveal', shown && 'is-shown', className)}>
      {children}
    </Tag>
  );
}

export function SectionHeader({ eyebrow, title, subtitle, className, game }: { eyebrow: string; title: string; subtitle?: string; className?: string; game?: boolean }) {
  return (
    <Reveal className={cn('max-w-2xl', className)}>
      <p className={cn('eyebrow', game && '!text-accent-text')}>
        <span className="h-px w-6 bg-primary" />
        {eyebrow}
      </p>
      <h2 className="heading mt-4 text-balance">{title}</h2>
      {subtitle && <p className="mt-4 text-lg text-muted-foreground text-pretty">{subtitle}</p>}
    </Reveal>
  );
}

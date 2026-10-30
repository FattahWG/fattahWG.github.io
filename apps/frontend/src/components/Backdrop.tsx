import { useEffect, useRef } from 'react';

/** The fixed page backdrop: a faint grid and two soft glows. The first glow drifts a little toward the pointer. */
export function Backdrop() {
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glow.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.matchMedia('(pointer: fine)').matches) return;
    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    let frame = 0;
    const loop = () => {
      x += (tx - x) * 0.04;
      y += (ty - y) * 0.04;
      el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      frame = Math.abs(tx - x) > 0.5 || Math.abs(ty - y) > 0.5 ? requestAnimationFrame(loop) : 0;
    };
    const move = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 120;
      ty = (e.clientY / window.innerHeight - 0.5) * 80;
      if (!frame) frame = requestAnimationFrame(loop);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => {
      window.removeEventListener('pointermove', move);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="backdrop-grid absolute inset-0" />
      <div ref={glow} className="absolute right-[-10%] top-[-20%] h-[60vmax] w-[60vmax]">
        <div className="glow inset-0" style={{ background: 'var(--glow-1)' }} />
      </div>
      <div className="glow bottom-[-25%] left-[-15%] h-[50vmax] w-[50vmax]" style={{ background: 'var(--glow-2)' }} />
    </div>
  );
}

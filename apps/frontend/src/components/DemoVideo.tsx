import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

/** A looping demo video from /assets/video. It plays in view only, and never by itself when motion is reduced. */
export function DemoVideo({ slug, caption, className }: { slug: string; caption: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) void video.play().catch(() => undefined);
      else video.pause();
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <figure className={cn('overflow-hidden bg-ink', className)}>
      <video
        ref={ref}
        muted
        loop
        playsInline
        controls
        preload="metadata"
        poster={`/assets/video/${slug}.webp`}
        width={960}
        height={540}
        aria-label={caption}
        className="aspect-video w-full bg-black"
      >
        <source src={`/assets/video/${slug}.mp4`} type="video/mp4" />
        <source src={`/assets/video/${slug}.webm`} type="video/webm" />
      </video>
      <figcaption className="px-5 py-3 text-sm text-white/70">{caption}</figcaption>
    </figure>
  );
}

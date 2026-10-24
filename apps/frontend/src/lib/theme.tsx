import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

/** public/assets/boot.js sets the first theme before paint. This hook reads and changes it. */
export function useTheme(): { theme: Theme; toggle: () => void } {
  // Start from 'light' on the server and on the first client render, so hydration matches.
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  }, []);

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.classList.toggle('dark', next === 'dark');
      try {
        localStorage.setItem('theme', next);
      } catch {
        // storage blocked: the choice lasts for this page only
      }
      return next;
    });
  }, []);

  return { theme, toggle };
}

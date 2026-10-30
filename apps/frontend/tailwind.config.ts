import type { Config } from 'tailwindcss';

const token = (name: string) => `hsl(var(--${name}) / <alpha-value>)`;
const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
/** Every shade of an old palette colour points at one token, so the QA Lab pages take the new palette unchanged. */
const scale = (name: string) => Object.fromEntries(SHADES.map((shade) => [shade, token(name)]));

// Direction 2026-10-31 (Fattah chose dark and light glass after his Behance reference): Montserrat,
// frosted glass cards on a grid with soft violet glows, one violet accent.
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: { center: true, padding: { DEFAULT: '1.25rem', md: '2rem' }, screens: { '2xl': '1240px' } },
    extend: {
      fontFamily: {
        sans: ['"Montserrat Variable"', 'system-ui', 'sans-serif'],
        display: ['"Montserrat Variable"', 'system-ui', 'sans-serif'],
        mono: ['"Montserrat Variable"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.8125rem', { lineHeight: '1.25rem' }],
      },
      colors: {
        background: token('background'),
        foreground: token('foreground'),
        card: token('card'),
        muted: { DEFAULT: token('muted'), foreground: token('muted-foreground') },
        border: token('border'),
        primary: { DEFAULT: token('primary'), foreground: token('primary-foreground') },
        accent: { DEFAULT: token('accent-text'), foreground: token('primary-foreground') },
        'accent-text': token('accent-text'),
        danger: token('fail'),
        fail: token('fail'),
        pass: token('pass'),
        ink: token('ink'),
        emerald: scale('pass'),
        red: scale('fail'),
        amber: scale('wait'),
      },
      keyframes: {
        'fade-up': { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'none' } },
        shake: { '0%,100%': { transform: 'none' }, '25%': { transform: 'translateX(-4px)' }, '75%': { transform: 'translateX(4px)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        'pulse-ring': { '0%': { boxShadow: '0 0 0 0 hsl(var(--primary) / .55)' }, '100%': { boxShadow: '0 0 0 10px hsl(var(--primary) / 0)' } },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        blink: { '50%': { opacity: '0' } },
      },
      animation: {
        'fade-up': 'fade-up .7s cubic-bezier(.2,.8,.2,1) both',
        shake: 'shake .35s ease-in-out 2',
        float: 'float 6s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 1.6s ease-out infinite',
        marquee: 'marquee 40s linear infinite',
        blink: 'blink 1s step-end infinite',
      },
    },
  },
} satisfies Config;

import type { Localized } from '@fattah/shared';
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Lang } from './utils';

const en = {
  nav: { about: 'About', experience: 'Experience', projects: 'Projects', games: 'Games', lab: 'QA Lab', contact: 'Contact', hire: "Let's talk" },
  hero: {
    status: 'QA Software Engineer at',
    hi: "Hi, I'm Fattah.",
    cta: { contact: 'Get in touch', lab: 'Watch my tests run', cv: 'Download CV' },
    side: 'Studio Director at Lawak Studio',
    passRate: 'latest run',
  },
  terminal: { title: 'fattah.spec.ts', running: 'Running 6 tests using 1 worker', passed: 'passed', ready: 'Ready for your team.' },
  stats: {
    yrs: '+ yrs',
    qa: 'in Quality Assurance',
    clients: 'client projects in banking, insurance, and enterprise',
    cases: 'test cases in the Lawak Store demo',
    games: 'Roblox games at Lawak Studio',
  },
  about: {
    eyebrow: 'About',
    title: 'From QA to automation, plus games.',
    bring: 'What I bring to your team',
  },
  experience: {
    eyebrow: 'Experience',
    title: 'Where I test',
    present: 'Present',
    automation: 'Test automation',
    automationSub: 'From UFT One and Java frameworks to Playwright and Bruno in CI',
    growing: 'Growing now',
  },
  skills: { eyebrow: 'Skills', title: 'Skills and tools', subtitle: 'What I use in my QA work and in my game projects.' },
  projects: {
    eyebrow: 'Projects',
    title: 'Automation you can check',
    subtitle: 'Real suites with real results. You can run one of them yourself in the QA Lab.',
    automated: 'Automated with Playwright',
    runnable: 'Run it live',
    visit: 'Open',
    caseStudy: 'Read the QA case study',
    details: 'View details',
  },
  games: {
    eyebrow: 'Lawak Studio',
    title: 'Games we made',
    subtitle: 'Lawak Studio publishes its games under the Lawak Gamehouse community on Roblox. I direct these projects with our programmers, level designers, and 3D artists.',
    role: 'Studio Director',
    roleSub: 'Lawak Studio · Roblox game projects · Side project',
    loop: 'Illustrated loop: how a Lawak Studio game goes from idea to playtest, shown with our four Roblox games.',
    note: 'A side project I run seriously. It gives me hands-on practice in game direction, teamwork, and product thinking, and writing game systems in Luau keeps me close to code.',
    play: 'Play on Roblox',
    community: 'Lawak Gamehouse',
    communityText: 'Play. Explore. Have fun. The Roblox community where Lawak Studio games live.',
    group: 'Community',
    discord: 'Discord',
  },
  lab: {
    eyebrow: 'QA Lab',
    title: "Don't take my word for it. Watch the tests run.",
    subtitle: 'Real Playwright tests against Lawak Store, my demo shop: step screenshots, video, and a report, recorded on every run.',
    latest: 'Latest run',
    local: 'local run',
    open: 'Open QA Lab',
    soon: 'Live runner on GitHub Actions: coming soon',
    live: 'Press Run and watch it happen, live on GitHub Actions',
    passed: 'passed',
    duration: 'Duration',
    steps: 'Recorded steps',
    defect: 'One failure is expected: DEF-001 is planted on purpose, and TC-CHK-006 catches it.',
  },
  education: { eyebrow: 'Education & certification', title: 'Foundations' },
  contact: {
    eyebrow: 'Contact',
    title: "Let's talk about QA or a game idea.",
    subtitle: 'For QA work or collaboration, email is the fastest way to reach me. For game updates, join the Discord.',
    email: 'Email me',
    copied: 'Copied!',
  },
  footer: { built: 'Built with React and Vite on GitHub Pages. The QA Lab runs on Cloudflare Workers and GitHub Actions.' },
  project: {
    back: 'All projects',
    features: 'What it covers',
    stack: 'Tech stack',
    strategy: 'Test strategy',
    automated: 'What I automated, and why',
    notAutomated: 'What I deliberately did not automate',
    findings: 'Known defect',
    noCaseStudy: 'The reports from the last deploy are linked above.',
  },
  labPage: {
    how: 'How it works',
    flow: [
      { title: 'You press Run', body: 'Turnstile and a rate limit protect the button. One run at a time.' },
      { title: 'GitHub Actions starts', body: 'A Linux VM starts the Lawak Store demo server and runs the Playwright UI suite in Chromium.' },
      { title: 'Results stream back', body: 'Steps, logs, screenshots, and video are stored in Cloudflare D1 and R2.' },
      { title: 'You watch it live', body: 'Every step appears here within seconds, and you can replay any run later.' },
    ],
  },
  runner: {
    run: 'Run 41 UI tests',
    starting: 'Starting…',
    note: 'Takes about 3 minutes. One run at a time, 3 runs per visitor per day.',
    verify: 'Complete the check to enable the button.',
    active: 'A run is in progress',
    watch: 'Watch it live',
    disabled: 'The Run button is being set up. Meanwhile, look at the recorded run below.',
    history: 'Recent runs',
    sample: 'Sample run (recorded locally)',
    errors: {
      turnstile_failed: 'Verification failed. Please try the check again.',
      quota_ip: 'You have used your 3 runs for today. Come back tomorrow, or watch a past run.',
      quota_daily: "Today's public run quota is used up. Try again tomorrow.",
      runner_disabled: 'The runner is not available right now.',
      dispatch_failed: 'GitHub did not accept the run. Please try again in a minute.',
      generic: 'Something went wrong. Please try again.',
    },
    status: { queued: 'Queued', running: 'Running', passed: 'Passed', failed: 'Failed', cancelled: 'Cancelled', expired: 'Expired' },
    trigger: { visitor: 'Visitor', owner: 'Owner', schedule: 'Daily schedule' },
    queuedHint: 'Waiting for a GitHub Actions runner. This usually takes 30 to 90 seconds.',
    preparing: 'The runner is installing Chromium and starting the demo server…',
    tabs: { steps: 'Steps', video: 'Video', log: 'Log', report: 'Report' },
    tests: 'Tests',
    noSteps: 'Steps appear here as the test runs.',
    noVideo: 'The video is uploaded when the test finishes.',
    noLog: 'Log lines stream in once the runner starts.',
    github: 'View on GitHub Actions',
    back: 'QA Lab',
    elapsed: 'Elapsed',
    of: 'of',
    notFound: 'Run not found.',
  },
  notFound: { title: 'Test failed: page not found', body: 'This route does not exist. The link may be old.', home: 'Back to home' },
};

type Dict = typeof en;

const id: Dict = {
  nav: { about: 'Tentang', experience: 'Pengalaman', projects: 'Project', games: 'Game', lab: 'QA Lab', contact: 'Kontak', hire: 'Hubungi saya' },
  hero: {
    status: 'QA Software Engineer di',
    hi: 'Halo, saya Fattah.',
    cta: { contact: 'Hubungi saya', lab: 'Lihat test saya berjalan', cv: 'Unduh CV' },
    side: 'Studio Director di Lawak Studio',
    passRate: 'run terakhir',
  },
  terminal: { title: 'fattah.spec.ts', running: 'Menjalankan 6 test dengan 1 worker', passed: 'lolos', ready: 'Siap bergabung dengan tim Anda.' },
  stats: {
    yrs: '+ thn',
    qa: 'di Quality Assurance',
    clients: 'project klien di perbankan, asuransi, dan enterprise',
    cases: 'test case di demo Lawak Store',
    games: 'game Roblox di Lawak Studio',
  },
  about: {
    eyebrow: 'Tentang',
    title: 'Dari QA ke automation, ditambah game.',
    bring: 'Yang saya bawa ke tim Anda',
  },
  experience: {
    eyebrow: 'Pengalaman',
    title: 'Tempat saya menguji',
    present: 'Sekarang',
    automation: 'Test automation',
    automationSub: 'Dari UFT One dan framework Java ke Playwright dan Bruno di CI',
    growing: 'Sedang berkembang',
  },
  skills: { eyebrow: 'Skill', title: 'Skill dan tools', subtitle: 'Yang saya pakai di pekerjaan QA dan di project game.' },
  projects: {
    eyebrow: 'Project',
    title: 'Automation yang bisa Anda cek',
    subtitle: 'Suite sungguhan dengan hasil sungguhan. Salah satunya bisa Anda jalankan sendiri di QA Lab.',
    automated: 'Terotomasi dengan Playwright',
    runnable: 'Jalankan live',
    visit: 'Buka',
    caseStudy: 'Baca studi kasus QA',
    details: 'Lihat detail',
  },
  games: {
    eyebrow: 'Lawak Studio',
    title: 'Game yang kami buat',
    subtitle: 'Lawak Studio merilis game-nya di komunitas Lawak Gamehouse di Roblox. Saya memimpin project ini bersama programmer, level designer, dan 3D artist kami.',
    role: 'Studio Director',
    roleSub: 'Lawak Studio · Project game Roblox · Project sampingan',
    loop: 'Animasi ilustrasi: perjalanan game Lawak Studio dari ide sampai playtest, dengan empat game Roblox kami.',
    note: 'Project sampingan yang saya jalankan dengan serius. Saya berlatih langsung soal arah game, kerja tim, dan cara pikir produk, dan menulis sistem game dengan Luau membuat saya tetap dekat dengan kode.',
    play: 'Main di Roblox',
    community: 'Lawak Gamehouse',
    communityText: 'Play. Explore. Have fun. Komunitas Roblox tempat game Lawak Studio berada.',
    group: 'Komunitas',
    discord: 'Discord',
  },
  lab: {
    eyebrow: 'QA Lab',
    title: 'Jangan percaya kata saya. Lihat test-nya berjalan.',
    subtitle: 'Test Playwright sungguhan terhadap Lawak Store, toko demo saya: screenshot per langkah, video, dan report, direkam di setiap run.',
    latest: 'Run terakhir',
    local: 'run lokal',
    open: 'Buka QA Lab',
    soon: 'Runner live di GitHub Actions: segera hadir',
    live: 'Tekan Run dan tonton langsung, live di GitHub Actions',
    passed: 'lolos',
    duration: 'Durasi',
    steps: 'Langkah yang direkam',
    defect: 'Satu kegagalan memang diharapkan: DEF-001 sengaja ditanam, dan TC-CHK-006 menangkapnya.',
  },
  education: { eyebrow: 'Pendidikan & sertifikasi', title: 'Fondasi' },
  contact: {
    eyebrow: 'Kontak',
    title: 'Mari bicara soal QA atau ide game.',
    subtitle: 'Untuk pekerjaan QA atau kolaborasi, email adalah cara tercepat. Untuk kabar game, gabung ke Discord.',
    email: 'Kirim email',
    copied: 'Tersalin!',
  },
  footer: { built: 'Dibangun dengan React dan Vite di GitHub Pages. QA Lab berjalan di Cloudflare Workers dan GitHub Actions.' },
  project: {
    back: 'Semua project',
    features: 'Cakupan',
    stack: 'Tech stack',
    strategy: 'Strategi test',
    automated: 'Yang saya otomasi, dan alasannya',
    notAutomated: 'Yang sengaja tidak saya otomasi',
    findings: 'Defect yang diketahui',
    noCaseStudy: 'Report dari deploy terakhir ada di link di atas.',
  },
  labPage: {
    how: 'Cara kerjanya',
    flow: [
      { title: 'Anda menekan Run', body: 'Tombol dilindungi Turnstile dan rate limit. Satu run dalam satu waktu.' },
      { title: 'GitHub Actions mulai', body: 'VM Linux menyalakan server demo Lawak Store dan menjalankan suite UI Playwright di Chromium.' },
      { title: 'Hasil dikirim balik', body: 'Langkah, log, screenshot, dan video disimpan di Cloudflare D1 dan R2.' },
      { title: 'Anda menonton live', body: 'Tiap langkah muncul di sini dalam hitungan detik, dan run lama bisa diputar ulang.' },
    ],
  },
  runner: {
    run: 'Jalankan 41 test UI',
    starting: 'Memulai…',
    note: 'Sekitar 3 menit. Satu run dalam satu waktu, 3 run per pengunjung per hari.',
    verify: 'Selesaikan verifikasi untuk mengaktifkan tombol.',
    active: 'Ada run yang sedang berjalan',
    watch: 'Tonton live',
    disabled: 'Tombol Run sedang disiapkan. Sementara itu, lihat run yang sudah direkam di bawah.',
    history: 'Run terbaru',
    sample: 'Contoh run (direkam lokal)',
    errors: {
      turnstile_failed: 'Verifikasi gagal. Silakan ulangi verifikasinya.',
      quota_ip: 'Jatah 3 run Anda hari ini sudah habis. Kembali besok, atau tonton run sebelumnya.',
      quota_daily: 'Kuota run publik hari ini sudah habis. Coba lagi besok.',
      runner_disabled: 'Runner sedang tidak tersedia.',
      dispatch_failed: 'GitHub tidak menerima run. Coba lagi sebentar lagi.',
      generic: 'Terjadi kesalahan. Silakan coba lagi.',
    },
    status: { queued: 'Antre', running: 'Berjalan', passed: 'Lolos', failed: 'Gagal', cancelled: 'Dibatalkan', expired: 'Kedaluwarsa' },
    trigger: { visitor: 'Pengunjung', owner: 'Owner', schedule: 'Jadwal harian' },
    queuedHint: 'Menunggu runner GitHub Actions. Biasanya 30 sampai 90 detik.',
    preparing: 'Runner sedang memasang Chromium dan menyalakan server demo…',
    tabs: { steps: 'Langkah', video: 'Video', log: 'Log', report: 'Report' },
    tests: 'Test',
    noSteps: 'Langkah muncul di sini selama test berjalan.',
    noVideo: 'Video di-upload setelah test selesai.',
    noLog: 'Baris log mengalir setelah runner mulai.',
    github: 'Lihat di GitHub Actions',
    back: 'QA Lab',
    elapsed: 'Berjalan',
    of: 'dari',
    notFound: 'Run tidak ditemukan.',
  },
  notFound: { title: 'Test gagal: halaman tidak ditemukan', body: 'Route ini tidak ada. Mungkin link-nya sudah lama.', home: 'Kembali ke beranda' },
};

const DICTS: Record<Lang, Dict> = { en, id };

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  ui: Dict;
  t: (text: Localized) => string;
}

const LangContext = createContext<LangContextValue | null>(null);

function preferredLang(): Lang {
  try {
    const saved = localStorage.getItem('lang');
    if (saved === 'en' || saved === 'id') return saved;
  } catch {
    // storage blocked: use the browser language
  }
  return navigator.language.toLowerCase().startsWith('id') ? 'id' : 'en';
}

export function LangProvider({ children }: { children: ReactNode }) {
  // The prerendered HTML is English. Switch after hydration, so the first client render matches it.
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    setLangState(preferredLang());
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<LangContextValue>(
    () => ({
      lang,
      setLang: (next) => {
        setLangState(next);
        try {
          localStorage.setItem('lang', next);
        } catch {
          // storage blocked: the choice lasts for this page only
        }
      },
      ui: DICTS[lang],
      t: (text) => text[lang],
    }),
    [lang]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used inside LangProvider');
  return ctx;
}

/** Text in English (main) and Indonesian. */
export type Localized = { en: string; id: string };

export interface Engagement {
  name: string;
  start?: string; // YYYY-MM
  end?: string | null; // null = now
  domain: Localized;
  items: Localized[];
}

export interface Experience {
  role: string;
  company: string;
  start: string; // YYYY-MM
  end: string | null; // null = now
  projects: Engagement[];
  tags: string[];
}

export interface SkillGroup {
  icon: 'list' | 'workflow' | 'gauge' | 'layers' | 'braces' | 'users' | 'game';
  title: Localized;
  items: string[];
  game?: boolean;
}

// Source: the CV in /assets/cv. Do not add tech, duties, companies, dates or results that the CV does not hold.
export const profile = {
  name: 'Fattah Widjaya Gandhi',
  nickname: 'Fattah',
  role: 'SQA Engineer',
  currentCompany: 'Astragraphia IT',
  email: 'off.fattah@gmail.com',
  github: 'https://github.com/FattahWG',
  linkedin: 'https://www.linkedin.com/in/fattahwg/',
  tiktok: 'https://www.tiktok.com/@BedulDah',
  roblox: 'https://www.roblox.com/users/8192435910/profile',
  discord: 'https://discord.gg/WujZkWJ3uz',
  robloxGroup: 'https://www.roblox.com/communities/510724970/Lawak-Gamehouse',
  photo: '/assets/img/github-avatar.webp',
  resumeUrl: '/assets/cv/Fattah-Widjaya-Gandhi-CV.pdf' as string | null,
  resumeName: 'CV-Fattah Widjaya Gandhi.pdf',
  headline: {
    en: 'I test software for a living and build Roblox games on the side.',
    id: 'Pekerjaan saya menguji software. Di luar itu, saya membuat game Roblox.',
  } satisfies Localized,
  intro: {
    en: 'SQA Engineer with 2.5+ years in banking, insurance, and enterprise QA. I build automation with Playwright and Bruno.',
    id: 'SQA Engineer dengan pengalaman 2,5+ tahun di QA perbankan, asuransi, dan enterprise. Saya membangun automation dengan Playwright dan Bruno.',
  } satisfies Localized,
  summary: {
    en: "I'm an SQA Engineer with 2.5+ years of testing banking, insurance, and enterprise applications. I plan and design tests, run SIT, UAT, regression, API, and performance testing, and often own QA on a project as the independent tester. I've automated with UFT One at work, and with Selenium, Serenity BDD, Rest Assured, and Appium in my bootcamp projects. Now I'm building with Playwright and Bruno in CI. On the side, I lead Roblox game projects at Lawak Studio.",
    id: 'Saya SQA Engineer dengan pengalaman 2,5+ tahun menguji aplikasi perbankan, asuransi, dan enterprise. Saya merencanakan dan merancang test, menjalankan SIT, UAT, regression, API, dan performance testing, dan sering memegang QA sebuah project sebagai tester independen. Di kantor saya membuat automation dengan UFT One, dan di project bootcamp dengan Selenium, Serenity BDD, Rest Assured, dan Appium. Sekarang saya membangun dengan Playwright dan Bruno di CI. Di luar pekerjaan, saya memimpin project game Roblox di Lawak Studio.',
  } satisfies Localized,
};

export const strengths: { icon: 'plan' | 'shield' | 'bot' | 'game'; title: Localized; body: Localized }[] = [
  {
    icon: 'plan',
    title: { en: 'Testing across the cycle', id: 'Testing di seluruh siklus' },
    body: {
      en: 'Functional, regression, SIT, and UAT testing on web and mobile, plus API testing.',
      id: 'Functional, regression, SIT, dan UAT testing di web dan mobile, ditambah API testing.',
    },
  },
  {
    icon: 'shield',
    title: { en: 'Independent QA', id: 'QA independen' },
    body: {
      en: 'I often own QA on a project and coordinate testing with development and business requirements.',
      id: 'Saya sering memegang QA sebuah project dan menyelaraskan testing dengan tim development dan kebutuhan bisnis.',
    },
  },
  {
    icon: 'bot',
    title: { en: 'Automation in CI', id: 'Automation di CI' },
    body: {
      en: 'UFT One at work, Selenium and Rest Assured before that, and now Playwright and Bruno running in CI.',
      id: 'UFT One di kantor, Selenium dan Rest Assured sebelumnya, dan sekarang Playwright dan Bruno yang berjalan di CI.',
    },
  },
  {
    icon: 'game',
    title: { en: 'Product thinking from games', id: 'Cara pikir produk dari game' },
    body: {
      en: 'Directing Roblox projects teaches me to think about player experience, scope, and teamwork.',
      id: 'Memimpin project Roblox melatih saya memikirkan pengalaman pemain, scope, dan kerja tim.',
    },
  },
];

export const careerSummary: Localized = {
  en: '2.5+ years testing banking, insurance, and enterprise applications, as the independent tester on projects and as part of QA teams.',
  id: '2,5+ tahun menguji aplikasi perbankan, asuransi, dan enterprise, sebagai tester independen di project dan sebagai bagian dari tim QA.',
};

export const experiences: Experience[] = [
  {
    role: 'QA Software Engineer',
    company: 'Astragraphia Information Technology',
    start: '2025-10',
    end: null,
    tags: ['SIT', 'UAT', 'Regression', 'API testing', 'JMeter', 'UFT One', 'Grafana', 'Jira'],
    projects: [
      {
        name: 'Manulife Insurance – EBClick',
        start: '2026-04',
        end: null,
        domain: {
          en: 'Insurance web applications and their business workflows.',
          id: 'Aplikasi web asuransi dan alur bisnisnya.',
        },
        items: [
          {
            en: 'Own QA as the independent tester, from test planning and test case design to execution and defect validation.',
            id: 'Memegang QA sebagai tester independen, dari test planning dan desain test case sampai eksekusi dan validasi defect.',
          },
          {
            en: 'Run API testing, SIT, UAT support, and regression testing.',
            id: 'Menjalankan API testing, SIT, dukungan UAT, dan regression testing.',
          },
          {
            en: 'Check stability and response times under different workloads with JMeter performance tests.',
            id: 'Mengecek stabilitas dan response time di beban yang berbeda dengan performance test JMeter.',
          },
          {
            en: 'Track defects in Jira, and work directly with business analysts, developers, and stakeholders to support release delivery.',
            id: 'Mencatat defect di Jira, dan bekerja langsung dengan business analyst, developer, dan stakeholder untuk mendukung rilis.',
          },
        ],
      },
      {
        name: 'Toyota Astra Motor (TAM) – Employee Self-Service',
        start: '2025-10',
        end: '2026-04',
        domain: {
          en: 'An ESS platform that connects attendance, employee claims, company news, and employee services.',
          id: 'Platform ESS yang menghubungkan absensi, klaim karyawan, berita perusahaan, dan layanan karyawan.',
        },
        items: [
          {
            en: 'Created and ran test cases, with SIT, UAT, regression, and exploratory testing across the business modules.',
            id: 'Membuat dan menjalankan test case, dengan SIT, UAT, regression, dan exploratory testing di semua modul bisnis.',
          },
          {
            en: 'Built and maintained automation test scripts with UFT One.',
            id: 'Membuat dan merawat skrip automation test dengan UFT One.',
          },
          {
            en: 'Monitored API performance in Grafana: response times, concurrent users, and peak activity.',
            id: 'Memantau performa API di Grafana: response time, concurrent user, dan aktivitas puncak.',
          },
        ],
      },
    ],
  },
  {
    role: 'Quality Assurance Engineer',
    company: 'Nawa Data Solutions',
    start: '2023-02',
    end: '2024-08',
    tags: ['SIT', 'Regression', 'Exploratory', 'Requirement analysis', 'Jira'],
    projects: [
      {
        name: 'Client: CIMB Niaga – Banking E-Procurement System',
        domain: {
          en: 'Procurement from vendor management to payment: purchase requests and orders, tenders, approvals, budgets, contracts, and invoices.',
          id: 'Pengadaan dari manajemen vendor sampai pembayaran: purchase request dan order, tender, approval, budget, kontrak, dan invoice.',
        },
        items: [
          {
            en: 'Created and maintained test cases across the e-procurement modules.',
            id: 'Membuat dan merawat test case di semua modul e-procurement.',
          },
          {
            en: 'Validated end-to-end procurement flows with multi-level approvals and business rules through SIT, regression, and exploratory testing.',
            id: 'Memvalidasi alur pengadaan end-to-end dengan approval bertingkat dan aturan bisnis lewat SIT, regression, dan exploratory testing.',
          },
          {
            en: 'Analyzed requirements with business analysts and developers, and tracked and verified defects in Jira.',
            id: 'Menganalisis requirement bersama business analyst dan developer, serta mencatat dan memverifikasi defect di Jira.',
          },
        ],
      },
    ],
  },
];

export const automationHistory: Localized[] = [
  {
    en: 'At work, I built and maintained automation test scripts with UFT One.',
    id: 'Di kantor, saya membuat dan merawat skrip automation test dengan UFT One.',
  },
  {
    en: 'In my Alterra Academy QA bootcamp projects, I automated web, API, and Android tests with Selenium, Serenity BDD, Cucumber, Rest Assured, and Appium in Java.',
    id: 'Di project bootcamp QA Alterra Academy, saya mengotomasi test web, API, dan Android dengan Selenium, Serenity BDD, Cucumber, Rest Assured, dan Appium dalam Java.',
  },
  {
    en: 'Now I build with Playwright and Bruno: a suite that tests this site in GitHub Actions and blocks the deploy when a test fails.',
    id: 'Sekarang saya membangun dengan Playwright dan Bruno: suite yang mengetes situs ini di GitHub Actions dan menahan deploy bila ada test yang gagal.',
  },
  {
    en: 'I work with AI agents under rules I write. An expected result comes from the test case, never from the app, and I review every change before it counts.',
    id: 'Saya bekerja dengan AI agent di bawah aturan yang saya tulis. Expected result berasal dari test case, bukan dari aplikasi, dan saya me-review setiap perubahan.',
  },
];

export const skillGroups: SkillGroup[] = [
  {
    icon: 'list',
    title: { en: 'Testing', id: 'Testing' },
    items: ['Test planning', 'Test case design', 'Manual testing (web & mobile)', 'Functional & regression', 'Exploratory testing', 'SIT & UAT', 'API testing', 'Defect management'],
  },
  {
    icon: 'workflow',
    title: { en: 'Automation', id: 'Automation' },
    items: ['Playwright', 'Bruno', 'UFT One', 'Selenium', 'Serenity BDD', 'Cucumber', 'Rest Assured', 'Appium'],
  },
  {
    icon: 'gauge',
    title: { en: 'Performance & monitoring', id: 'Performance & monitoring' },
    items: ['Performance testing', 'JMeter', 'Grafana'],
  },
  {
    icon: 'layers',
    title: { en: 'Tools', id: 'Tools' },
    items: ['Jira', 'Postman', 'Swagger', 'Git', 'GitHub Actions', 'IntelliJ IDEA'],
  },
  {
    icon: 'braces',
    title: { en: 'Languages & AI pair tools', id: 'Bahasa & AI pair tools' },
    items: ['Java', 'Python', 'SQL', 'Luau', 'Claude Code', 'GitHub Copilot'],
  },
  {
    icon: 'users',
    title: { en: 'Ways of working', id: 'Cara kerja' },
    items: ['Independent QA ownership', 'Requirement analysis', 'Business process validation', 'Working with dev and business teams', 'Writing rules for AI agents'],
  },
  {
    icon: 'game',
    title: { en: 'Game development', id: 'Pengembangan game' },
    items: ['Roblox Studio', 'Game direction', 'Game design', 'Feature planning', 'Gameplay systems & UI', 'Level design review', 'Playtesting & player feedback', 'Team coordination'],
    game: true,
  },
];

export const education: { name: string; detail: Localized; dates: string; kind: 'school' | 'cert' }[] = [
  {
    name: 'Tarumanagara University',
    detail: { en: 'Bachelor of Computer Science (S.Kom.), Jakarta', id: 'Sarjana Ilmu Komputer (S.Kom.), Jakarta' },
    dates: '2018 – 2022',
    kind: 'school',
  },
  {
    name: 'Alterra Academy',
    detail: { en: 'Quality Assurance Engineer Bootcamp (certification)', id: 'Bootcamp Quality Assurance Engineer (sertifikasi)' },
    dates: '2022',
    kind: 'cert',
  },
];

/** Total months in QA roles, from the experience list. */
export function qaMonths(now = new Date()): number {
  return experiences.reduce((sum, job) => {
    const [y1, m1] = job.start.split('-').map(Number);
    const [y2, m2] = job.end ? job.end.split('-').map(Number) : [now.getFullYear(), now.getMonth() + 1];
    return sum + (y2 - y1) * 12 + (m2 - m1) + 1;
  }, 0);
}

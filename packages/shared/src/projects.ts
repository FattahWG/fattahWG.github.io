import type { Localized } from './profile';

export interface TestCaseResult {
  id: string;
  title: string;
  status: 'passed' | 'failed' | 'skipped';
  durationMs: number;
}

export interface ProjectLink {
  label: Localized;
  url: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: Localized;
  description: Localized;
  url: string;
  image: string;
  stack: string[];
  features: Localized[];
  links: ProjectLink[];
  hasAutomation: boolean;
  /** Visitors can start this suite from the QA Lab. */
  runnable: boolean;
  caseStudy?: {
    strategy: Localized;
    automated: { title: Localized; why: Localized }[];
    notAutomated: { title: Localized; why: Localized }[];
    risks: Localized[];
  };
}

export interface Game {
  slug: string;
  name: string;
  url: string;
  text: Localized;
  chips: string[];
}

const DEMO = 'https://fattahwg.github.io/Automations-Test-Preset/';

export const links = {
  testDemo: DEMO,
  store: `${DEMO}store/`,
  dashboard: `${DEMO}dashboard/`,
  testRepo: 'https://github.com/FattahWG/Automations-Test-Preset',
  siteRepo: 'https://github.com/FattahWG/fattahWG.github.io',
  siteTests: 'https://github.com/FattahWG/fattahWG.github.io/tree/main/tests',
  report: '/qa-report/',
  apiReport: '/qa-report/api',
};

export const projects: Project[] = [
  {
    slug: 'lawak-store',
    name: 'Lawak Store',
    tagline: {
      en: 'A demo shop with an admin panel, covered by 50 test cases.',
      id: 'Toko demo dengan panel admin, dicakup 50 test case.',
    },
    description: {
      en: 'Shows the full QA flow on one product: test case, automated run, evidence, and report. The shop runs in the browser with a mock backend, so the suite never touches a production system.',
      id: 'Menunjukkan alur QA lengkap pada satu produk: test case, run otomatis, evidence, dan report. Toko berjalan di browser dengan backend tiruan, jadi suite ini tidak pernah menyentuh sistem production.',
    },
    url: links.store,
    image: '/assets/projects/lawak-store.webp',
    stack: ['Playwright', 'Bruno CLI', 'Python', 'GitHub Actions', 'Cloudflare Workers'],
    features: [
      {
        en: '50 cases: 41 Playwright UI cases and 9 Bruno CLI API cases',
        id: '50 case: 41 case UI Playwright dan 9 case API Bruno CLI',
      },
      {
        en: 'Smoke, Regression, and Full Cycle suites by phase, sprint, and module',
        id: 'Suite Smoke, Regression, dan Full Cycle per phase, sprint, dan modul',
      },
      {
        en: 'Each run makes a Word evidence document with a screenshot per step and updates the Excel test cases',
        id: 'Tiap run membuat dokumen evidence Word dengan screenshot per langkah dan memperbarui test case Excel',
      },
      {
        en: 'A test dashboard shows every run, and the QA Lab on this site runs the UI suite live',
        id: 'Test dashboard menampilkan setiap run, dan QA Lab di situs ini menjalankan suite UI secara live',
      },
    ],
    links: [
      { label: { en: 'Open the test demo', id: 'Buka test demo' }, url: links.testDemo },
      { label: { en: 'Test dashboard', id: 'Test dashboard' }, url: links.dashboard },
      { label: { en: 'View on GitHub', id: 'Lihat di GitHub' }, url: links.testRepo },
    ],
    hasAutomation: true,
    runnable: true,
    caseStudy: {
      strategy: {
        en: 'One JSON file is the single source of every test case: phases, sprints, modules, suites, steps, and expected results. The Playwright scripts, the Excel workbook, and the dashboard tags all come from it. There is one test per case ID and one step per case step, and every UI step keeps a screenshot as evidence. Every run starts from the seed data, and tests make their own data with the prefix qa-auto.',
        id: 'Satu file JSON menjadi sumber tunggal semua test case: phase, sprint, modul, suite, langkah, dan expected result. Skrip Playwright, workbook Excel, dan tag dashboard semuanya berasal dari file itu. Ada satu test per ID case dan satu step per langkah case, dan setiap langkah UI menyimpan screenshot sebagai evidence. Setiap run mulai dari data seed, dan test membuat datanya sendiri dengan prefix qa-auto.',
      },
      automated: [
        {
          title: { en: 'Storefront: sign in, catalog, cart, checkout, orders', id: 'Storefront: sign in, katalog, cart, checkout, order' },
          why: {
            en: 'Phase 1 is the path every customer takes. A break here stops every sale.',
            id: 'Phase 1 adalah jalur yang dilalui setiap pelanggan. Kalau rusak, semua penjualan berhenti.',
          },
        },
        {
          title: { en: 'Admin panel: products, orders, users, dashboard', id: 'Panel admin: produk, order, user, dashboard' },
          why: {
            en: 'Phase 2 holds the rules that protect data: roles, the order status flow, and stock.',
            id: 'Phase 2 berisi aturan yang menjaga data: role, alur status order, dan stok.',
          },
        },
        {
          title: { en: 'API rules with Bruno CLI', id: 'Aturan API dengan Bruno CLI' },
          why: {
            en: 'The same business rules are checked under the UI: wrong password, out of stock, declined card, invalid order transition, and admin access.',
            id: 'Aturan bisnis yang sama dicek di bawah UI: password salah, stok habis, kartu ditolak, transisi order yang tidak valid, dan akses admin.',
          },
        },
      ],
      notAutomated: [
        {
          title: { en: 'Real payments', id: 'Pembayaran sungguhan' },
          why: {
            en: 'The shop uses mock cards only. There is no real payment provider to test.',
            id: 'Toko hanya memakai kartu tiruan. Tidak ada penyedia pembayaran sungguhan untuk dites.',
          },
        },
        {
          title: { en: 'Production systems', id: 'Sistem production' },
          why: {
            en: 'Only the local demo server is a target. The suite never points at a production system.',
            id: 'Target hanya server demo lokal. Suite ini tidak pernah diarahkan ke sistem production.',
          },
        },
      ],
      risks: [
        {
          en: 'DEF-001 (planted on purpose): Checkout accepts a 4-digit postal code, but rule R-07 needs exactly 5 digits. TC-CHK-006 fails until the rule is fixed. The defect shows how a failure moves through the evidence document, the workbook, and the dashboard.',
          id: 'DEF-001 (sengaja ditanam): Checkout menerima kode pos 4 digit, padahal aturan R-07 meminta tepat 5 digit. TC-CHK-006 gagal sampai aturannya diperbaiki. Defect ini menunjukkan bagaimana kegagalan mengalir ke dokumen evidence, workbook, dan dashboard.',
        },
      ],
    },
  },
  {
    slug: 'portfolio-tests',
    name: 'Portfolio test suite',
    tagline: {
      en: 'This site is my test subject. A failing test stops the deploy.',
      id: 'Situs ini adalah objek test saya. Test yang gagal menahan deploy.',
    },
    description: {
      en: 'Checks the key visitor flows and quality rules before every deploy: smoke path, navigation, links, CV download, contact actions, phone layouts, accessibility, and HTTP status codes.',
      id: 'Mengecek alur utama pengunjung dan aturan kualitas sebelum setiap deploy: smoke path, navigasi, link, unduh CV, aksi kontak, layout HP, aksesibilitas, dan status code HTTP.',
    },
    url: links.report,
    image: '/assets/projects/portfolio.webp',
    stack: ['Playwright', 'Bruno', 'axe', 'GitHub Actions'],
    features: [
      { en: 'End-to-end with Playwright on desktop and mobile profiles', id: 'End-to-end dengan Playwright di profil desktop dan mobile' },
      { en: 'HTTP checks with Bruno: status codes, content types, and the 404 page', id: 'Cek HTTP dengan Bruno: status code, content type, dan halaman 404' },
      { en: 'Every page is scanned with axe for serious accessibility problems', id: 'Setiap halaman dipindai axe untuk masalah aksesibilitas yang serius' },
      { en: 'GitHub Actions runs every push and publishes the reports', id: 'GitHub Actions berjalan di setiap push dan menerbitkan report' },
    ],
    links: [
      { label: { en: 'Playwright report', id: 'Report Playwright' }, url: links.report },
      { label: { en: 'Bruno report', id: 'Report Bruno' }, url: links.apiReport },
      { label: { en: 'View the tests', id: 'Lihat test-nya' }, url: links.siteTests },
    ],
    hasAutomation: true,
    runnable: false,
  },
];

// Text comes from each game's Roblox page. Desa has no Roblox description yet.
export const games: Game[] = [
  {
    slug: 'ghost-expedition',
    name: 'Become a Ghost Expedition',
    url: 'https://www.roblox.com/games/106752039897178',
    text: {
      en: 'You wake up as a ghost and travel toward Eternal Rest through 20 checkpoints. Explore, get past obstacles, and stay hidden, alone or with friends.',
      id: 'Kamu bangun sebagai hantu dan berjalan menuju Eternal Rest lewat 20 checkpoint. Jelajahi, lewati rintangan, dan tetap tersembunyi, sendiri atau bersama teman.',
    },
    chips: ['20 checkpoints', 'Ghost cosmetics', 'Play with friends'],
  },
  {
    slug: 'lawak-obstacle',
    name: 'Lawak Obstacle',
    url: 'https://www.roblox.com/games/80126484885228',
    text: {
      en: 'A funny obstacle course full of silly challenges and surprise traps. Every checkpoint brings something new.',
      id: 'Obstacle course lucu penuh tantangan konyol dan jebakan kejutan. Setiap checkpoint membawa hal baru.',
    },
    chips: ['20+ stages', 'Comedy obby', 'Play with friends'],
  },
  {
    slug: 'gunung-lawak',
    name: 'Gunung Lawak',
    url: 'https://www.roblox.com/games/85931900901290',
    text: {
      en: 'A mountain-climbing semi-obby built around summit progression, exploration, and atmosphere. It runs seasonal events, such as an Indonesian Independence Day (HUT RI) theme.',
      id: 'Semi-obby mendaki gunung yang berfokus pada progres ke puncak, eksplorasi, dan suasana. Ada event musiman, misalnya tema HUT RI.',
    },
    chips: ['Semi-obby', 'Exploration', 'Seasonal events'],
  },
  {
    slug: 'desa',
    name: 'Desa [Voice Chat]',
    url: 'https://www.roblox.com/games/76972443812143',
    text: {
      en: 'A village hangout with voice chat, where players take jobs, fish, and farm together.',
      id: 'Tempat nongkrong desa dengan voice chat, tempat pemain bekerja, memancing, dan bertani bersama.',
    },
    chips: ['Hangout', 'Voice chat', 'Village life'],
  },
];

export const studioDuties: Localized[] = [
  { en: 'Start game ideas, and set the direction and the player experience', id: 'Memulai ide game, dan menentukan arah serta pengalaman pemain' },
  { en: 'Plan game design and features', id: 'Merencanakan desain game dan fitur' },
  { en: 'Coordinate our programmers, level designers, and 3D artists', id: 'Mengoordinasi programmer, level designer, dan 3D artist kami' },
  { en: 'Build gameplay systems and UI flow hands-on in Luau, such as interaction and carry systems', id: 'Membangun sistem gameplay dan alur UI langsung dengan Luau, misalnya sistem interaksi dan carry' },
  { en: 'Review gameplay flow and level design', id: 'Me-review alur gameplay dan level design' },
  { en: 'Run playtests and iterate on player feedback', id: 'Menjalankan playtest dan memperbaiki dari feedback pemain' },
];

/**
 * The last recorded full run of the Lawak Store UI suite (local, Microsoft Edge, 2026-10-12).
 * The QA Lab shows it until the live runner has its own history.
 */
export const latestRun = {
  project: 'lawak-store',
  date: '2026-10-12',
  source: 'local' as 'local' | 'github-actions',
  tests: [
    { id: 'TC-AUTH-001', title: 'Sign in with the demo admin account', status: 'passed', durationMs: 841 },
    { id: 'TC-AUTH-002', title: 'Wrong password shows an error', status: 'passed', durationMs: 744 },
    { id: 'TC-AUTH-003', title: 'Invalid email format is rejected', status: 'passed', durationMs: 791 },
    { id: 'TC-AUTH-004', title: 'Disabled account cannot sign in', status: 'passed', durationMs: 736 },
    { id: 'TC-AUTH-005', title: 'Register a new customer account', status: 'passed', durationMs: 1127 },
    { id: 'TC-AUTH-006', title: 'Register with an existing email is rejected', status: 'passed', durationMs: 875 },
    { id: 'TC-AUTH-007', title: 'Weak password is rejected', status: 'passed', durationMs: 965 },
    { id: 'TC-AUTH-008', title: 'Sign out ends the session', status: 'passed', durationMs: 1217 },
    { id: 'TC-AUTH-009', title: 'A protected page asks for sign in, then returns to it', status: 'passed', durationMs: 783 },
    { id: 'TC-CAT-001', title: 'Shop lists all active products and hides drafts', status: 'passed', durationMs: 810 },
    { id: 'TC-CAT-002', title: 'Search finds a product by name', status: 'passed', durationMs: 684 },
    { id: 'TC-CAT-003', title: 'Category filter shows only that category', status: 'passed', durationMs: 740 },
    { id: 'TC-CAT-004', title: 'Sort by price from low to high', status: 'passed', durationMs: 759 },
    { id: 'TC-CAT-005', title: 'Search with no result shows an empty state', status: 'passed', durationMs: 579 },
    { id: 'TC-CAT-006', title: 'Product detail shows the price and stock', status: 'passed', durationMs: 731 },
    { id: 'TC-CAT-007', title: 'Out-of-stock product cannot be added to the cart', status: 'passed', durationMs: 726 },
    { id: 'TC-CART-001', title: 'Add a product to the cart', status: 'passed', durationMs: 900 },
    { id: 'TC-CART-002', title: 'Changing the quantity updates the totals', status: 'passed', durationMs: 947 },
    { id: 'TC-CART-003', title: 'Shipping is free from Rp 300.000', status: 'passed', durationMs: 738 },
    { id: 'TC-CART-004', title: 'Removing the last item shows an empty cart', status: 'passed', durationMs: 812 },
    { id: 'TC-CART-005', title: 'Quantity limit of 10 is enforced', status: 'passed', durationMs: 916 },
    { id: 'TC-CHK-001', title: 'Checkout with the test card creates an order', status: 'passed', durationMs: 1209 },
    { id: 'TC-CHK-002', title: 'Empty required fields are reported', status: 'passed', durationMs: 1015 },
    { id: 'TC-CHK-003', title: 'Declined card shows a payment error', status: 'passed', durationMs: 1239 },
    { id: 'TC-CHK-004', title: 'Invalid card number is rejected', status: 'passed', durationMs: 1177 },
    { id: 'TC-CHK-005', title: 'Expired card is rejected', status: 'passed', durationMs: 1294 },
    { id: 'TC-CHK-006', title: 'Postal code must have exactly 5 digits', status: 'failed', durationMs: 8551 },
    { id: 'TC-ORD-001', title: 'A new order shows in My orders', status: 'passed', durationMs: 2009 },
    { id: 'TC-ORD-002', title: "A customer cannot open another customer's order", status: 'passed', durationMs: 1025 },
    { id: 'TC-PRD-001', title: 'Admin creates a product', status: 'passed', durationMs: 1501 },
    { id: 'TC-PRD-002', title: 'Admin edits a product price', status: 'passed', durationMs: 1036 },
    { id: 'TC-PRD-003', title: 'Admin deletes a product', status: 'passed', durationMs: 867 },
    { id: 'TC-PRD-004', title: 'Product form rejects invalid data', status: 'passed', durationMs: 1062 },
    { id: 'TC-PRD-005', title: 'A draft product is hidden from the shop', status: 'passed', durationMs: 1205 },
    { id: 'TC-AOR-001', title: 'A new customer order shows in admin Orders', status: 'passed', durationMs: 1834 },
    { id: 'TC-AOR-002', title: 'Admin moves an order from Paid to Processing', status: 'passed', durationMs: 1090 },
    { id: 'TC-AOR-003', title: 'Cancelling an order puts the stock back', status: 'passed', durationMs: 1403 },
    { id: 'TC-USR-001', title: 'A customer cannot open admin pages', status: 'passed', durationMs: 954 },
    { id: 'TC-USR-002', title: 'A disabled customer cannot sign in', status: 'passed', durationMs: 1354 },
    { id: 'TC-USR-003', title: 'Admin cannot change their own role or status', status: 'passed', durationMs: 750 },
    { id: 'TC-DSH-001', title: 'Admin dashboard shows the KPIs', status: 'passed', durationMs: 783 },
  ] satisfies TestCaseResult[],
  steps: [
    { image: '/assets/lab/step-sign-in.webp', label: { en: 'TC-AUTH-001: sign in with the demo admin account', id: 'TC-AUTH-001: sign in dengan akun admin demo' } },
    { image: '/assets/lab/step-cart.webp', label: { en: 'TC-CART-001: "Added to cart." and the cart count is 1', id: 'TC-CART-001: "Added to cart." dan jumlah cart 1' } },
    { image: '/assets/lab/step-checkout.webp', label: { en: 'TC-CHK-001: pay with the test card 4242 4242 4242 4242', id: 'TC-CHK-001: bayar dengan kartu test 4242 4242 4242 4242' } },
    { image: '/assets/lab/step-def-001.webp', label: { en: 'TC-CHK-006: a 4-digit postal code is accepted (DEF-001)', id: 'TC-CHK-006: kode pos 4 digit diterima (DEF-001)' } },
    { image: '/assets/lab/step-admin-order.webp', label: { en: 'TC-AOR-002: admin moves the order from Paid to Processing', id: 'TC-AOR-002: admin memindahkan order dari Paid ke Processing' } },
  ] satisfies { image: string; label: Localized }[],
};

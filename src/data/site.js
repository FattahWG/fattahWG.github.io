export const LINKS = {
  email: "off.fattah@gmail.com",
  github: "https://github.com/FattahWG",
  linkedin: "https://www.linkedin.com/in/fattahwg/",
  tiktok: "https://www.tiktok.com/@BedulDah",
  roblox: "https://www.roblox.com/users/8192435910/profile",
  discord: "https://discord.gg/WujZkWJ3uz",
  group: "https://www.roblox.com/communities/510724970/Lawak-Gamehouse",
  preset: "https://github.com/FattahWG/Automations-Test-Preset",
  repo: "https://github.com/FattahWG/fattahWG.github.io",
  tests: "https://github.com/FattahWG/fattahWG.github.io/tree/main/tests",
  ci: "https://github.com/FattahWG/fattahWG.github.io/actions/workflows/deploy.yml",
  report: "/qa-report/",
  apiReport: "/qa-report/api",
  cv: "/assets/cv/Fattah-Widjaya-Gandhi-CV.pdf",
};

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

// Chips with an entry here render as links to the official site.
export const TOOL_LINKS = {
  Jira: "https://www.atlassian.com/software/jira",
  JMeter: "https://jmeter.apache.org/",
  Bruno: "https://www.usebruno.com/",
  "Bruno CLI": "https://docs.usebruno.com/bru-cli/overview",
  Playwright: "https://playwright.dev/",
  "GitHub Actions": "https://github.com/features/actions",
  axe: "https://github.com/dequelabs/axe-core",
  "Roblox Studio": "https://create.roblox.com/docs/studio",
  Luau: "https://luau.org/",
  Python: "https://www.python.org/",
  Java: "https://dev.java/",
  "Claude Code": "https://www.anthropic.com/claude-code",
  "GitHub Copilot": "https://github.com/features/copilot",
  Selenium: "https://www.selenium.dev/",
  "Serenity BDD": "https://serenity-bdd.info/",
  Cucumber: "https://cucumber.io/",
  "Rest Assured": "https://rest-assured.io/",
  Appium: "https://appium.io/",
  Grafana: "https://grafana.com/",
  Postman: "https://www.postman.com/",
  Swagger: "https://swagger.io/",
  Git: "https://git-scm.com/",
  "IntelliJ IDEA": "https://www.jetbrains.com/idea/",
};

// Text comes from each game's Roblox page. Desa has no Roblox description yet.
export const GAMES = [
  {
    slug: "ghost-expedition",
    name: "Become a Ghost Expedition",
    url: "https://www.roblox.com/games/106752039897178",
    text: "You wake up as a ghost and travel toward Eternal Rest through 20 checkpoints. Explore, get past obstacles, and stay hidden, alone or with friends.",
    chips: ["20 checkpoints", "Ghost cosmetics", "Play with friends"],
  },
  {
    slug: "lawak-obstacle",
    name: "Lawak Obstacle",
    url: "https://www.roblox.com/games/80126484885228",
    text: "A funny obstacle course full of silly challenges and surprise traps. Every checkpoint brings something new.",
    chips: ["20+ stages", "Comedy obby", "Play with friends"],
  },
  {
    slug: "gunung-lawak",
    name: "Gunung Lawak",
    url: "https://www.roblox.com/games/85931900901290",
    text: "A mountain-climbing semi-obby built around summit progression, exploration, and atmosphere. It runs seasonal events, such as an Indonesian Independence Day (HUT RI) theme.",
    chips: ["Semi-obby", "Exploration", "Seasonal events"],
  },
  {
    slug: "desa",
    name: "Desa [Voice Chat]",
    url: "https://www.roblox.com/games/76972443812143",
    text: "A village hangout with voice chat, where players take jobs, fish, and farm together.",
    chips: ["Hangout", "Voice chat", "Village life"],
  },
];

export const CAREER_SUMMARY =
  "2.5+ years testing banking, insurance, and enterprise applications, as the independent tester on projects and as part of QA teams.";

export const EXPERIENCE = [
  {
    company: "Astragraphia Information Technology",
    title: "QA Software Engineer",
    dates: "Oct 2025 – Present",
    current: true,
    projects: [
      {
        name: "Manulife Insurance – EBClick",
        dates: "Apr 2026 – Present",
        domain: "Insurance web applications and their business workflows.",
        items: [
          "Own QA as the independent tester, from test planning and test case design to execution and defect validation.",
          "Run API testing, SIT, UAT support, and regression testing.",
          "Check stability and response times under different workloads with JMeter performance tests.",
          "Track defects in Jira, and work directly with business analysts, developers, and stakeholders to support release delivery.",
        ],
      },
      {
        name: "Toyota Astra Motor (TAM) – Employee Self-Service",
        dates: "Oct 2025 – Apr 2026",
        domain: "An ESS platform that connects attendance, employee claims, company news, and employee services.",
        items: [
          "Created and ran test cases, with SIT, UAT, regression, and exploratory testing across the business modules.",
          "Built and maintained automation test scripts with UFT One.",
          "Monitored API performance in Grafana: response times, concurrent users, and peak activity.",
        ],
      },
    ],
  },
  {
    company: "Nawa Data Solutions",
    title: "Quality Assurance Engineer",
    dates: "Feb 2023 – Aug 2024",
    current: false,
    projects: [
      {
        name: "Client: CIMB Niaga – Banking E-Procurement System",
        dates: "",
        domain: "Procurement from vendor management to payment: purchase requests and orders, tenders, approvals, budgets, contracts, and invoices.",
        items: [
          "Created and maintained test cases across the e-procurement modules.",
          "Validated end-to-end procurement flows with multi-level approvals and business rules through SIT, regression, and exploratory testing.",
          "Analyzed requirements with business analysts and developers, and tracked and verified defects in Jira.",
        ],
      },
    ],
  },
];

export const EDUCATION = [
  { name: "Tarumanagara University", detail: "Bachelor of Computer Science (S.Kom.), Jakarta", dates: "2018 – 2022" },
  { name: "Alterra Academy", detail: "Quality Assurance Engineer Bootcamp (certification)", dates: "2022" },
];

export const GAME_ITEMS = [
  "Start game ideas, and set the direction and the player experience",
  "Plan game design and features",
  "Coordinate our programmers, level designers, and 3D artists",
  "Build gameplay systems and UI flow hands-on in Luau, such as interaction and carry systems",
  "Review gameplay flow and level design",
  "Run playtests and iterate on player feedback",
];

export const SKILLS = [
  { icon: "i-list-checks", title: "Testing", game: false,
    items: ["Test planning", "Test case design", "Manual testing (web & mobile)", "Functional & regression", "Exploratory testing", "SIT & UAT", "API testing", "Defect management"] },
  { icon: "i-workflow", title: "Automation", game: false,
    items: ["Playwright", "Bruno", "UFT One", "Selenium", "Serenity BDD", "Cucumber", "Rest Assured", "Appium"] },
  { icon: "i-gauge", title: "Performance & monitoring", game: false,
    items: ["Performance testing", "JMeter", "Grafana"] },
  { icon: "i-layers", title: "Tools", game: false,
    items: ["Jira", "Postman", "Swagger", "Git", "GitHub Actions", "IntelliJ IDEA"] },
  { icon: "i-bot", title: "Languages & AI pair tools", game: false,
    items: ["Java", "Python", "SQL", "Luau", "Claude Code", "GitHub Copilot"] },
  { icon: "i-users", title: "Ways of working", game: false,
    items: ["Independent QA ownership", "Requirement analysis", "Business process validation", "Working with dev and business teams", "Writing rules for AI agents"] },
  { icon: "i-gamepad-2", title: "Game development", game: true,
    items: ["Roblox Studio", "Game direction", "Game design", "Feature planning", "Gameplay systems & UI", "Level design review", "Playtesting & player feedback", "Team coordination"] },
];

export const FOCUS = [
  { icon: "i-workflow", title: "Test automation in CI", text: "Growing the Playwright and Bruno suite that checks this site on every deploy.", game: false },
  { icon: "i-bot", title: "Working with AI agents", text: "Writing clear rules for Claude Code and GitHub Copilot, so they take the repetitive work while I keep the test decisions.", game: false },
  { icon: "i-gamepad-2", title: "Gameplay systems", text: "Building gameplay systems and UI in Roblox Studio with Luau.", game: true },
  { icon: "i-repeat", title: "Playtest and iterate", text: "Improving our games through playtesting and player feedback.", game: true },
];

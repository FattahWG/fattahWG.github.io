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

export const QA_ITEMS = [
  "Own QA on projects as the independent tester, from test case design through SIT, UAT, and regression cycles",
  "Test web and mobile applications by hand, with functional and regression coverage",
  "Test APIs directly, and automate API checks with Bruno",
  "Build and maintain UI test automation with Playwright",
  "Report and follow up bugs in Jira, and coordinate testing with development and business teams",
  "Work alongside AI agents (Claude Code, GitHub Copilot) under rules I write, so they speed up repetitive work without changing what we test",
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
    items: ["Manual testing (web & mobile)", "Functional testing", "Regression testing", "SIT", "UAT", "API testing"] },
  { icon: "i-workflow", title: "Automation & tools", game: false,
    items: ["Playwright", "Bruno", "JMeter", "Jira", "GitHub Actions", "Test automation", "API automation"] },
  { icon: "i-bot", title: "Languages & AI pair tools", game: false,
    items: ["Python", "Java", "Luau", "Claude Code", "GitHub Copilot"] },
  { icon: "i-users", title: "Ways of working", game: false,
    items: ["Independent QA ownership", "Working with dev and business teams", "Writing rules for AI agents"] },
  { icon: "i-gamepad-2", title: "Game development", game: true,
    items: ["Roblox Studio", "Game direction", "Game design", "Feature planning", "Gameplay systems & UI", "Level design review", "Playtesting & player feedback", "Team coordination"] },
];

export const FOCUS = [
  { icon: "i-workflow", title: "Test automation in CI", text: "Growing the Playwright and Bruno suite that checks this site on every deploy.", game: false },
  { icon: "i-bot", title: "Working with AI agents", text: "Writing clear rules for Claude Code and GitHub Copilot, so they take the repetitive work while I keep the test decisions.", game: false },
  { icon: "i-gamepad-2", title: "Gameplay systems", text: "Building gameplay systems and UI in Roblox Studio with Luau.", game: true },
  { icon: "i-repeat", title: "Playtest and iterate", text: "Improving our games through playtesting and player feedback.", game: true },
];

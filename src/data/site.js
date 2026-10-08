export const LINKS = {
  email: "off.fattah@gmail.com",
  github: "https://github.com/FattahWG",
  linkedin: "https://www.linkedin.com/in/fattahwg/",
  tiktok: "https://www.tiktok.com/@BedulDah",
  roblox: "https://www.roblox.com/users/8192435910/profile",
  discord: "https://discord.gg/WujZkWJ3uz",
  group: "https://www.roblox.com/communities/510724970/Lawak-Gamehouse",
  preset: "https://github.com/FattahWG/Automations-Test-Preset",
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
  "Roblox Studio (learning)": "https://create.roblox.com/docs/studio",
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
  "Manual testing for web and mobile applications",
  "Functional, regression, SIT, and UAT testing",
  "API testing",
  "Building and maintaining test automation",
  "API automation testing",
  "AI-assisted tools for test efficiency, coverage, and analysis",
  "Working independently as QA on projects",
  "Coordinating testing with development and business requirements",
];

export const GAME_ITEMS = [
  "Starting and developing game ideas",
  "Defining game direction and the overall player experience",
  "Game design and feature planning",
  "Coordinating the development team",
  "Reviewing gameplay flow and level design",
  "Working with programmers, level designers, and 3D artists",
  "Iterating through playtesting and player feedback",
  "Learning Roblox Studio and game development workflows",
];

export const SKILLS = [
  { icon: "i-list-checks", title: "Testing", game: false,
    items: ["Manual testing (web & mobile)", "Functional testing", "Regression testing", "SIT", "UAT", "API testing"] },
  { icon: "i-workflow", title: "Automation & tools", game: false,
    items: ["Test automation", "API automation", "Playwright", "Bruno", "Jira", "JMeter", "AI-assisted QA"] },
  { icon: "i-users", title: "Ways of working", game: false,
    items: ["Independent QA ownership", "Working with dev and business teams", "Test coverage & analysis"] },
  { icon: "i-gamepad-2", title: "Game development", game: true,
    items: ["Game direction", "Game design", "Feature planning", "Gameplay flow & level design review", "Playtesting & player feedback", "Team coordination", "Roblox Studio (learning)"] },
];

export const FOCUS = [
  { icon: "i-workflow", title: "Test automation", text: "Building and maintaining UI and API automation with Playwright and Bruno.", game: false },
  { icon: "i-bot", title: "AI-assisted QA", text: "Using AI tools to speed up repetitive QA work and to improve test coverage and analysis.", game: false },
  { icon: "i-gamepad-2", title: "Roblox Studio", text: "Learning Roblox Studio and game development workflows, one project at a time.", game: true },
  { icon: "i-repeat", title: "Playtest and iterate", text: "Improving our games through playtesting and player feedback.", game: true },
];

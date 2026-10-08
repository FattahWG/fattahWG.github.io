import { defineConfig, devices } from '@playwright/test';

const CI = !!process.env.CI;
const PORT = 4321;
// Locally use the installed Microsoft Edge; CI uses the Chromium that Playwright installs.
const channel = CI ? undefined : 'msedge';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: CI,
  retries: CI ? 1 : 0,
  workers: CI ? 2 : undefined,
  reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]],
  use: {
    baseURL: process.env.BASE_URL ?? `http://127.0.0.1:${PORT}`,
    trace: CI ? 'on-first-retry' : 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  // Tests run against the production build. Run `npm run build` first.
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: `npx astro preview --host 127.0.0.1 --port ${PORT}`,
        url: `http://127.0.0.1:${PORT}`,
        reuseExistingServer: !CI,
        timeout: 60_000,
      },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], channel, permissions: ['clipboard-read', 'clipboard-write'] },
    },
    {
      name: 'mobile',
      use: { ...devices['Pixel 7'], channel, permissions: ['clipboard-read', 'clipboard-write'] },
    },
  ],
});

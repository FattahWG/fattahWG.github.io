import { expect, type Page } from '@playwright/test';

export const PAGES = [
  { path: '/', heading: "Hi, I'm Fattah.", name: 'Home' },
  { path: '/lab', heading: 'Watch the tests run.', name: 'QA Lab' },
  { path: '/projects/lawak-store', heading: 'Lawak Store', name: 'Lawak Store' },
  { path: '/projects/portfolio-tests', heading: 'Portfolio test suite', name: 'Portfolio tests' },
] as const;

// Page URLs of the earlier site. Each one now opens the home page at its section.
export const OLD_URLS = [
  { path: '/about', section: 'about' },
  { path: '/experience', section: 'experience' },
  { path: '/projects', section: 'projects' },
  { path: '/contact', section: 'contact' },
] as const;

/** Below 1024 px the links hide behind the menu button. */
export const isCompact = (page: Page) => (page.viewportSize()?.width ?? 1280) < 1024;
export const isMobile = (page: Page) => (page.viewportSize()?.width ?? 1280) < 640;

/** Returns the visible list of site links: the bar on desktop, the opened menu on smaller screens. */
export async function openNav(page: Page) {
  if (isCompact(page)) {
    await page.getByRole('button', { name: 'Menu' }).click();
    const menu = page.locator('#mobile-nav');
    await expect(menu).toBeVisible();
    return menu;
  }
  return page.getByRole('navigation', { name: 'Main' });
}

/** The QA Lab shows the recorded sample run only when the live history is empty. Tests must not depend on live runs. */
export async function emptyRunHistory(page: Page): Promise<void> {
  await page.route(/\/api\/runs\?/, (route) => route.fulfill({ json: { runs: [] } }));
}

import { test, expect } from '@playwright/test';
import { LINKS } from '../../src/data/site.js';
import { PAGES, isMobile, openNav } from './support';

test.describe('Navigation', () => {
  for (const p of PAGES) {
    test(`TC-NAV-001 ${p.nav} opens at a clean URL with its heading and active nav link`, { tag: '@smoke' }, async ({ page }) => {
      const res = await page.goto(p.path);
      expect(res?.status(), `GET ${p.path}`).toBe(200);
      await expect(page.getByRole('heading', { level: 1 })).toContainText(p.heading);
      const nav = await openNav(page);
      await expect(nav.getByRole('link', { name: p.nav })).toHaveAttribute('aria-current', 'page');
    });
  }

  test('TC-NAV-002 No internal link points at a .html file', async ({ page }) => {
    for (const p of PAGES) {
      await page.goto(p.path);
      const hrefs = await page.locator('a[href^="/"]').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
      expect(hrefs.filter((h) => h?.includes('.html')), `.html links on ${p.path}`).toEqual([]);
    }
  });

  test('TC-NAV-003 An unknown URL shows the 404 page with a way home', async ({ page }) => {
    const res = await page.goto('/this-page-does-not-exist');
    expect(res?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('This page does not exist');
    await page.getByRole('link', { name: 'Go home' }).click();
    await expect(page).toHaveURL(/\/$/);
  });

  test('TC-NAV-004 Phone menu opens, closes with Escape, and returns focus', async ({ page }) => {
    test.skip(!isMobile(page), 'The menu button only exists on phone layouts.');
    await page.goto('/');
    const button = page.getByRole('button', { name: 'Open menu' });
    const nav = page.getByRole('navigation', { name: 'Main' });
    await expect(nav).toBeHidden();
    await button.click();
    await expect(nav).toBeVisible();
    await expect(page.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape');
    await expect(nav).toBeHidden();
    await expect(button).toBeFocused();
  });

  test('TC-NAV-005 Skip link moves focus to the main content', async ({ page }) => {
    test.skip(isMobile(page), 'Keyboard navigation is a desktop check.');
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Skip to content' });
    await expect(skip).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#main$/);
  });

  test('TC-NAV-006 Test Demo in the menu links to the live Lawak Store showcase', { tag: '@smoke' }, async ({ page, request }) => {
    await page.goto('/');
    const nav = await openNav(page);
    const demo = nav.getByRole('link', { name: 'Test Demo' });
    await expect(demo).toHaveAttribute('href', LINKS.showcase);
    await expect(demo).not.toHaveAttribute('aria-current', 'page');
    const res = await request.get(LINKS.showcase);
    expect(res.status(), `GET ${LINKS.showcase}`).toBe(200);
  });

  test('TC-NAV-007 Sidebar links to the Lawak Store and the test dashboard, and collapses on desktop', async ({ page }) => {
    await page.goto('/');
    const nav = await openNav(page);
    await expect(nav.getByRole('link', { name: 'Lawak Store' })).toHaveAttribute('href', LINKS.showcaseStore);
    await expect(nav.getByRole('link', { name: 'Test Dashboard' })).toHaveAttribute('href', LINKS.showcaseDashboard);
    if (isMobile(page)) return;
    const collapse = page.getByRole('button', { name: 'Collapse sidebar' });
    await collapse.click();
    await expect(collapse).toHaveAttribute('aria-pressed', 'true');
    await page.reload();
    await expect(page.getByRole('button', { name: 'Collapse sidebar' })).toHaveAttribute('aria-pressed', 'true');
    await expect(nav.getByRole('link', { name: 'Home' })).toBeVisible();
  });
});

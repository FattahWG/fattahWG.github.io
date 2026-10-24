import { test, expect } from '@playwright/test';
import { OLD_URLS, PAGES, isCompact, openNav } from './support';

test.describe('Navigation', () => {
  for (const p of PAGES) {
    test(`TC-NAV-001 ${p.name} opens at a clean URL with its heading`, { tag: '@smoke' }, async ({ page }) => {
      const res = await page.goto(p.path);
      expect(res?.status(), `GET ${p.path}`).toBe(200);
      await expect(page.getByRole('heading', { level: 1 })).toContainText(p.heading);
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
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Test failed: page not found');
    await page.getByRole('link', { name: 'Back to home' }).click();
    await expect(page).toHaveURL(/\/$/);
  });

  test('TC-NAV-004 The menu opens on small screens and closes after a link', async ({ page }) => {
    test.skip(!isCompact(page), 'The menu button only exists below 1024 px.');
    await page.goto('/');
    const button = page.getByRole('button', { name: 'Menu' });
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    const menu = await openNav(page);
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    await menu.getByRole('link', { name: 'Projects' }).click();
    await expect(menu).toBeHidden();
    await expect(page).toHaveURL(/\/#projects$/);
  });

  test('TC-NAV-005 Skip link moves focus to the main content', async ({ page }) => {
    test.skip(isCompact(page), 'Keyboard navigation is a desktop check.');
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Skip to content' });
    await expect(skip).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#main$/);
  });

  for (const old of OLD_URLS) {
    test(`TC-NAV-006 Old URL ${old.path} still works and opens its section`, async ({ page }) => {
      const res = await page.goto(old.path);
      expect(res?.status(), `GET ${old.path}`).toBe(200);
      await expect(page.locator(`#${old.section}`)).toBeInViewport();
    });
  }

  test('TC-NAV-007 The language switch changes the page to Indonesian and keeps the choice', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('group', { name: 'Language' }).getByRole('button', { name: 'id' }).click();
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Halo, saya Fattah.');
    await expect(page.locator('html')).toHaveAttribute('lang', 'id');
    await page.reload();
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Halo, saya Fattah.');
  });

  test('TC-NAV-008 The theme switch changes to dark and keeps the choice', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');
    await expect(page.locator('html')).not.toHaveClass(/\bdark\b/);
    await page.getByRole('button', { name: 'Switch to dark theme' }).click();
    await expect(page.locator('html')).toHaveClass(/\bdark\b/);
    await page.reload();
    await expect(page.locator('html')).toHaveClass(/\bdark\b/);
    await expect(page.getByRole('button', { name: 'Switch to light theme' })).toBeVisible();
  });
});

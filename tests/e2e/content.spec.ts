import { test, expect } from '@playwright/test';
import { education, experiences, profile } from '../../packages/shared/src/profile';
import { games, latestRun, links } from '../../packages/shared/src/projects';
import { emptyRunHistory, PAGES } from './support';

test.describe('Content and links', () => {
  test('TC-CNT-002 Every game card links to its own Roblox game page', async ({ page }) => {
    await page.goto('/');
    for (const game of games) {
      const card = page.locator(`#${game.slug}`);
      await expect(card.getByRole('heading', { name: game.name })).toBeAttached();
      const play = card.getByRole('link', { name: 'Play on Roblox' });
      await expect(play).toHaveAttribute('href', game.url);
      await expect(play).toHaveAttribute('href', /^https:\/\/www\.roblox\.com\/games\/\d+$/);
      await expect(play).toHaveAttribute('rel', /noopener/);
    }
  });

  test('TC-CNT-003 Contact links reach the right accounts', async ({ page }) => {
    await page.goto('/#contact');
    const contact = page.locator('#contact');
    await expect(contact.getByRole('link', { name: 'Email me' })).toHaveAttribute('href', `mailto:${profile.email}`);
    for (const [name, href] of [
      ['LinkedIn', profile.linkedin],
      ['GitHub', profile.github],
      ['TikTok', profile.tiktok],
      ['Discord', profile.discord],
      ['Roblox', profile.roblox],
    ] as const) {
      await expect(contact.getByRole('link', { name, exact: true }), name).toHaveAttribute('href', href);
    }
  });

  test('TC-CNT-004 Every page has a title, a description, and a canonical URL without .html', async ({ page }) => {
    for (const p of PAGES) {
      await page.goto(p.path);
      await expect(page).toHaveTitle(/Fattah Widjaya Gandhi/);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{20,}/);
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical, `canonical on ${p.path}`).toBe(`https://fattahwg.github.io${p.path}`);
    }
  });

  test('TC-CNT-006 Download CV saves the PDF', async ({ page }) => {
    await page.goto('/');
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.getByRole('link', { name: 'Download CV' }).first().click(),
    ]);
    expect(download.suggestedFilename()).toBe('CV-Fattah Widjaya Gandhi.pdf');
    const file = await download.path();
    const fs = await import('node:fs');
    const head = fs.readFileSync(file).subarray(0, 5).toString('latin1');
    expect(head, 'PDF signature').toBe('%PDF-');
    expect(fs.statSync(file).size, 'PDF size in bytes').toBeGreaterThan(20_000);
  });

  test('TC-CNT-007 Experience shows every employer, title, and project from the CV', async ({ page }) => {
    await page.goto('/#experience');
    const section = page.locator('#experience');
    for (const job of experiences) {
      const card = section.locator('article', { hasText: job.company });
      await expect(card, job.company).toBeAttached();
      await expect(card.getByRole('heading', { level: 3 })).toHaveText(job.role);
      for (const project of job.projects) {
        await expect(card.getByRole('heading', { name: project.name }), project.name).toBeAttached();
      }
    }
    for (const item of education) {
      await expect(page.locator('#education').getByText(item.name), item.name).toBeAttached();
    }
  });

  test('TC-CNT-008 No page shows an unfilled placeholder, in English or Indonesian', async ({ page }) => {
    for (const lang of ['en', 'id']) {
      await page.addInitScript((l) => localStorage.setItem('lang', l), lang);
      for (const p of PAGES) {
        await page.goto(p.path);
        await expect(page.locator('html')).toHaveAttribute('lang', lang);
        await expect(page.locator('body'), `${p.path} (${lang})`).not.toContainText(/\{\{|TODO|undefined|\[object Object\]/);
      }
    }
  });

  test('TC-CNT-009 The Lawak Store page links to the live demo, its dashboard, and the repository', async ({ page }) => {
    await page.goto('/projects/lawak-store');
    await expect(page.getByRole('link', { name: 'Open the test demo' })).toHaveAttribute('href', links.testDemo);
    await expect(page.getByRole('link', { name: 'Test dashboard' })).toHaveAttribute('href', links.dashboard);
    await expect(page.getByRole('link', { name: 'View on GitHub' })).toHaveAttribute('href', links.testRepo);
    await expect(page.getByRole('link', { name: 'Open QA Lab' }).first()).toHaveAttribute('href', '/lab');
  });

  test('TC-CNT-010 The QA Lab shows the recorded run and names the planted defect', { tag: '@smoke' }, async ({ page }) => {
    await emptyRunHistory(page);
    await page.goto('/lab');
    const failed = latestRun.tests.filter((t) => t.status === 'failed');
    await expect(page.getByText(`${latestRun.tests.length - failed.length}/${latestRun.tests.length} passed`)).toBeVisible();
    for (const t of failed) await expect(page.getByText(t.id, { exact: true }).first()).toBeAttached();
    await expect(page.getByText(/DEF-001 is planted on purpose/)).toBeVisible();
    // Step gallery: next moves to step 2.
    await page.getByRole('button', { name: 'Next step' }).click();
    await expect(page.getByText(`02 / ${String(latestRun.steps.length).padStart(2, '0')}`)).toBeVisible();
  });

  test('TC-CNT-011 The studio video and every image on the home page load', async ({ page, request }) => {
    await page.goto('/');
    const urls = await page.evaluate(() => [
      ...Array.from(document.images, (img) => img.getAttribute('src')),
      ...Array.from(document.querySelectorAll('video source'), (s) => s.getAttribute('src')),
      ...Array.from(document.querySelectorAll('video'), (v) => v.getAttribute('poster')),
    ]);
    for (const url of new Set(urls.filter(Boolean))) {
      const res = await request.head(url!);
      expect(res.status(), `HEAD ${url}`).toBe(200);
    }
  });
});

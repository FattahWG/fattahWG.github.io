import { test, expect } from '@playwright/test';
import { EDUCATION, EXPERIENCE, GAMES, LINKS, TOOL_LINKS } from '../../src/data/site.js';
import { PAGES } from './support';

test.describe('Content and links', () => {
  test('TC-CNT-001 Tool chips on Experience link to the official sites in a new tab', async ({ page }) => {
    await page.goto('/experience');
    for (const [tool, url] of Object.entries(TOOL_LINKS)) {
      const chips = page.getByRole('link', { name: `${tool} official site (opens in a new tab)` });
      const count = await chips.count();
      for (let i = 0; i < count; i++) {
        await expect(chips.nth(i), `${tool} chip`).toHaveAttribute('href', url);
        await expect(chips.nth(i)).toHaveAttribute('target', '_blank');
        await expect(chips.nth(i)).toHaveAttribute('rel', /noopener/);
      }
    }
    // Plain chips are not links, so they must not offer a text cursor.
    const plain = page.locator('span.chip').first();
    await expect(plain).toHaveCSS('cursor', 'default');
  });

  test('TC-CNT-002 Every game card links to its own Roblox game page', async ({ page }) => {
    await page.goto('/projects');
    for (const game of GAMES) {
      const card = page.locator(`#${game.slug}`);
      await expect(card.getByRole('heading', { name: game.name })).toBeVisible();
      const play = card.getByRole('link', { name: 'Play on Roblox' });
      await expect(play).toHaveAttribute('href', game.url);
      await expect(play).toHaveAttribute('href', /^https:\/\/www\.roblox\.com\/games\/\d+$/);
      await expect(play).toHaveAttribute('rel', /noopener/);
    }
  });

  test('TC-CNT-003 Contact page links reach the right accounts', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.getByRole('link', { name: 'Send email' })).toHaveAttribute('href', `mailto:${LINKS.email}`);
    for (const [name, href] of [
      ['LinkedIn', LINKS.linkedin],
      ['GitHub', LINKS.github],
      ['TikTok', LINKS.tiktok],
      ['Discord', LINKS.discord],
    ] as const) {
      await expect(page.locator('.contact-card', { hasText: name }).first(), name).toHaveAttribute('href', href);
    }
  });

  test('TC-CNT-004 Every page has a title, a description, and a canonical URL without .html', async ({ page }) => {
    for (const p of PAGES) {
      await page.goto(p.path);
      await expect(page).toHaveTitle(/Fattah Widjaya Gandhi/);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{20,}/);
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      // Home is the site root with its slash; every other page has no trailing slash and no .html.
      expect(canonical, `canonical on ${p.path}`).toMatch(/^https:\/\/fattahwg\.github\.io(\/|\/[a-z]+)$/);
    }
  });

  for (const path of ['/', '/experience', '/contact']) {
    test(`TC-CNT-006 Download CV on ${path} saves the PDF`, async ({ page }) => {
      await page.goto(path);
      const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.getByRole('link', { name: /Download CV/ }).first().click(),
      ]);
      expect(download.suggestedFilename()).toBe('CV-Fattah Widjaya Gandhi.pdf');
      const file = await download.path();
      const fs = await import('node:fs');
      const head = fs.readFileSync(file).subarray(0, 5).toString('latin1');
      expect(head, 'PDF signature').toBe('%PDF-');
      expect(fs.statSync(file).size, 'PDF size in bytes').toBeGreaterThan(20_000);
    });
  }

  test('TC-CNT-007 Experience shows every employer, title, date range, and project from the CV', async ({ page }) => {
    await page.goto('/experience');
    const work = page.locator('#work');
    for (const job of EXPERIENCE) {
      const card = work.locator('article.job', { has: page.getByRole('heading', { name: job.company }) });
      await expect(card, job.company).toBeVisible();
      await expect(card.locator('.role-org')).toHaveText(`${job.title} · ${job.dates}`);
      for (const proj of job.projects) {
        await expect(card.getByRole('heading', { name: proj.name }), proj.name).toBeVisible();
      }
    }
    await expect(work.getByText('Current role')).toHaveCount(EXPERIENCE.filter((j) => j.current).length);
    for (const e of EDUCATION) {
      await expect(page.locator('#education').getByText(e.name), e.name).toBeVisible();
    }
  });

  test('TC-CNT-008 No page shows an unfilled placeholder', async ({ page }) => {
    for (const path of ['/', '/about', '/experience', '/projects', '/contact']) {
      await page.goto(path);
      await expect(page.locator('body'), path).not.toContainText(/\{\{|TODO/);
    }
  });

  test('TC-CNT-005 Demo videos and their posters load', async ({ page, request }) => {
    await page.goto('/experience');
    const sources = await page.locator('video source[type="video/mp4"]').evaluateAll((s) => s.map((x) => x.getAttribute('src')));
    const posters = await page.locator('video').evaluateAll((v) => v.map((x) => x.getAttribute('poster')));
    expect(sources.length, 'videos on Experience').toBeGreaterThanOrEqual(2);
    for (const url of [...sources, ...posters]) {
      const res = await request.head(url!);
      expect(res.status(), `HEAD ${url}`).toBe(200);
    }
  });
});

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { PAGES, isMobile } from './support';

test.describe('Accessibility and layout', () => {
  for (const p of PAGES) {
    for (const scheme of ['light', 'dark'] as const) {
      test(`TC-A11Y-001 ${p.name} (${scheme}) has no serious or critical axe violations`, async ({ page }) => {
        // Scan the final colors. With motion on, the reveal fade gives axe half-transparent text.
        await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: scheme });
        await page.goto(p.path);
        const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
        const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
        expect(
          serious.map((v) => `${v.id} (${v.impact}): ${v.nodes.length} element(s) - ${v.help} - ${v.nodes[0]?.target}`),
          `axe on ${p.path}`
        ).toEqual([]);
      });
    }

    test(`TC-LAY-001 ${p.name} has no sideways scroll`, async ({ page }) => {
      await page.goto(p.path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, `extra width on ${p.path}`).toBeLessThanOrEqual(0);
    });
  }

  test('TC-LAY-002 Interactive controls are at least 40 px tall on phones', async ({ page }) => {
    test.skip(!isMobile(page), 'Touch target size is a phone check.');
    await page.goto('/#contact');
    for (const control of [page.getByRole('button', { name: 'Menu' }), page.getByRole('button', { name: /Switch to/ }), page.getByTestId('copy-email')]) {
      const box = await control.boundingBox();
      expect(box?.height ?? 0, await control.textContent()).toBeGreaterThanOrEqual(40);
    }
  });
});

test.describe('Security', () => {
  for (const p of PAGES) {
    test(`TC-SEC-001 ${p.name} has a strict content policy and breaks none of it`, async ({ page }) => {
      const problems: string[] = [];
      page.on('console', (m) => {
        if (m.type() === 'error' || /Content Security Policy/i.test(m.text())) problems.push(m.text());
      });
      page.on('pageerror', (e) => problems.push(String(e)));
      await page.goto(p.path, { waitUntil: 'networkidle' });

      const csp = await page.locator('meta[http-equiv="Content-Security-Policy"]').getAttribute('content');
      // Scripts come from the site, plus Cloudflare Turnstile for the QA Lab Run button.
      expect(csp, 'CSP meta tag').toMatch(/script-src 'self'( https:\/\/challenges\.cloudflare\.com)?;/);
      expect(csp).toContain("object-src 'none'");
      expect(csp).toContain("base-uri 'self'");
      expect(csp).not.toContain('unsafe-eval');
      expect(csp).not.toContain('__API_ORIGIN__');

      const inline = await page.locator('script:not([src])').count();
      expect(inline, 'inline scripts (the policy blocks them)').toBe(0);
      expect(problems, `console on ${p.path}`).toEqual([]);
    });
  }
});

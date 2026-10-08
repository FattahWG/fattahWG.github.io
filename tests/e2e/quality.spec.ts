import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { PAGES } from './support';

test.describe('Accessibility and layout', () => {
  for (const p of PAGES) {
    test(`TC-A11Y-001 ${p.nav} has no serious or critical axe violations`, async ({ page }) => {
      await page.goto(p.path);
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
      const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
      expect(
        serious.map((v) => `${v.id} (${v.impact}): ${v.nodes.length} element(s) - ${v.help}`),
        `axe on ${p.path}`
      ).toEqual([]);
    });

    test(`TC-LAY-001 ${p.nav} has no sideways scroll`, async ({ page }) => {
      await page.goto(p.path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, `extra width on ${p.path}`).toBeLessThanOrEqual(0);
    });
  }

  test('TC-LAY-002 Interactive controls are at least 40 px tall on phones', async ({ page }) => {
    test.skip((page.viewportSize()?.width ?? 1280) >= 761, 'Touch target size is a phone check.');
    await page.goto('/contact');
    for (const name of ['Open menu', 'Copy email']) {
      const box = await page.getByRole('button', { name }).boundingBox();
      expect(box?.height ?? 0, name).toBeGreaterThanOrEqual(40);
    }
  });
});

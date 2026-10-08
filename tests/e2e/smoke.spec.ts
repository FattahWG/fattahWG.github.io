import { test, expect } from '@playwright/test';
import { openNav } from './support';

// The same five steps as the recorded video on the Experience page.
test('TC-SMK-001 Visitor path from home to contact', { tag: '@smoke' }, async ({ page }) => {
  await test.step('S01 Open the home page', async () => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Fattah Widjaya Gandhi');
  });

  await test.step('S02 Navigate to Experience', async () => {
    await (await openNav(page)).getByRole('link', { name: 'Experience' }).click();
    await expect(page).toHaveURL(/\/experience$/);
    await expect(page.getByRole('heading', { level: 1, name: 'Experience' })).toBeVisible();
  });

  await test.step('S03 Tool chip links to playwright.dev', async () => {
    const chip = page.locator('.tools').getByRole('link', { name: /^Playwright official site/ });
    await expect(chip).toHaveAttribute('href', 'https://playwright.dev/');
  });

  await test.step('S04 Projects lists every Roblox game', async () => {
    await (await openNav(page)).getByRole('link', { name: 'Projects' }).click();
    await expect(page).toHaveURL(/\/projects$/);
    await expect(page.getByRole('link', { name: 'Play on Roblox' })).toHaveCount(4);
  });

  await test.step('S05 Copy email on Contact', async () => {
    await (await openNav(page)).getByRole('link', { name: 'Contact' }).click();
    await expect(page).toHaveURL(/\/contact$/);
    await page.getByRole('button', { name: 'Copy email' }).click();
    await expect(page.getByRole('button', { name: 'Copied' })).toBeVisible();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('off.fattah@gmail.com');
  });
});

import { test, expect } from '@playwright/test';

test.describe('Contact actions', () => {
  test('TC-CON-001 Copy email puts the address on the clipboard and resets the label', async ({ page }) => {
    await page.goto('/contact');
    const button = page.getByRole('button', { name: 'Copy email' });
    await button.click();
    await expect(page.getByRole('button', { name: 'Copied' })).toBeVisible();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('off.fattah@gmail.com');
    // The label returns after a short delay, so the button can be used again.
    await expect(page.getByRole('button', { name: 'Copy email' })).toBeVisible({ timeout: 4000 });
  });
});

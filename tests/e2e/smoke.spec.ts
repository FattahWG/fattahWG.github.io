import { test, expect } from '@playwright/test';
import { latestRun } from '../../packages/shared/src/projects';
import { emptyRunHistory, openNav } from './support';

test('TC-SMK-001 Visitor path from home to the QA Lab and contact', { tag: '@smoke' }, async ({ page }) => {
  await emptyRunHistory(page);
  await test.step('S01 Open the home page', async () => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText("Hi, I'm Fattah.");
  });

  await test.step('S02 Go to Experience', async () => {
    await (await openNav(page)).getByRole('link', { name: 'Experience' }).click();
    await expect(page).toHaveURL(/\/#experience$/);
    await expect(page.getByRole('heading', { level: 2, name: 'Where I test' })).toBeInViewport();
  });

  await test.step('S03 Open the Lawak Store case study', async () => {
    await page.locator('#projects').getByRole('link', { name: 'Read the QA case study' }).click();
    await expect(page).toHaveURL(/\/projects\/lawak-store$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Lawak Store');
  });

  await test.step('S04 Open the QA Lab and see the recorded run', async () => {
    await (await openNav(page)).getByRole('link', { name: 'QA Lab' }).click();
    await expect(page).toHaveURL(/\/lab$/);
    await expect(page.getByText(`40/${latestRun.tests.length} passed`)).toBeVisible();
  });

  await test.step('S05 Copy the email address', async () => {
    await page.goto('/#contact');
    await page.getByTestId('copy-email').click();
    await expect(page.getByTestId('copy-email')).toHaveText('Copied!');
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('off.fattah@gmail.com');
  });
});

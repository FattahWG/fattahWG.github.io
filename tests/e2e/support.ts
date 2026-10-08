import { expect, type Page } from '@playwright/test';

export const PAGES = [
  { path: '/', heading: 'Fattah Widjaya Gandhi', nav: 'Home' },
  { path: '/about', heading: "Hi, I'm Fattah.", nav: 'About' },
  { path: '/experience', heading: 'Experience', nav: 'Experience' },
  { path: '/projects', heading: 'Projects', nav: 'Projects' },
  { path: '/contact', heading: "Let's talk", nav: 'Contact' },
] as const;

export const isMobile = (page: Page) => (page.viewportSize()?.width ?? 1280) < 761;

/** Opens the main navigation on phone layouts, where it hides behind the menu button. */
export async function openNav(page: Page) {
  if (isMobile(page)) {
    await page.getByRole('button', { name: 'Open menu' }).click();
    await expect(page.getByRole('navigation', { name: 'Main' })).toBeVisible();
  }
  return page.getByRole('navigation', { name: 'Main' });
}

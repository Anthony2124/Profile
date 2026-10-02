import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { profile } from '../../profile.js';

test('renders Anthony’s real profile and loads the supplied portrait', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page).toHaveTitle('Anthony Cordial — Software Engineer');
  await expect(page.locator('.hero-description')).toContainText('Anthony Cordial');
  await expect(page.locator('.project-card')).toHaveCount(3);
  await expect(page.locator('#sample-note')).toBeHidden();
  await expect(page.locator('#profile-photo')).toBeVisible();
  expect(await page.locator('#profile-photo').evaluate(image => image.naturalWidth)).toBeGreaterThan(0);
  await expect(page.locator('#contact-links a').filter({ hasText: 'LinkedIn' })).toHaveAttribute('href', profile.linkedin);
  expect(errors).toEqual([]);
});

test('filters real projects and announces the result', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-filter="mobile"]').click();
  await expect(page.locator('.project-card')).toHaveCount(1);
  await expect(page.locator('.project-card')).toContainText('KasiGuru');
  await expect(page.locator('#project-status')).toHaveText('1 project shown');
  await page.locator('[data-filter="fullstack"]').click();
  await expect(page.locator('.project-card')).toContainText('Steady');
  await page.locator('[data-filter="all"]').click();
  await expect(page.locator('.project-card')).toHaveCount(3);
});

test('opens the case study, traps focus, and closes using Escape', async ({ page }) => {
  await page.goto('/');
  const card = page.locator('[data-project="kasiguru"]');
  await card.click();
  await expect(page.locator('#project-dialog')).toBeVisible();
  await expect(page.locator('#dialog-title')).toHaveText('KasiGuru');
  await expect(page.locator('#dialog-content a')).toHaveAttribute('href', 'https://github.com/Anthony2124/KasiGuru');
  await page.keyboard.press('Shift+Tab');
  expect(await page.evaluate(() => document.getElementById('project-dialog').contains(document.activeElement))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(page.locator('#project-dialog')).toBeHidden();
  await expect(card).toBeFocused();
  await expect(page.locator('body')).not.toHaveClass(/dialog-open/);
});

test('persists theme choice after reloading', async ({ page }) => {
  await page.goto('/');
  await page.locator('#theme-toggle').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.locator('#theme-toggle').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('skill tabs support click and keyboard navigation', async ({ page }) => {
  await page.goto('/');
  await page.locator('#tab-web').click();
  await expect(page.locator('#skill-panel')).toContainText('TypeScript');
  await page.keyboard.press('ArrowDown');
  await expect(page.locator('#tab-backend')).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('#skill-panel')).toContainText('PostgreSQL');
  await page.keyboard.press('Home');
  await expect(page.locator('#tab-mobile')).toBeFocused();
  await expect(page.locator('#skill-panel')).toContainText('Kotlin');
});

test('terminal runs commands, preserves history, and handles input as text', async ({ page }) => {
  await page.goto('/');
  const input = page.locator('#terminal-input');
  await input.fill('about');
  await input.press('Enter');
  await expect(page.locator('#terminal-output')).toContainText('Anthony Cordial');
  await input.fill('<img src=x onerror=alert(1)>');
  await input.press('Enter');
  await expect(page.locator('#terminal-output img')).toHaveCount(0);
  await expect(page.locator('#terminal-output')).toContainText('Unknown command: <img');
  await input.press('ArrowUp');
  await expect(input).toHaveValue('<img src=x onerror=alert(1)>');
  await input.fill('projects');
  await input.press('Enter');
  await expect(page.locator('#terminal-output')).toContainText('Steady');
  await input.fill('clear');
  await input.press('Enter');
  await expect(page.locator('#terminal-output p')).toHaveCount(0);
});

test('contact and résumé point to the supplied details', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#email-link')).toHaveAttribute('href', profile.email ? 'mailto:' + profile.email : profile.linkedin);
  await expect(page.locator('#resume-link')).toContainText('résumé');
  const resume = await page.request.get(profile.resume);
  expect(resume.status()).toBe(200);
  expect(resume.headers()['content-type']).toContain('application/pdf');
});

test('copies the real contact email to the clipboard', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/');
  await page.locator('#copy-email').click();
  await expect(page.locator('#toast')).toContainText('Email copied');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(profile.email);
});

test('loads all assets locally and respects reduced motion', async ({ page }) => {
  const externalRequests = [];
  page.on('request', request => { if (!request.url().startsWith('http://127.0.0.1:5173')) externalRequests.push(request.url()); });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('#profile-photo')).toBeVisible();
  expect(externalRequests).toEqual([]);
  expect(await page.locator('body').evaluate(node => parseFloat(getComputedStyle(node).transitionDuration))).toBeLessThan(.001);
});

test('mobile navigation and horizontal skill tabs work', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.locator('#menu-toggle').click();
  await expect(page.locator('#mobile-nav')).toBeVisible();
  await page.locator('#mobile-nav a[href="#skills"]').click();
  await expect(page.locator('#mobile-nav')).toBeHidden();
  await expect(page.locator('#skill-tabs')).toHaveAttribute('aria-orientation', 'horizontal');
  await page.locator('#tab-mobile').click();
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('#tab-web')).toBeFocused();
});

for (const width of [320, 390, 768, 1440]) {
  test('has no horizontal overflow at ' + width + 'px', async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
}

for (const theme of ['dark', 'light']) {
  test('passes accessibility checks in ' + theme + ' mode', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    if (theme === 'light') await page.locator('#theme-toggle').click();
    await page.evaluate(() => document.querySelectorAll('.reveal').forEach(node => node.classList.add('is-visible')));
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(result.violations.map(violation => ({ id: violation.id, nodes: violation.nodes.map(node => ({ target: node.target, message: node.failureSummary })) }))).toEqual([]);
  });
}

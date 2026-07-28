import { test, expect } from '@playwright/test';

/**
 * Mobile hero content verification tests for Bharat Electrosafe.
 *
 * These tests verify that ALL hero content — H1, paragraph, CTAs, proof
 * badges, and the four technical legend items — is visible and within the
 * viewport width on mobile viewports. They do NOT merely test DOM existence;
 * they verify visibility and in-viewport positioning.
 *
 * Test viewports:
 *   360 × 800  (small phone)
 *   375 × 812  (iPhone X)
 *   390 × 844  (iPhone 14)
 *   430 × 932  (iPhone 14 Pro Max)
 *
 * Run with: npx playwright test tests/a11y/hero-mobile.spec.ts
 */

const mobileViewports = [
  { width: 360, height: 800, label: '360px' },
  { width: 375, height: 812, label: '375px' },
  { width: 390, height: 844, label: '390px' },
  { width: 430, height: 932, label: '430px' },
];

for (const vp of mobileViewports) {
  test.describe(`Hero mobile @ ${vp.label}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/');
    });

    test('H1 is fully visible and within viewport width', async ({ page }) => {
      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();
      const h1Text = await h1.innerText();
      expect(h1Text).toContain('Certified protection');
      expect(h1Text).toContain('for critical electrical environments.');
      // Verify no horizontal overflow from H1
      const h1Box = await h1.boundingBox();
      expect(h1Box).not.toBeNull();
      expect(h1Box!.x).toBeGreaterThanOrEqual(0);
      expect(h1Box!.x + h1Box!.width).toBeLessThanOrEqual(vp.width + 1);
    });

    test('Supporting paragraph is fully visible', async ({ page }) => {
      const p = page.locator('p').filter({ hasText: /Electrical insulating mats create/ });
      await expect(p).toBeVisible();
      const text = await p.innerText();
      expect(text).toContain('protective standing surface');
      expect(text).toContain('switchgear, control panels and substations');
    });

    test('Both CTA buttons are visible and within viewport', async ({ page }) => {
      const viewProducts = page.locator('a[href="/products"]').filter({ hasText: 'View Products' });
      await expect(viewProducts).toBeVisible();
      const box1 = await viewProducts.boundingBox();
      expect(box1).not.toBeNull();
      expect(box1!.x + box1!.width).toBeLessThanOrEqual(vp.width + 1);

      const requestQuote = page.locator('a[href="/contact-us"]').filter({ hasText: 'Request a Quote' });
      await expect(requestQuote).toBeVisible();
      const box2 = await requestQuote.boundingBox();
      expect(box2).not.toBeNull();
      expect(box2!.x + box2!.width).toBeLessThanOrEqual(vp.width + 1);
    });

    test('All four proof badges are present', async ({ page }) => {
      await expect(page.locator('text=IS 15652:2006')).toBeVisible();
      await expect(page.locator('text=BIS Licence CM/L:8800129617')).toBeVisible();
      await expect(page.locator('text=ERDA / NTH Tested')).toBeVisible();
      await expect(page.locator('text=Conforming to IEC 61111')).toBeVisible();
    });

    test('All four technical legend items are present on mobile', async ({ page }) => {
      // The legend is hidden on md+ breakpoints; on these mobile widths it must show.
      const legend = page.locator('dl[aria-label="Technical illustration legend"]');
      await expect(legend).toBeVisible();

      await expect(page.locator('dt', { hasText: 'Electrical Switchgear' })).toBeVisible();
      await expect(page.locator('dt', { hasText: 'Operator Standing Area' })).toBeVisible();
      await expect(page.locator('dt', { hasText: 'Insulating Barrier' })).toBeVisible();
      await expect(page.locator('dt', { hasText: 'Anti-Skid Surface' })).toBeVisible();
    });

    test('Legend items have explanatory descriptions', async ({ page }) => {
      const descriptions = [
        'The electrical cabinet being operated or inspected.',
        'The working zone where the technician stands fully on the mat.',
        'The mat separates the operator\u2019s standing surface from the floor.',
        'The textured surface is designed to improve footing during use.',
      ];
      for (const desc of descriptions) {
        await expect(page.locator('dd', { hasText: desc })).toBeVisible();
      }
    });

    test('No horizontal overflow on the page', async ({ page }) => {
      // Scroll through hero section and check no horizontal overflow
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(scrollWidth).toBeLessThanOrEqual(vp.width + 1);
    });

    test('Technical illustration has correct accessibility description', async ({ page }) => {
      const illustration = page.locator('[role="img"]').filter({
        has: page.locator('svg'),
      });
      await expect(illustration).toBeVisible();
      const ariaLabel = await illustration.getAttribute('aria-label');
      expect(ariaLabel).toContain('anti-skid');
      expect(ariaLabel).toContain('operator standing area');
      expect(ariaLabel).toContain('insulating barrier');
    });
  });
}

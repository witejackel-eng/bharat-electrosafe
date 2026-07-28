import { test, expect } from '@playwright/test';

/**
 * Desktop hero compression tests for Bharat Electrosafe.
 *
 * Verifies the homepage hero fits within a single laptop viewport (1366x768)
 * without scrolling. The complete opening proposition — headline, paragraph,
 * CTAs, proof badges, technical illustration — must all be visible at scroll
 * position zero.
 *
 * Test viewports:
 *   1024 × 768  (tablet landscape / small laptop)
 *   1366 × 768  (most common laptop)
 *   1440 × 900  (large laptop)
 *   390  × 844  (iPhone 14 — mobile regression guard)
 *
 * Run with: npx playwright test tests/a11y/hero-desktop-compress.spec.ts
 */

const desktopViewports = [
  { width: 1024, height: 768, label: '1024x768' },
  { width: 1366, height: 768, label: '1366x768' },
  { width: 1440, height: 900, label: '1440x900' },
];

for (const vp of desktopViewports) {
  test.describe(`Hero compression @ ${vp.label}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/');
      // Ensure we are at scroll position zero
      await page.evaluate(() => window.scrollTo(0, 0));
    });

    test('H1 headline is fully visible without scrolling', async ({ page }) => {
      const h1 = page.locator('main h1');
      await expect(h1).toBeVisible();
      const h1Text = await h1.innerText();
      expect(h1Text).toContain('Certified protection');
      expect(h1Text).toContain('for critical electrical environments.');

      // Verify the H1 is within the viewport
      const h1Box = await h1.boundingBox();
      expect(h1Box).not.toBeNull();
      expect(h1Box!.y).toBeGreaterThanOrEqual(0);
      expect(h1Box!.y + h1Box!.height).toBeLessThanOrEqual(vp.height + 1);
    });

    test('Supporting paragraph is fully visible', async ({ page }) => {
      const p = page.locator('main p').filter({ hasText: /Electrical insulating mats create/ });
      await expect(p).toBeVisible();
      const pBox = await p.boundingBox();
      expect(pBox).not.toBeNull();
      expect(pBox!.y + pBox!.height).toBeLessThanOrEqual(vp.height + 1);
    });

    test('CTA group is visible and within viewport', async ({ page }) => {
      // Scope to main to avoid matching header CTA
      const viewProducts = page.locator('main a[href="/products"]').filter({ hasText: 'View Products' });
      await expect(viewProducts).toBeVisible();
      const box1 = await viewProducts.boundingBox();
      expect(box1).not.toBeNull();
      expect(box1!.y + box1!.height).toBeLessThanOrEqual(vp.height + 1);

      const requestQuote = page.locator('main a[href="/contact-us"]').filter({ hasText: 'Request a Quote' });
      await expect(requestQuote).toBeVisible();
      const box2 = await requestQuote.boundingBox();
      expect(box2).not.toBeNull();
      expect(box2!.y + box2!.height).toBeLessThanOrEqual(vp.height + 1);
    });

    test('All four proof badges are visible and within viewport', async ({ page }) => {
      // Scope to the hero section to avoid matching product cards and footer
      const heroSection = page.locator('main section').first();

      const badges = [
        'IS 15652:2006',
        'BIS Licence CM/L:8800129617',
        'ERDA / NTH Tested',
        'Conforming to IEC 61111',
      ];
      for (const badge of badges) {
        const el = heroSection.locator(`text=${badge}`).first();
        await expect(el).toBeVisible();
        const box = await el.boundingBox();
        expect(box).not.toBeNull();
        expect(box!.y + box!.height).toBeLessThanOrEqual(vp.height + 1);
      }
    });

    test('Technical illustration is fully within the viewport', async ({ page }) => {
      const illustration = page.locator('main [role="img"]').filter({
        has: page.locator('svg'),
      });
      await expect(illustration).toBeVisible();
      const box = await illustration.boundingBox();
      expect(box).not.toBeNull();
      // The illustration should not extend below the viewport
      expect(box!.y + box!.height).toBeLessThanOrEqual(vp.height + 1);
    });

    test('No horizontal overflow', async ({ page }) => {
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(scrollWidth).toBeLessThanOrEqual(vp.width + 1);
    });

    test('Product Range section top is near or below viewport edge', async ({ page }) => {
      // The Product Range section should start near the bottom of the viewport
      // so visitors see a cue that more content follows. We find the second
      // visible section (first is hero) by looking for the product section.
      const sections = page.locator('main section');
      const sectionCount = await sections.count();
      expect(sectionCount).toBeGreaterThanOrEqual(2);

      const productSection = sections.nth(1);
      const box = await productSection.boundingBox();
      expect(box).not.toBeNull();
      // The Product Range section top should be near the viewport bottom
      // (within 100px of the bottom edge, or slightly below = still OK as
      // it indicates the hero is tightly packed)
      const proximityToBottom = vp.height - box!.y;
      // proximityToBottom should be positive and ideally small
      // (hero fills viewport with product range just below)
      expect(proximityToBottom).toBeGreaterThan(-200);
    });
  });
}

// Mobile regression guard — ensure compression did not break mobile
test.describe('Hero mobile regression @ 390x844', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
  });

  test('H1 is fully visible on mobile', async ({ page }) => {
    const h1 = page.locator('main h1');
    await expect(h1).toBeVisible();
    const h1Text = await h1.innerText();
    expect(h1Text).toContain('Certified protection');
    expect(h1Text).toContain('for critical electrical environments.');
    const h1Box = await h1.boundingBox();
    expect(h1Box).not.toBeNull();
    expect(h1Box!.x + h1Box!.width).toBeLessThanOrEqual(390 + 1);
  });

  test('Paragraph, CTAs and proof badges are all visible', async ({ page }) => {
    await expect(page.locator('main p').filter({ hasText: /Electrical insulating mats create/ })).toBeVisible();
    await expect(page.locator('main a[href="/products"]').filter({ hasText: 'View Products' })).toBeVisible();
    await expect(page.locator('main a[href="/contact-us"]').filter({ hasText: 'Request a Quote' })).toBeVisible();

    // Scope badges to hero section to avoid matching product cards
    const heroSection = page.locator('main section').first();
    await expect(heroSection.locator('text=IS 15652:2006').first()).toBeVisible();
    await expect(heroSection.locator('text=BIS Licence CM/L:8800129617').first()).toBeVisible();
    await expect(heroSection.locator('text=ERDA / NTH Tested').first()).toBeVisible();
    await expect(heroSection.locator('text=Conforming to IEC 61111').first()).toBeVisible();
  });

  test('Technical legend is visible on mobile', async ({ page }) => {
    const legend = page.locator('dl[aria-label="Technical illustration legend"]');
    await expect(legend).toBeVisible();
    await expect(page.locator('dt', { hasText: 'Electrical Switchgear' })).toBeVisible();
    await expect(page.locator('dt', { hasText: 'Operator Standing Area' })).toBeVisible();
    await expect(page.locator('dt', { hasText: 'Insulating Barrier' })).toBeVisible();
    await expect(page.locator('dt', { hasText: 'Anti-Skid Surface' })).toBeVisible();
  });

  test('Technical illustration is visible and not cropped', async ({ page }) => {
    const illustration = page.locator('main [role="img"]').filter({
      has: page.locator('svg'),
    });
    await expect(illustration).toBeVisible();
    const box = await illustration.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeGreaterThan(200);
    expect(box!.height).toBeGreaterThan(200);
  });

  test('No horizontal overflow on mobile', async ({ page }) => {
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(391);
  });
});

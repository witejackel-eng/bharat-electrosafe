import { test, expect } from '@playwright/test';

/**
 * Leadership biography toggle tests for Bharat Electrosafe About page.
 *
 * Verifies the single-source-of-truth biography toggle behaviour:
 *   • Click "View biography" → opens that biography (aria-expanded=true,
 *     label flips to "Close biography", chevron rotates).
 *   • Click "Close biography" (same button) → closes immediately and
 *     smoothly, even while the pointer remains over the card and even
 *     while the button retains keyboard focus.
 *   • Opening another card's biography closes the previous one. Only
 *     one biography is open at a time on all screen sizes.
 *   • Pressing Escape while focus is inside an open card closes it.
 *
 * Single source of truth: `openIndex` state in LeadershipGrid.tsx.
 * There is no `hoveredIndex`, no `:focus-within` CSS rule, and no
 * `isOpen || isHovered` combination — hover may only affect border
 * colour and a subtle shadow, never biography visibility.
 *
 * Test viewports:
 *   390 × 844   (mobile)
 *   768 × 1024  (tablet portrait)
 *   1024 × 768  (tablet landscape / small desktop)
 *   1440 × 900  (desktop)
 *
 * Run with: npx playwright test tests/a11y/leadership-biography.spec.ts
 */

const viewports = [
  { width: 390,  height: 844,  label: '390x844'  },
  { width: 768,  height: 1024, label: '768x1024' },
  { width: 1024, height: 768,  label: '1024x768' },
  { width: 1440, height: 900,  label: '1440x900' },
];

for (const vp of viewports) {
  test.describe(`Leadership biography @ ${vp.label}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/about-us');
      // Wait for leadership grid to render
      await page.locator('.be-leadership-grid').first().waitFor({ state: 'visible', timeout: 10000 });
    });

    test('Click "View biography" opens the biography', async ({ page }) => {
      const buttons = page.locator('.be-leadership-grid button[aria-expanded]');
      const firstBtn = buttons.first();
      const bioId = await firstBtn.getAttribute('aria-controls');

      // Initial state: collapsed
      await expect(firstBtn).toHaveAttribute('aria-expanded', 'false');
      await expect(firstBtn).toContainText('View biography');

      // Click to open
      await firstBtn.click();
      await page.waitForTimeout(400);

      // Now expanded
      await expect(firstBtn).toHaveAttribute('aria-expanded', 'true');
      await expect(firstBtn).toContainText('Close biography');

      // Biography region is visible
      const bio = page.locator(`#${bioId}`);
      const bioBox = await bio.boundingBox();
      expect(bioBox).not.toBeNull();
      expect(bioBox!.height).toBeGreaterThan(50);
    });

    test('Click "Close biography" closes immediately, even with pointer over card and button focused', async ({ page }) => {
      const buttons = page.locator('.be-leadership-grid button[aria-expanded]');
      const firstBtn = buttons.first();
      const bioId = await firstBtn.getAttribute('aria-controls');

      // Move pointer onto the button (hover) to simulate "cursor over card"
      await firstBtn.hover();
      // Click to open
      await firstBtn.click();
      await page.waitForTimeout(400);
      expect(await firstBtn.getAttribute('aria-expanded')).toBe('true');

      // Keep pointer on the button (hovering) and click again to close
      await firstBtn.hover();
      await firstBtn.click();
      await page.waitForTimeout(400);

      // Now collapsed
      await expect(firstBtn).toHaveAttribute('aria-expanded', 'false');
      await expect(firstBtn).toContainText('View biography');

      // Biography region is collapsed (height ~ 0, opacity 0)
      const bio = page.locator(`#${bioId}`);
      const bioBox = await bio.boundingBox();
      expect(bioBox).not.toBeNull();
      // grid-template-rows: 0fr leaves a tiny residual height (< 10px)
      expect(bioBox!.height).toBeLessThan(10);
    });

    test('Opening another card closes the previous one', async ({ page }) => {
      const buttons = page.locator('.be-leadership-grid button[aria-expanded]');
      const firstBtn = buttons.nth(0);
      const secondBtn = buttons.nth(1);
      const firstBioId = await firstBtn.getAttribute('aria-controls');
      const secondBioId = await secondBtn.getAttribute('aria-controls');

      // Open first card
      await firstBtn.click();
      await page.waitForTimeout(400);
      expect(await firstBtn.getAttribute('aria-expanded')).toBe('true');
      expect(await secondBtn.getAttribute('aria-expanded')).toBe('false');

      // Open second card — first should close
      await secondBtn.click();
      await page.waitForTimeout(400);
      expect(await firstBtn.getAttribute('aria-expanded')).toBe('false');
      expect(await secondBtn.getAttribute('aria-expanded')).toBe('true');

      // First biography is collapsed
      const firstBio = page.locator(`#${firstBioId}`);
      const firstBioBox = await firstBio.boundingBox();
      expect(firstBioBox!.height).toBeLessThan(10);

      // Second biography is expanded
      const secondBio = page.locator(`#${secondBioId}`);
      const secondBioBox = await secondBio.boundingBox();
      expect(secondBioBox!.height).toBeGreaterThan(50);
    });

    test('Escape key closes the open biography', async ({ page }) => {
      const buttons = page.locator('.be-leadership-grid button[aria-expanded]');
      const firstBtn = buttons.first();

      // Open the first biography
      await firstBtn.click();
      await page.waitForTimeout(400);
      expect(await firstBtn.getAttribute('aria-expanded')).toBe('true');

      // Focus the button and press Escape
      await firstBtn.focus();
      await page.keyboard.press('Escape');
      await page.waitForTimeout(400);

      // Biography is now closed
      await expect(firstBtn).toHaveAttribute('aria-expanded', 'false');
    });

    test('Chevron rotates when biography is open', async ({ page }) => {
      const buttons = page.locator('.be-leadership-grid button[aria-expanded]');
      const firstBtn = buttons.first();
      const chevron = firstBtn.locator('svg');

      // Initial: chevron not rotated. Tailwind v4 uses the modern CSS
      // `rotate` property (not `transform: rotate(...)`), so we check
      // both `transform` and `rotate`.
      const initial = await chevron.evaluate(el => {
        const cs = window.getComputedStyle(el);
        return { transform: cs.transform, rotate: cs.rotate };
      });
      // At rest, both should be 'none'
      expect(initial.rotate).toBe('none');

      // Open biography
      await firstBtn.click();
      await page.waitForTimeout(400);

      // After open: chevron should be rotated by 180deg
      const open = await chevron.evaluate(el => {
        const cs = window.getComputedStyle(el);
        return { transform: cs.transform, rotate: cs.rotate };
      });
      // Tailwind v4 `rotate-180` sets the modern `rotate` CSS property
      expect(open.rotate).toContain('180');
      expect(open.rotate).not.toBe(initial.rotate);
    });

    test('Button has 44px minimum touch target', async ({ page }) => {
      const buttons = page.locator('.be-leadership-grid button[aria-expanded]');
      const firstBtn = buttons.first();
      const box = await firstBtn.boundingBox();
      expect(box).not.toBeNull();
      // 44px minimum per WCAG 2.5.5 / 2.5.8
      expect(box!.height).toBeGreaterThanOrEqual(44);
    });

    test('Hover does not open biography (only changes border color)', async ({ page }) => {
      const buttons = page.locator('.be-leadership-grid button[aria-expanded]');
      const firstBtn = buttons.first();
      const bioId = await firstBtn.getAttribute('aria-controls');

      // Hover the card (not the button)
      const firstCard = page.locator('.be-leader-card').first();
      await firstCard.hover();
      await page.waitForTimeout(500);

      // Biography should still be collapsed
      await expect(firstBtn).toHaveAttribute('aria-expanded', 'false');
      const bio = page.locator(`#${bioId}`);
      const bioBox = await bio.boundingBox();
      expect(bioBox!.height).toBeLessThan(10);
    });
  });
}

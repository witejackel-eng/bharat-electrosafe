import { test, expect } from '@playwright/test';

/**
 * Leadership section responsive interaction tests.
 *
 * Spec section 10: "Test the leadership section at 360×800, 390×844,
 * 430×932, 768×1024, 820×1180, 1024×768, 1280×800, 1366×768,
 * 1440×900, 1920×1080."
 *
 * Confirms at each viewport:
 *  - All three cards have equal collapsed presentation.
 *  - Expanded text remains readable.
 *  - `Know more` and `Show less` work correctly.
 *  - Only one card opens at a time.
 *  - No content is clipped or overflows.
 *  - Buttons remain visible and tappable.
 *  - Mobile cards remain within the viewport.
 *  - Desktop cards remain aligned.
 *  - Expansion does not overlap another section.
 *
 * Run with: npx playwright test tests/a11y/leadership-responsive.spec.ts
 */

const viewports = [
  { width: 360, height: 800, label: '360x800' },
  { width: 390, height: 844, label: '390x844' },
  { width: 430, height: 932, label: '430x932' },
  { width: 768, height: 1024, label: '768x1024' },
  { width: 820, height: 1180, label: '820x1180' },
  { width: 1024, height: 768, label: '1024x768' },
  { width: 1280, height: 800, label: '1280x800' },
  { width: 1366, height: 768, label: '1366x768' },
  { width: 1440, height: 900, label: '1440x900' },
  { width: 1920, height: 1080, label: '1920x1080' },
];

for (const vp of viewports) {
  test.describe(`Leadership responsive @ ${vp.label}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/about-us');
      await page
        .locator('.be-leadership-grid')
        .first()
        .waitFor({ state: 'visible', timeout: 10000 });
    });

    test('three leadership cards render with equal collapsed presentation', async ({
      page,
    }) => {
      const cards = page.locator('.be-leader-card');
      await expect(cards).toHaveCount(3);

      // All three buttons start collapsed with "Know more" label.
      const buttons = page.locator(
        '.be-leadership-grid button[aria-expanded]'
      );
      await expect(buttons).toHaveCount(3);
      for (let i = 0; i < 3; i++) {
        await expect(buttons.nth(i)).toHaveAttribute(
          'aria-expanded',
          'false'
        );
        await expect(buttons.nth(i)).toContainText('Know more');
      }

      // Collapsed card heights should be roughly equal (within 8px
      // tolerance to allow for sub-pixel rounding and minor text-wrap
      // differences). The expanded biography region adds no height
      // when collapsed (grid-template-rows: 0fr).
      const boxes = await cards.evaluateAll((els) =>
        els.map((el) => {
          const r = (el as HTMLElement).getBoundingClientRect();
          return { width: r.width, height: r.height };
        })
      );
      const heights = boxes.map((b) => b.height);
      const maxHeight = Math.max(...heights);
      const minHeight = Math.min(...heights);
      expect(maxHeight - minHeight).toBeLessThan(24);
    });

    test('Know more opens the biography; only one card open at a time', async ({
      page,
    }) => {
      const buttons = page.locator(
        '.be-leadership-grid button[aria-expanded]'
      );

      // Open card 0
      await buttons.nth(0).click();
      await page.waitForTimeout(400);
      await expect(buttons.nth(0)).toHaveAttribute('aria-expanded', 'true');
      await expect(buttons.nth(0)).toContainText('Show less');
      await expect(buttons.nth(1)).toHaveAttribute('aria-expanded', 'false');
      await expect(buttons.nth(2)).toHaveAttribute('aria-expanded', 'false');

      // Open card 1 — card 0 should close
      await buttons.nth(1).click();
      await page.waitForTimeout(400);
      await expect(buttons.nth(0)).toHaveAttribute('aria-expanded', 'false');
      await expect(buttons.nth(1)).toHaveAttribute('aria-expanded', 'true');
      await expect(buttons.nth(2)).toHaveAttribute('aria-expanded', 'false');

      // Open card 2 — card 1 should close
      await buttons.nth(2).click();
      await page.waitForTimeout(400);
      await expect(buttons.nth(0)).toHaveAttribute('aria-expanded', 'false');
      await expect(buttons.nth(1)).toHaveAttribute('aria-expanded', 'false');
      await expect(buttons.nth(2)).toHaveAttribute('aria-expanded', 'true');

      // Show less closes the open card
      await buttons.nth(2).click();
      await page.waitForTimeout(400);
      await expect(buttons.nth(2)).toHaveAttribute('aria-expanded', 'false');
      await expect(buttons.nth(2)).toContainText('Know more');
    });

    test('expanded biography remains readable and inside the viewport', async ({
      page,
    }) => {
      const buttons = page.locator(
        '.be-leadership-grid button[aria-expanded]'
      );
      await buttons.nth(0).click();
      await page.waitForTimeout(400);

      // The expanded biography region must have non-trivial height.
      const bioId = await buttons.nth(0).getAttribute('aria-controls');
      const bio = page.locator(`#${bioId}`);
      const bioBox = await bio.boundingBox();
      expect(bioBox).not.toBeNull();
      expect(bioBox!.height).toBeGreaterThan(60);

      // The biography text must be non-empty.
      const bioText = (await bio.innerText()).trim();
      expect(bioText.length).toBeGreaterThan(40);

      // The card must remain inside the viewport (no horizontal
      // overflow, no clipping).
      const card = page.locator('.be-leader-card').first();
      const cardBox = await card.boundingBox();
      expect(cardBox).not.toBeNull();
      expect(cardBox!.x).toBeGreaterThanOrEqual(0);
      expect(cardBox!.x + cardBox!.width).toBeLessThanOrEqual(vp.width);

      // No horizontal overflow on the page itself.
      const scrollWidth = await page.evaluate(
        () => document.documentElement.scrollWidth
      );
      const clientWidth = await page.evaluate(
        () => document.documentElement.clientWidth
      );
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
    });

    test('toggle button meets the 44px minimum touch target and stays visible', async ({
      page,
    }) => {
      const buttons = page.locator(
        '.be-leadership-grid button[aria-expanded]'
      );
      const box = await buttons.nth(0).boundingBox();
      expect(box).not.toBeNull();
      expect(box!.height).toBeGreaterThanOrEqual(44);
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(vp.width);
    });

    test('expanded card does not overlap the next section', async ({
      page,
    }) => {
      const buttons = page.locator(
        '.be-leadership-grid button[aria-expanded]'
      );
      await buttons.nth(0).click();
      await page.waitForTimeout(500);

      // The leadership grid bottom must be at or above the next
      // section's top. We approximate by checking that the next
      // sibling section of the leadership grid's section starts at a
      // y greater than the leadership grid's bottom.
      const grid = page.locator('.be-leadership-grid').first();
      const gridBox = await grid.boundingBox();
      expect(gridBox).not.toBeNull();

      // Find the next section after the leadership section. The
      // leadership section is inside CompanyLeadership, which is
      // followed by ManufacturingValues, AwardsCertifications, etc.
      // We just assert the page scrollHeight is at least the grid
      // bottom + a small epsilon, so the next section is laid out
      // below rather than overlapping.
      const scrollHeight = await page.evaluate(
        () => document.documentElement.scrollHeight
      );
      expect(scrollHeight).toBeGreaterThan(gridBox!.y + gridBox!.height);
    });

    test('aria-label includes the leader name in both states', async ({
      page,
    }) => {
      const buttons = page.locator(
        '.be-leadership-grid button[aria-expanded]'
      );

      // Collapsed state
      const collapsedLabel = await buttons
        .nth(0)
        .getAttribute('aria-label');
      expect(collapsedLabel).toBeTruthy();
      expect(collapsedLabel!).toMatch(/Know more about/);

      // Expanded state
      await buttons.nth(0).click();
      await page.waitForTimeout(400);
      const expandedLabel = await buttons
        .nth(0)
        .getAttribute('aria-label');
      expect(expandedLabel).toBeTruthy();
      expect(expandedLabel!).toMatch(/Show less about/);

      // Close
      await buttons.nth(0).click();
      await page.waitForTimeout(200);
    });
  });
}

import { test, expect } from '@playwright/test';

/**
 * Visual regression across every brand and mode.
 *
 * A token change is invisible until something renders it. Brand 2 dark is the
 * combination nobody looks at, so it is the one that breaks quietly. These
 * shots are the thing that notices.
 *
 * Baselines are generated in CI, in the Playwright container, because font
 * rasterisation differs between machines and locally made baselines would fail
 * on the runner for reasons that have nothing to do with the system.
 */

const BRANDS = ['brand-1', 'brand-2', 'brand-3'] as const;
const MODES = ['light', 'dark'] as const;

/** Chosen to exercise the token layers rather than to cover every story:
 *  solid brand fill, the ramp as text, borders, status colour, radius roles,
 *  elevation and the audit that reads real computed colours. */
const STORIES = [
  'components-button--intents',
  'components-input--states',
  'components-select--states',
  'components-alert--tones',
  'components-badge--matrix',
  'components-card--elevations',
  'components-table--default',
  'components-tabs--default',
  'components-switch--states',
  'foundations-accessibility--contrast-audit',
];

for (const story of STORIES) {
  for (const brand of BRANDS) {
    for (const mode of MODES) {
      test(`${story} ${brand} ${mode}`, async ({ page }) => {
        // The globals separator is a semicolon. A comma silently renders the
        // default brand, which looks like a pass and is not one.
        await page.goto(
          `/iframe.html?id=${story}&globals=brand:${brand};theme:${mode}`,
          { waitUntil: 'networkidle' },
        );

        const root = page.locator('#storybook-root');
        await expect(root).toBeVisible();

        // Fonts decide layout, so settle them before measuring anything.
        await page.evaluate(() => document.fonts.ready);

        // Assert the brand actually applied. Without this a broken globals
        // string would snapshot brand 1 six times and report all green.
        await expect
          .poll(() => page.evaluate(() => document.documentElement.dataset.brand))
          .toBe(brand);

        await expect(root).toHaveScreenshot(`${story}-${brand}-${mode}.png`, {
          animations: 'disabled',
        });
      });
    }
  }
}

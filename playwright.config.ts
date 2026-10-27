import { defineConfig, devices } from '@playwright/test';

/**
 * Visual regression only. Everything is pinned so a snapshot differs when the
 * system changes and not when the machine does: one browser, fixed viewport,
 * fixed scale factor, reduced motion, no colour-scheme preference leaking in.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : [['list']],

  expect: {
    toHaveScreenshot: {
      // An absolute count, not a ratio. A ratio scales with the image, so a
      // colour change confined to one component is a small fraction of a large
      // screenshot and slips under it: recolouring Brand 2's primary button
      // moved 5,174 of 599,040 pixels, which is 0.86%, and a 1% ratio passed it.
      // 100 pixels absorbs antialiasing on glyph edges and nothing else.
      maxDiffPixels: 100,
      animations: 'disabled',
    },
  },

  use: {
    baseURL: 'http://127.0.0.1:6007',
    viewport: { width: 1100, height: 800 },
    deviceScaleFactor: 1,
    colorScheme: 'light',
    reducedMotion: 'reduce',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // CI runs the Playwright container, which ships its own browser. Locally
        // PLAYWRIGHT_CHROMIUM_PATH points at whatever Chromium is already here,
        // so nothing has to be downloaded to run this.
        ...(process.env.PLAYWRIGHT_CHROMIUM_PATH
          ? { launchOptions: { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH } }
          : {}),
        // After the device spread, which carries its own 1280x720 viewport and
        // would otherwise silently win over the one set in `use` above.
        viewport: { width: 1100, height: 800 },
        deviceScaleFactor: 1,
      },
    },
  ],

  webServer: {
    command: 'npx --yes http-server storybook-static -p 6007 -s --silent',
    url: 'http://127.0.0.1:6007/iframe.html',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});

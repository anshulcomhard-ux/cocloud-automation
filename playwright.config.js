
import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Run tests from the whole repository so specs under `portals/.../tests`
  // are also picked up (not just files under a top-level `tests` folder).
  testDir: './portals',

  // Increase timeout to match test timeouts (some tests use 3-5 minutes)
  timeout: 5 * 60 * 1000, // 5 minutes

 

  reporter: [
    ['html', { open: 'on-failure' }],
  ],

  use: {
    video: 'on',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },

  outputDir: 'test-results',

  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' },
    },
  ],
});


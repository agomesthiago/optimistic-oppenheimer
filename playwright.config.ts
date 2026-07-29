import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: [
    ['list'],
    ['json', { outputFile: 'docs/test-results/certification-report.json' }],
    ['html', { outputFolder: 'docs/test-results/html-report', open: 'never' }]
  ],
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'on',
    screenshot: 'on',
    video: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium-desktop',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'chromium-mobile-320px',
      use: {
        browserName: 'chromium',
        viewport: { width: 320, height: 568 },
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true,
      },
    },
    {
      name: 'chromium-no-js',
      use: {
        browserName: 'chromium',
        javaScriptEnabled: false,
      },
    }
  ],
  webServer: {
    command: 'npm run build && npm run preview -- --port 4173',
    port: 4173,
    reuseExistingServer: true,
    timeout: 30000,
  },
});

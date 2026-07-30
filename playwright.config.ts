import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: [
    ['list'],
    ['json', { outputFile: 'docs/test-results/e2e-report.json' }],
    ['html', { outputFolder: 'docs/test-results/html-report', open: 'never' }]
  ],
  use: {
    baseURL: 'http://127.0.0.1:5173',
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
      name: 'mobile-chrome-pixel',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari-iphone',
      use: { ...devices['iPhone 13'] },
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
    command: 'npm run build && npm run preview -- --port 5173 --host 127.0.0.1',
    port: 5173,
    reuseExistingServer: !process.env.CI,
    timeout: 60000,
  },
});

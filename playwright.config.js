const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  retries: 0,
  timeout: 60000,  // Global test timeout (60 seconds)
  expect: {
    timeout: 8000,  // Default assertion timeout (8 seconds)
  },

  use: {
    actionTimeout: 10000, // Timeout for each action (10 seconds)
    navigationTimeout: 20000, // Timeout for navigation (20 seconds)
    headless: false,
    launchOptions: {
      args: ['--start-maximized'],
    },
    video: 'on-first-retry', // Capture video only on first retry
    screenshot: 'only-on-failure', // Capture screenshot only if the test fails
    trace: 'on-first-retry', // Collect trace only on the first retry
    outputDir: 'test-results/artifacts', // Store raw artifacts
  },

  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
  
  fullyParallel: true,
  workers: 1, // Set to 1 for debugging; increase for parallel execution

  reporter: [
    ['list'], // Console output
    ['html', { outputFolder: 'playwright-reports/html-report', open: 'on-failure' }], // HTML report
    ['json', { outputFile: 'playwright-reports/report.json' }], // JSON report
    ['junit', { outputFile: 'playwright-reports/report.xml' }], // JUnit report
  ],
});

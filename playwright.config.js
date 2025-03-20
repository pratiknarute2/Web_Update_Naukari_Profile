const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  retries: 0,
  
  timeout: 60000,  // Set global timeout for the entire test execution (60 seconds)
  use: {
    actionTimeout: 10000, // Set timeout for each action (10 seconds)
    navigationTimeout: 20000, // Set timeout for navigation (20 seconds)
  },
  expect: {
    timeout: 8000,  // Set default timeout for assertions (8 seconds)
  },

  use: {
    headless: true,
    launchOptions: {
      args: ['--start-maximized'],
    },
    video: 'on-first-retry', // Capture video only on the first retry
    screenshot: 'only-on-failure', // Capture screenshot only if the test fails
    trace: 'on-first-retry', // Collect trace only on the first retry
    outputDir: 'test-results/artifacts', // Store raw artifacts separately
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
  fullyParallel: true,
  workers: 1, // Run tests in parallel

  // Configure reports (Saved in 'playwright-reports/' to avoid conflicts)
  reporter: [
    ['list'], // Console output
    ['html', { outputFolder: 'playwright-reports/html-report', open: 'on-failure' }], // HTML report
    ['json', { outputFile: 'playwright-reports/report.json' }], // JSON report
    ['junit', { outputFile: 'playwright-reports/report.xml' }], // JUnit report
  ],
});

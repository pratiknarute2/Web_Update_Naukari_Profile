import { test, expect } from '@playwright/test';
import fs from 'fs/promises';
const LoginPage = require('../Pages/LoginPage');

// Function to read JSON payload
async function getPayload() {
    try {
        const data = await fs.readFile('./Login.json', 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading the JSON file:", error);
        return null;
    }
}

// ✅ UI Test
test('3] Login with valid credentials in Kolonizer', async ({ page }) => {
    const login = new LoginPage(page);
    await login.openLogin();
    await login.enterUsername();
    await login.enterPassword();
    await login.clickOnLogin();

    // ✅ Moved inside test block
    await page.getByText('Booked').nth(3).click();
});

// ✅ API Test with Two Windows in the Same Browser Context
test('4] API Login and integrate with UI Automation using two windows in same browser', async ({ browser, request }) => {
    // Step 1: Create a new browser context (Window 1)
    const context1 = await browser.newContext();
    const page1 = await context1.newPage();

    // Step 2: Initialize LoginPage for the first window
    let loginPage1 = new LoginPage(page1);

    // Step 3: Perform API Login & Get Token
    const token = await loginPage1.postLoginAPI(request);

    // Step 4: Open Dashboard in First Window
    await loginPage1.openDashboard();
    await page1.evaluate((authToken) => {
        localStorage.setItem('token', authToken);
    }, token);
    await page1.reload();
    console.log("Current URL in Window 1:", await page1.url());

    // Step 5: Create Second Window in the Same Browser Context
    const page2 = await context1.newPage();
    const loginPage2 = new LoginPage(page2);

    // Step 6: Open Dashboard in Second Window
    await loginPage2.openDashboard();
    await page2.evaluate((authToken) => {
        localStorage.setItem('token', authToken);
    }, token);
    await page2.reload();
    console.log("Current URL in Window 2:", await page2.url());

    // ✅ Close the second page
    await page2.close();

    // ✅ Fetch Project API after logging in
    await loginPage1.getProjectAPI(request, token);

    // ✅ Properly close context
    await context1.close();
});

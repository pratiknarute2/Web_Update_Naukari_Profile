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

// UI Test
test.skip('Login with valid credentials in Kolonizer', async ({ page }) => {
    const login = new LoginPage(page);
    await login.openKolonizer();
    await login.enterUsername();
    await login.enterPassword();
    await login.clickOnLogin();
});



test('API Login and integrate with UI Automation using two windows in same browser', async ({ browser, request }) => {
    // Step 1: Create a new context and page (Window 1)
    const context1 = await browser.newContext();
    const page1 = await context1.newPage();

    // Step 2: Initialize LoginPage with page instance
    const loginPage = new LoginPage(page1);

    // Step 3: Perform API Login & Get Token
    const token = await loginPage.postLoginAPI(request);

    // Step 4: Open Dashboard in First Window
    await page1.goto('https://uatdreamcity.kolonizer.in/dashboard/sales-dashboard');
    await page1.evaluate((authToken) => {
        localStorage.setItem('token', authToken);
    }, token);
    await page1.reload();
    console.log("Current URL in Window 1:", await page1.url());

    // Step 5: Create Second Window in Same Browser Context
    const page2 = await context1.newPage();

    await page2.goto('https://uatdreamcity.kolonizer.in/dashboard/sales-dashboard');
    await page2.evaluate((authToken) => {
        localStorage.setItem('token', authToken);
    }, token);
    await page2.reload();
    console.log("Current URL in Window 2:", await page2.url());

});

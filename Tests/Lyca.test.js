import { test, expect } from '@playwright/test';
import { chromium } from 'playwright';
import HomePage from '../Pages/HomePage.js';
import CheckoutPage from '../Pages/CheckoutPage.js';
import DeliveryAndPaymentPage from '../Pages/DeliveryAndPaymentPage.js';

test.describe('Sim Journey', () => {
    test('1] Verify the free SIM purchase flow', async ({ page }) => {
        const homePage = new HomePage(page);
        const checkoutPage = new CheckoutPage(page);
        const deliveryAndPaymentPage = new DeliveryAndPaymentPage(page);

        await homePage.open();
        await homePage.acceptCookies();
        await homePage.goToPrepaidPlans();

        await checkoutPage.checkoutPlan();

        await deliveryAndPaymentPage.fillPersonalDetails('Pratik', 'Narute', 'dflkhf@kfdh.com');
        await deliveryAndPaymentPage.fillAddressManually('sdff', 'sdfdsfdsf', 'dsfdsf', '12345', 'fjsdfj');

        await deliveryAndPaymentPage.selectOtherPaymentOption();
        await deliveryAndPaymentPage.acceptTermsAndConditions();
        await deliveryAndPaymentPage.buySimCardWithPlan();
    });
});

test.describe('Home Page', () => {
    test('2] Verify side menu list of home page', async ({ page }) => {
        const homePage = new HomePage(page);

        await homePage.open();
        await homePage.acceptCookies();
        await homePage.menuList();
    });
});

test.describe('API', () => {
    test('Get Bundle API', async ({ request }) => {
        const apiUrls = [
            'https://www.lycamobile.at/bff/web/pim/v1/get-bundles?type=cvm&draft=false&lang=de',
            'https://www.lycamobile.at/bff/web/pim/v1/get-bundles?type=cvm&draft=false&lang=en'
        ];

        for (const url of apiUrls) {
            console.log(`🚀 Validating API: ${url}`);

            const response = await request.get(url);
            const status = response.status();
            const headers = response.headers();
            const data = await response.json();

            console.log(`✅ Status: ${status} [${url}]`);
            console.log(`📌 Headers [${url}]:`, headers);
            console.log(`📊 Response [${url}]:`, JSON.stringify(data, null, 2));

            expect(status).toBe(200); // Ensure API is returning 200 OK
            console.log('-'.repeat(80)); // Separator
        }
    });
});

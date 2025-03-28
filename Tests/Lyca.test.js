import { test, expect } from '@playwright/test';
import HomePage from '../Pages/HomePage.js';
import CheckoutPage from '../Pages/CheckoutPage.js';
import DeliveryAndPaymentPage from '../Pages/DeliveryAndPaymentPage.js';

test.describe('Sim Journey', () => {
    test('Verify the free SIM purchase flow', async ({ page }) => {
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
    test('Verify side menu list of home page', async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.open();
        await homePage.acceptCookies();
        await homePage.menuList();
    });
});

test.describe('API', () => {
    test('Website ==> Get Bundle API', async ({ request }) => {
        const apiUrls = [
            'https://www.lycamobile.at/bff/web/pim/v1/get-bundles?type=cvm&draft=false&lang=de',
            'https://www.lycamobile.at/bff/web/pim/v1/get-bundles?type=cvm&draft=false&lang=en',
            'https://www.lycamobile.at/bff/web/pim/v1/get-all/topup?draft=false&lang=en'
        ];

        for (const url of apiUrls) {
            console.log(`🚀 Validating API: ${url}`);

            const response = await request.get(url);
            const status = response.status();
            const headers = response.headers();
            const data = await response.json();

            console.log(`✅ Status: ${status} [${url}]`);
            console.log(`📌 Headers [${url}]:`, headers);
            // console.log(`📊 Response [${url}]:`, JSON.stringify(data, null, 2));

            expect(status).toBe(200); // Ensure API is returning 200 OK
            expect(headers['cf-cache-status']).toBe('HIT'); // Ensure returning HIT as cf cache status
            expect(headers['referrer-policy']).toBe('same-origin, no-referrer'); // Ensure returning HIT as cf cache status
            expect(headers['content-security-policy']).toBe("default-src https: http: wss: 'self' data: 'unsafe-inline' blob:;"); // Ensure returning HIT as cf cache status
    
            console.log('-'.repeat(80)); // Separator
        }
    });
    test('Mobile ==> Get Bundle API', async ({ request }) => {
        const apiUrls = [
            'https://www.lycamobile.at/bff/web/pim/v1/get-bundles?type=cvm&draft=false&lang=de',
            'https://dt-lycamobileat.ldsvcplatform.com/bff/cms/v4/bundles?type=all',
            'https://www.lycamobile.at/bff/web/pim/v1/get-all/topup?draft=false&lang=en'
        ];

        for (const url of apiUrls) {
            console.log(`🚀 Validating API: ${url}`);

            const response = await request.get(url,{
                headers:{
                    'trace-id': '1234',
                    'country-code': 'AT',
                    'accept-language': 'en',
                    'entity': 'LYCAMOBAPP'
                }
            });
            const status = response.status();
            const headers = response.headers();
            const data = await response.json();

            console.log(`✅ Status: ${status} [${url}]`);
            console.log(`📌 Headers [${url}]:`, headers);
            // console.log(`📊 Response [${url}]:`, JSON.stringify(data, null, 2));

            expect(status).toBe(200); // Ensure API is returning 200 OK
            expect(headers['cf-cache-status']).toBe('HIT'); // Ensure returning HIT as cf cache status
            expect(headers['referrer-policy']).toBe('same-origin, no-referrer'); // Ensure returning HIT as cf cache status
            expect(headers['content-security-policy']).toBe("default-src https: http: wss: 'self' data: 'unsafe-inline' blob:;"); // Ensure returning HIT as cf cache status
    
            console.log('-'.repeat(80)); // Separator
        }
    });

   
    
});

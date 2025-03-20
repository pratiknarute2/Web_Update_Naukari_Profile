const { test } = require('@playwright/test');
const { chromium } = require('playwright');
const HomePage = require('../Pages/HomePage');
const CheckoutPage = require('../Pages/CheckoutPage');
const DeliveryAndPaymentPage = require('../Pages/DeliveryAndPaymentPage');




test('1] Verify the free SIM purchase flow', async ({  }) => {
    // Launch browser
    const browser = await chromium.launch();

    // Create a new browser context
    const context = await browser.newContext();

    // Create a new page inside the context
    const page = await context.newPage();
    const homePage = new HomePage(page);
    const checkoutPage = new CheckoutPage(page);
    const deliveryAndPaymentPage = new DeliveryAndPaymentPage(page);

    await homePage.open()
    await homePage.acceptCookies()
    await homePage.goToPrepaidPlans()

    await checkoutPage.checkoutPlan()

    await deliveryAndPaymentPage.fillPersonalDetails('Pratik', 'Narute', 'dflkhf@kfdh.com')
    await deliveryAndPaymentPage.fillAddressManually('sdff', 'sdfdsfdsf', 'dsfdsf', '12345', 'fjsdfj')

    await deliveryAndPaymentPage.selectOtherPaymentOption()
    await deliveryAndPaymentPage.acceptTermsAndConditions()
    await deliveryAndPaymentPage.buySimCardWithPlan()
});

test('2] Verify the free SIM purchase flow', async ({ page }) => {
    const homePage = new HomePage(page);
    const checkoutPage = new CheckoutPage(page);
    const deliveryAndPaymentPage = new DeliveryAndPaymentPage(page);

    await homePage.open()
    await homePage.acceptCookies()
    await homePage.goToPrepaidPlans()

    await checkoutPage.checkoutPlan()

    await deliveryAndPaymentPage.fillPersonalDetails('Pratik', 'Narute', 'dflkhf@kfdh.com')
    await deliveryAndPaymentPage.fillAddressManually('sdff', 'sdfdsfdsf', 'dsfdsf', '12345', 'fjsdfj')

    await deliveryAndPaymentPage.selectOtherPaymentOption()
    await deliveryAndPaymentPage.acceptTermsAndConditions()
    await deliveryAndPaymentPage.buySimCardWithPlan()
});


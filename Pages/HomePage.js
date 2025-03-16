const UIAction = require('../Base/UIAction');

class HomePage extends UIAction {
    constructor(page) {
        super();  // Ensure parent class is properly initialized
        this.page = page;  // Assign the page object
        this.acceptCookiesButton = this.page.locator("//button[text()='Accept All Cookies']");
        this.prepaidPlansLink = this.page.locator("//a[text()='Prepaid Plans']");
    }

    async open() {
        await this.page.goto('https://www.lycamobile.at/en/');
    }

    async acceptCookies() {
        await this.clickElement(this.acceptCookiesButton, "Accept Cookies Button");
    }

    async goToPrepaidPlans() {
        await this.clickElement(this.prepaidPlansLink, "Prepaid Plans Link");
    }
}

module.exports = HomePage;

const UIAction = require('../Base/UIAction');

class HomePage extends UIAction {
   
    constructor(page) {
        super();  // Ensure parent class is properly initialized
        this.page = page;  // Assign the page object

        // Define standalone locators
        this.acceptCookiesButton = this.page.locator("//button[text()='Accept All Cookies']");
        this.prepaidPlansLink = this.page.locator("//a[text()='Prepaid Plans']");

        // Menu list elements (return locators)
        this.menuElements = {
            menuListLogo: this.page.locator('#mobile-logo-button'),
            joinLycaTodayLink: this.page.locator('#side-menu-0').getByText('Join Lyca today'),
            sideMenuContainer0: this.page.locator('#side-menu-container-0'),
            alreadyWithLycaLink: this.page.getByText('Already with Lyca', { exact: true }),
            sideMenuContainer1: this.page.locator('#side-menu-container-1'),
            helpSupportLink: this.page.getByText('Help & support', { exact: true }),
            collapseMenu: this.page.locator('#collapse-menu'),
            lycaMobileAustriaLink: this.page.locator('#side-menu-3').getByText('Lyca Mobile Austria'),
            sideMenuContainer3: this.page.locator('#side-menu-container-3'),
            languageMenu: this.page.getByText('Language'),
            languageOption: this.page.getByText('Languageen')
        };
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
    async menuList() {
        await this.clickElement(this.menuElements.menuListLogo, "Menu List Logo");
        await this.clickElement(this.menuElements.joinLycaTodayLink, "Join Lyca Today");
        await this.clickElement(this.menuElements.sideMenuContainer0, "Side Menu Container 0");
        await this.clickElement(this.menuElements.alreadyWithLycaLink, "Already with Lyca");
        await this.clickElement(this.menuElements.sideMenuContainer1, "Side Menu Container 1");
        await this.clickElement(this.menuElements.helpSupportLink, "Help & Support");
        await this.clickElement(this.menuElements.collapseMenu, "Collapse Menu");
        await this.clickElement(this.menuElements.lycaMobileAustriaLink, "Lyca Mobile Austria");
        await this.clickElement(this.menuElements.sideMenuContainer3, "Side Menu Container 3");
        await this.clickElement(this.menuElements.languageMenu, "Language Menu");
        await this.clickElement(this.menuElements.languageOption, "Language Option");
    }

}

    

module.exports = HomePage;

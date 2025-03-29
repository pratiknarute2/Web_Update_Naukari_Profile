const { expect } = require('@playwright/test');
const UIAction = require('../Base/UIAction');


class DeliveryAndPaymentPage extends UIAction {
    constructor(page) {
        super();  // Ensure parent class is properly initialized
        this.page = page;  // Assign the page object
        
        // Personal Details
        this.firstNameField = this.page.getByRole('textbox', { name: 'First Name' });
        this.lastNameField = this.page.getByRole('textbox', { name: 'Last Name' });
        this.emailField = this.page.getByRole('textbox', { name: 'Email Address' });
        this.confirmPersonalDetailsButton = this.page.getByRole('button', { name: 'Confirm & continue' });

        // Address Fields
        this.enterAddressManually = this.page.getByText('Enter address manually');
        this.streetNameField = this.page.getByRole('textbox', { name: 'Street Name' });
        this.houseBuildingField = this.page.getByRole('textbox', { name: 'House/Building No' });
        this.doorNumberField = this.page.getByRole('textbox', { name: 'Door Number' });
        this.postalCodeField = this.page.getByRole('textbox', { name: 'Postal code' });
        this.cityField = this.page.getByRole('textbox', { name: 'City' });
        this.confirmAddressButton = this.page.getByRole('button', { name: 'Confirm & continue' });

        // Payment
        this.otherPaymentOptions = this.page.getByText('Other Payment Options');
        this.termsCheckbox = this.page.locator('#switch-terms-n');
        this.updatesCheckbox = this.page.locator('#switch-updates-n');
        this.confirmPayButton = this.page.getByRole('button', { name: 'Confirm & pay   €' });
        this.buyWithGPayButton = this.page.getByRole('button', { name: 'Buy with GPay' });
    }

    async fillPersonalDetails(firstName, lastName, email) {
        await this.fillInputField(this.firstNameField, firstName, "First Name Field");
        await this.fillInputField(this.lastNameField, lastName, "Last Name Field");
        await this.fillInputField(this.emailField, email, "Email Field");
        await this.clickElement(this.confirmPersonalDetailsButton, "Confirm & Continue Button");
    }

    async fillAddressManually(street, houseNo, doorNo, postalCode, city) {
        await this.clickElement(this.enterAddressManually, "Enter Address Manually");
        await this.fillInputField(this.streetNameField, street, "Street Name Field");
        await this.fillInputField(this.houseBuildingField, houseNo, "House/Building No Field");
        await this.fillInputField(this.doorNumberField, doorNo, "Door Number Field");
        await this.fillInputField(this.postalCodeField, postalCode, "Postal Code Field");
        await this.fillInputField(this.cityField, city, "City Field");
        await this.clickElement(this.confirmAddressButton, "Confirm & Continue Button");
    }

    async selectOtherPaymentOption() {
        await this.clickElement(this.otherPaymentOptions, "Other Payment Options");
    }

    async acceptTermsAndConditions() {
        await this.clickElement(this.termsCheckbox, "Terms & Conditions Checkbox");
        await this.clickElement(this.updatesCheckbox, "Updates Checkbox");
    }

    async buySimCardWithPlan() {
        await this.clickElement(this.confirmPayButton, "Confirm & Pay Button");
        await this.isDisplayed(this.buyWithGPayButton, "Buy with pay button")
    }
} 

module.exports = DeliveryAndPaymentPage;

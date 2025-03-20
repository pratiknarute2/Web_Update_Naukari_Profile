const UIAction = require('../Base/UIAction');

class CheckoutPage extends UIAction {
    constructor(page) {
        super();  // Ensure parent class is properly initialized
        this.page = page;  // Assign the page object
        this.buyNowButton = this.page.locator('[id="drawer-containerNational\\ L"]').getByRole('button', { name: 'Buy now' });
        this.checkedSimCardButton = this.page.getByRole('button', { name: 'Checked SIM card' });
        this.checkoutNowButton = this.page.getByRole('button', { name: 'Checkout now' });
    }

    async checkoutPlan() {
        await this.clickElement(this.buyNowButton, "Buy Now Button");
        await this.clickElement(this.checkedSimCardButton, "Checked SIM Card Button");
        await this.clickElement(this.checkoutNowButton, "Checkout Now Button");
    }
}

module.exports = CheckoutPage;

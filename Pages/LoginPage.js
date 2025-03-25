const { expect } = require('@playwright/test');
const UIAction = require('../Base/UIAction');

class LoginPage extends UIAction {
    constructor(page) {
        super(page);  // Pass page to parent class
        this.page = page;  

        this.username = page.getByRole('textbox', { name: 'Enter Username' });
        this.password = page.getByRole('textbox', { name: 'Enter Password' });
        this.loginButton = page.getByRole('button', { name: 'login' }); 
        this.addLeadButton = page.getByRole('button', { name: 'ADD LEAD' }); 
    }

    async openLogin() {
        await this.page.goto('https://uatdreamcity.kolonizer.in/login');
    }

    async openDashboard(){
        await this.page.goto('https://uatdreamcity.kolonizer.in/dashboard/sales-dashboard');
    }

    async enterUsername() {
        await this.fillInputField(this.username, 'nikhil@kolonizer.com', 'Username field');
    }

    async enterPassword() {
        await this.fillInputField(this.password, '123', 'Password field');
    }

    async clickOnLogin() {
        await this.clickElement(this.loginButton, 'Login Button');
        await this.page.waitForTimeout(6000);
        await this.isDisplayed(this.addLeadButton, 'Add lead button');
    }

    async postLoginAPI(request) {
        const loginResponse = await request.post('https://uatnode.kolonizer.in/master/api/signIn', {
            data: {
                username: 'nikhil@kolonizer.com',
                password: '123'
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });

        expect(loginResponse.ok()).toBeTruthy();

        const responseData = await loginResponse.json();
        this.token = responseData.token;
        console.log("Token:", this.token);

        return this.token;
    }
}

module.exports = LoginPage;

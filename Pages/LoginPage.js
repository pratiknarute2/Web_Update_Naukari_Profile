const { expect } = require('@playwright/test');
// const fs = require('fs'); // Import File System module

import UIAction from '../Base/UIAction';
import fs from 'fs'

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
        // Read JSON file
        const loginPayload = JSON.parse(fs.readFileSync('API/Payloads/Login.json', 'utf-8'));           
        const loginResponse = await request.post('https://uatnode.kolonizer.in/master/api/signIn', {
            data: loginPayload,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        expect(loginResponse.ok()).toBeTruthy();

        const responseData = await loginResponse.json();
        console.log("Response of Post Login API:", JSON.stringify(responseData, null, 1));

        this.token = responseData.token;
        console.log("Token:", this.token);

        return this.token;
    }

    async getProjectAPI(request, token) {
        const getProjectResponse = await request.get('https://uatnode.kolonizer.in/master/api/projectOrgwise', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    
        // ✅ Correct syntax for expect
        expect(getProjectResponse.ok()).toBeTruthy();
    
        // ✅ Properly await and log response data
        const responseData = await getProjectResponse.json();
        console.log("Response of Get Project API:", JSON.stringify(responseData, null, 2))
        
    }
 




}


module.exports = LoginPage;

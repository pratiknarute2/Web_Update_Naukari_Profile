const { expect } = require('@playwright/test');
const UIAction = require("../Base/UIAction");
const path = require('path');

class Job extends UIAction {
    constructor(page) {
        super(page); // Pass page to parent class
        this.page = page;

        this.emailTab = page.getByRole('textbox', { name: 'Enter your active Email ID /' });
        this.passTab = page.getByRole('textbox', { name: 'Enter your password' });
        this.loginButton = page.getByRole('button', { name: 'Login', exact: true });
        this.loginHeader = page.getByRole('link', { name: 'Login', exact: true });
        this.viewProfileButton = page.getByRole('link', { name: 'View profile' });
        this.completeProfileButton = page.locator("//a[text()='Complete']");

        this.updateResumeButton = page.getByRole('button', { name: 'Update resume' });
        this.uploadResumeLink = page.locator("//span[text()='Upload resume']");
    }

    async updateNaukaryProfile(username, password) {
        await this.navigateOnURL(this.page, 'https://www.naukri.com/');
        await this.clickElement(this.loginHeader, 'Login Header');
        await this.fillInputField(this.emailTab, username, 'Username field');
        await this.fillInputField(this.passTab, password, 'Password field');
        await this.clickElement(this.loginButton, 'Login Button');
        let isVisible = await this.isDisplay(this.viewProfileButton,3000,'View Profile Button')
        if (isVisible) {
            await this.clickElement(this.viewProfileButton, 'View Profile Button');
        } else {
            await this.clickElement(this.completeProfileButton, 'Complete Profile Button');
        }

        isVisible = await this.isDisplay(this.updateResumeButton,2000,'Update Resume Button')
        const [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser'),
            isVisible
                ? this.clickElement(this.updateResumeButton, 'Update Resume Button')
                : this.clickElement(this.uploadResumeLink, 'Upload Resume Link')
        ]);
        const currentDir = process.cwd();
        console.log('currentDir: '+currentDir)
        await fileChooser.setFiles(currentDir+'/Files/Prajwal_Narute.pdf');
        await this.page.waitForTimeout(5000); // 5s wait (adjust if needed)
    }
}

module.exports = Job;

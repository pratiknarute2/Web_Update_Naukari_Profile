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
        this.viewProfileButton = page.locator("//p[text()='Last updated ']/following-sibling::div//a[@href='/mnjuser/profile']");
        this.completeProfileButton = page.locator("//a[text()='Complete']");

        this.updateResumeButton = page.getByRole('button', { name: 'Update resume' });
        this.uploadResumeLink = page.locator("//span[text()='Upload resume']");
        this.editKeySkillIcon = page.locator('#lazyKeySkills').getByText('editOneTheme');
        this.skillTab = page.getByRole('textbox', { name: 'Add skills' });
        this.saveSkillButton = page.getByRole('button', { name: 'Save' });
        this.closeIconWelcomeWindow = page.locator('.crossIcon');
    }

    async updateNaukaryProfile(username, password, pdfName, skillName) {
        // Navigate to Naukri homepage
        await this.navigateOnURL(this.page, 'https://www.naukri.com/');

        // Click on the login header
        await this.clickElement(this.loginHeader, 'Login Header');

        // Enter credentials
        await this.fillInputField(this.emailTab, username, 'Username field');
        await this.fillInputField(this.passTab, password, 'Password field');
        await this.clickElement(this.loginButton, 'Login Button');

        // Wait after login
        await this.page.waitForTimeout(5000);

        // Close welcome popup if displayed
        if (await this.isDisplay(this.closeIconWelcomeWindow, 1000, 'Welcome Window close Icon')) {
            await this.clickElement(this.closeIconWelcomeWindow, 'Welcome Window close Icon');
        }

        // Go to profile
        let isVisible = await this.isDisplay(this.viewProfileButton, 4000, 'View Profile Button');
        if (isVisible) {
            await this.clickElement(this.viewProfileButton, 'View Profile Button');
        } else {
            await this.clickElement(this.completeProfileButton, 'Complete Profile Button');
        }

        // Resume upload
        await this.page.waitForTimeout(4000);
        isVisible = await this.isDisplay(this.updateResumeButton, 2000, 'Update Resume Button');

        const [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser'),
            isVisible
                ? this.clickElement(this.updateResumeButton, 'Update Resume Button')
                : this.clickElement(this.uploadResumeLink, 'Upload Resume Link')
        ]);

        const currentDir = process.cwd();
        await fileChooser.setFiles(`${currentDir}/Files/${pdfName}`);

        // Edit skills
        await this.clickElement(this.editKeySkillIcon, 'Edit Skill Icon');

        // Build dynamic close icon locator
        let closeIconLocator = this.page.locator(`//span[text()='${skillName}']/following-sibling::a`);

        if (await this.isDisplay(closeIconLocator, 3000, `${skillName} Skill box close icon`)) {
            await this.clickElement(closeIconLocator, `${skillName} Skill box close icon`);
        }

        // Add new skill
        await this.clickElement(this.skillTab, 'Skill Tab');
        await this.page.waitForTimeout(1000);
        await this.skillTab.type(skillName, { delay: 300 });
        await this.page.waitForTimeout(2000);

        // Pick skill suggestion from dropdown only
        let suggestionTextLocator = this.page
            .locator('#sugDrp_keySkillSugg')
            .getByText(skillName, { exact: true });

        await this.clickElement(suggestionTextLocator, `${skillName} Suggestion`);

        // Save skill
        await this.clickElement(this.saveSkillButton, 'Save Button');
        await this.page.waitForTimeout(5000);
    }
}

module.exports = Job;

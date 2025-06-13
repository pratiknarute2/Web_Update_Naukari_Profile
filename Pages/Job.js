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
        this.editKeySkillIcon =  page.locator('#lazyKeySkills').getByText('editOneTheme')
        this.skillTab =  page.getByRole('textbox', { name: 'Add skills' })
        this.nodeJsCloseIcon =  page.getByTitle('Node.js').getByRole('link')
       this.nodeJsSuggestion = page.getByText('Node.js').nth(1); 
       this.saveSkillButton = page.getByRole('button', { name: 'Save' })
    }

  async updateNaukaryProfile(username, password) {
    // Navigate to Naukri homepage
    await this.navigateOnURL(this.page, 'https://www.naukri.com/');

    // Click on the login header to open login form
    await this.clickElement(this.loginHeader, 'Login Header');

    // Enter username/email in the login input field
    await this.fillInputField(this.emailTab, username, 'Username field');

    // Enter password in the password input field
    await this.fillInputField(this.passTab, password, 'Password field');

    // Click the login button to submit credentials
    await this.clickElement(this.loginButton, 'Login Button');

    // Check if the "View Profile" button is visible within 3 seconds
    await this.page.waitForTimeout(5000); 
    let isVisible = await this.isDisplay(this.viewProfileButton, 10000, 'View Profile Button');

    if (isVisible) {
        // If visible, click on "View Profile" button to proceed
        await this.clickElement(this.viewProfileButton, 'View Profile Button');
    } else {
        // Otherwise, click on "Complete Profile" button (likely for new users)
        await this.clickElement(this.completeProfileButton, 'Complete Profile Button');
    }

    // Check if "Update Resume" button is visible within 2 seconds
    await this.page.waitForTimeout(4000); 
    isVisible = await this.isDisplay(this.updateResumeButton, 2000, 'Update Resume Button');

    // Wait for the file chooser event triggered by clicking the resume upload element
    const [fileChooser] = await Promise.all([
        this.page.waitForEvent('filechooser'),
        // Click either the update or upload resume button based on visibility
        isVisible
            ? this.clickElement(this.updateResumeButton, 'Update Resume Button')
            : this.clickElement(this.uploadResumeLink, 'Upload Resume Link')
    ]);

    // Get the current working directory path (where script is running)
    const currentDir = process.cwd();
    console.log('currentDir: ' + currentDir);

    // Set the file to be uploaded (resume PDF) using the file chooser dialog
    await fileChooser.setFiles(currentDir + '/Files/Prajwal_Narute.pdf');

    await this.clickElement(this.editKeySkillIcon, 'Edit Skill Icon')
     if(await this.isDisplay(this.nodeJsCloseIcon,3000,'Node.js Skill box')){
        await this.clickElement(this.nodeJsCloseIcon, 'Node.js Skill box')
    }
    await this.clickElement(this.skillTab, 'Skill Tab')
    await this.skillTab.type('Node.js', {delay: 200 });
    await this.page.waitForTimeout(2000); 
    await this.clickElement(this.nodeJsSuggestion,'Node.js Sugggetion')
    await this.clickElement(this.saveSkillButton,'Save Button')
    await this.page.waitForTimeout(5000); 
}

}

module.exports = Job;

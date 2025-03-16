class UIAction {
    async clickElement(locator, stepName) {
        console.log(`🔄 Clicking: ${stepName}`);
        try {
            await locator.click();
            console.log(`✅ Clicked: ${stepName}`);
        } catch (error) {
            console.error(`❌ Failed to click ${stepName}: ${error.message}`);
        }
        console.log('-'.repeat(100));

    }

    async fillInputField(locator, value, stepName) {
        console.log(`🔄 Filling: ${stepName}`);
        try {
            await locator.fill(value);
            console.log(`✅ Filled: ${stepName} with value: ${value}`);
        } catch (error) {
            console.error(`❌ Failed to fill ${stepName}: ${error.message}`);
        }
        console.log('-'.repeat(100));
    }

    async verifyElementVisible(locator, stepName) {
        console.log(`🔄 Verifying: ${stepName}`);
        
        try {
            await expect(locator).toBeVisible({ timeout: 5000 });
            console.log(`✅ Verified: ${stepName} is visible`);
        } catch (error) {
            console.error(`❌ ${stepName} is NOT visible`);
            throw new Error(`${stepName} is NOT visible`);  // Force the test to fail
        }
        console.log('-'.repeat(100));
    }
    
    async selectDropdown(locator, value, stepName) {
        console.log(`🔄 Selecting: ${stepName}`);
        try {
            await locator.selectOption(value);
            console.log(`✅ Selected: ${stepName} with value: ${value}`);
        } catch (error) {
            console.error(`❌ Failed to select ${stepName}: ${error.message}`);
        }
        console.log('-'.repeat(100));
    }

    async checkCheckbox(locator, stepName) {
        console.log(`🔄 Checking: ${stepName}`);
        try {
            await locator.check();
            console.log(`✅ Checked: ${stepName}`);
        } catch (error) {
            console.error(`❌ Failed to check ${stepName}: ${error.message}`);
        }
        console.log('-'.repeat(100));
    }

    async uncheckCheckbox(locator, stepName) {
        console.log(`🔄 Unchecking: ${stepName}`);
        try {
            await locator.uncheck();
            console.log(`✅ Unchecked: ${stepName}`);
        } catch (error) {
            console.error(`❌ Failed to uncheck ${stepName}: ${error.message}`);
        }
        console.log('-'.repeat(100));
    }
}

module.exports = UIAction;

class UIAction {
    async clickElement(locator, stepName) {
        process.stdout.write(`\r🔄 Clicking: ${stepName} | `);
        try {
            await locator.click();
            process.stdout.write(`\r✅ Clicked: ${stepName}   \n`);
        } catch (error) {
            process.stdout.write(`\r❌ Failed to click ${stepName}: ${error.message}   \n`);
        }
        console.log('-'.repeat(100));
    }

    async fillInputField(locator, value, stepName) {
        process.stdout.write(`\r🔄 Filling: ${stepName} | `);
        try {
            await locator.fill(value);
            process.stdout.write(`\r✅ Filled: ${stepName} with [value: ${value}]   \n`);
        } catch (error) {
            process.stdout.write(`\r❌ Failed to fill ${stepName}: ${error.message}   \n`);
        }
        console.log('-'.repeat(100));
    }

    async verifyElementVisible(locator, stepName) {
        process.stdout.write(`\r🔄 Verifying: ${stepName} | `);
        try {
            await expect(locator).toBeVisible({ timeout: 5000 });
            process.stdout.write(`\r✅ Verified: ${stepName} is visible   \n`);
        } catch (error) {
            process.stdout.write(`\r❌ ${stepName} is NOT visible   \n`);
            throw new Error(`${stepName} is NOT visible`);
        }
        console.log('-'.repeat(100));
    }

    async selectDropdown(locator, value, stepName) {
        process.stdout.write(`\r🔄 Selecting: ${stepName}... `);
        try {
            await locator.selectOption(value);
            process.stdout.write(`\r✅ Selected: ${stepName} with [value: ${value}]   \n`);
        } catch (error) {
            process.stdout.write(`\r❌ Failed to select ${stepName}: ${error.message}   \n`);
        }
        console.log('-'.repeat(100));
    }

    async checkCheckbox(locator, stepName) {
        process.stdout.write(`\r🔄 Checking: ${stepName}... `);
        try {
            await locator.check();
            process.stdout.write(`\r✅ Checked: ${stepName}   \n`);
        } catch (error) {
            process.stdout.write(`\r❌ Failed to check ${stepName}: ${error.message}   \n`);
        }
        console.log('-'.repeat(100));
    }

    async uncheckCheckbox(locator, stepName) {
        process.stdout.write(`\r🔄 Unchecking: ${stepName}... `);
        try {
            await locator.uncheck();
            process.stdout.write(`\r✅ Unchecked: ${stepName}   \n`);
        } catch (error) {
            process.stdout.write(`\r❌ Failed to uncheck ${stepName}: ${error.message}   \n`);
        }
        console.log('-'.repeat(100));
    }
}

module.exports = UIAction;

class UIAction {
    async clickElement(locator, stepName) {
        const startTime = performance.now();

        try {
            await locator.waitFor({ state: "visible", timeout: 10000 }); // Increased timeout
            await locator.scrollIntoViewIfNeeded(); // Ensure element is in view

            const foundTime = ((performance.now() - startTime) / 1000).toFixed(2);
            process.stdout.write(`\r🔄 Clicking: [${stepName}] & found in ${foundTime} sec | `);

            await locator.click();
            process.stdout.write(`✅ Clicked: [${stepName}]\n`);
        } catch (error) {
            const errorMessage = `Failed to click [${stepName}] --> ${error.message}`;
            process.stdout.write(`❌ ${errorMessage}\n`);
            throw new Error(errorMessage);
        }

        console.log('-'.repeat(100));
    }

    async fillInputField(locator, value, stepName) {
        const startTime = performance.now();

        try {
            await locator.waitFor({ state: "visible", timeout: 10000 }); // Increased timeout
            await locator.scrollIntoViewIfNeeded(); // Ensure element is in view

            const foundTime = ((performance.now() - startTime) / 1000).toFixed(2);
            process.stdout.write(`\r🔄 Filling: [${stepName}] & found in ${foundTime} sec | `);

            await locator.fill(value);
            process.stdout.write(`✅ Filled: [${stepName}] with [value: ${value}]\n`);
        } catch (error) {
            const errorMessage = `Failed to fill [${stepName}] --> ${error.message}`;
            process.stdout.write(`❌ ${errorMessage}\n`);
            throw new Error(errorMessage);
        }
        console.log('-'.repeat(100));
    }

    async verifyElementVisible(locator, stepName) {
        process.stdout.write(`🔄 Verifying: [${stepName}] | `);
        const startTime = performance.now();

        try {
            await locator.waitFor({ state: "visible", timeout: 10000 }); // Increased timeout
            await locator.scrollIntoViewIfNeeded(); // Ensure element is in view

            const endTime = performance.now();
            const timeTaken = ((endTime - startTime) / 1000).toFixed(2);
            process.stdout.write(`✅ Found in ${timeTaken} sec | Verified: [${stepName}] is visible\n`);
        } catch (error) {
            const errorMessage = `Failed to verify visibility of [${stepName}] --> ${error.message}`;
            process.stdout.write(`❌ ${errorMessage}\n`);
            throw new Error(errorMessage);
        }

        console.log('-'.repeat(100));
    }
}

module.exports = UIAction;

const { expect } = require('@playwright/test');

class UIAction {
    async clickElement(locator, stepName) {
        const startTime = performance.now();
        process.stdout.write(`🔄 Clicking: ${stepName}...\n`);

        try {
            await locator.waitFor({ state: 'visible', timeout: 10000 }); // Increased timeout
            await locator.scrollIntoViewIfNeeded(); // Ensure element is in view

            const timeTaken = ((performance.now() - startTime) / 1000).toFixed(2);
            await locator.click();
            process.stdout.write(`✅ Clicked [${stepName}]\n`);
            process.stdout.write(`⏳ Time taken: ${timeTaken} sec\n`);
        } catch (error) {
            const errorMessage = `❌ Failed to click [${stepName}] --> ${error.message}`;
            process.stdout.write(`${errorMessage}\n`);
            throw new Error(errorMessage);
        }
        console.log('-'.repeat(100));
    }

    async fillInputField(locator, value, stepName) {
        const startTime = performance.now();
        process.stdout.write(`🔄 Filling: ${stepName}...\n`);

        try {
            await locator.waitFor({ state: "visible", timeout: 10000 }); // Increased timeout
            await locator.scrollIntoViewIfNeeded(); // Ensure element is in view

            await locator.fill(value);
            const timeTaken = ((performance.now() - startTime) / 1000).toFixed(2);
            process.stdout.write(`✅ Filled [${stepName}] with value: ${value}\n`);
            process.stdout.write(`⏳ Time taken: ${timeTaken} sec\n`);
        } catch (error) {
            const errorMessage = `❌ Failed to fill [${stepName}] --> ${error.message}`;
            process.stdout.write(`${errorMessage}\n`);
            throw new Error(errorMessage);
        }
        console.log('-'.repeat(100));
    }

    async isDisplayed(locator, stepName) {
        process.stdout.write(`🔄 Verifying: ${stepName}...\n`);
        const startTime = performance.now();
    
        try {
            await locator.waitFor({ state: "visible", timeout: 10000 }); // Ensures visibility
            await locator.scrollIntoViewIfNeeded(); // Ensures element is in view

            await expect(locator).toBeVisible(); // ✅ Fixed missing `await`
            process.stdout.write(`✅ Found [${stepName}]\n`);
        } catch (error) {
            const errorMessage = `❌ Failed to verify visibility of [${stepName}] --> ${error.message}`;
            process.stdout.write(`${errorMessage}\n`);
            throw new Error(errorMessage);
        } finally {
            const timeTaken = ((performance.now() - startTime) / 1000).toFixed(2);
            process.stdout.write(`⏳ Time taken: ${timeTaken} sec\n`);
            console.log('-'.repeat(100));
        }
        
    }
    async expectToBe(actual, expected, errorMessage){
        console.log(`Actual: ${actual} | Expected: ${expected}`)
        try{
            await expect(actual).toBe(expected)
        }catch(error){
            const formattedErrorMessage = `❌ ${errorMessage} Expected: ${expected}, but got: ${actual} ==> ${error.message}`;
            process.stdout.write(`${formattedErrorMessage}\n`);
            throw new Error(formattedErrorMessage);
        }finally{
            console.log('-'.repeat(100));
        }
       
    }
}

module.exports = UIAction;

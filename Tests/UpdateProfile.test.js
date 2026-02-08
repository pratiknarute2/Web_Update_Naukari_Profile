const { test, expect } = require('@playwright/test');
const Job = require("../Pages/Job.js");

test.describe.parallel('Update Profile', () => {
    test('Update Naukri Profile of Prajwal for Pune Location', async ({ page }) => {
        const job = new Job(page)
        await job.updateNaukaryProfile('prajwalnarute2002@gmail.com', 'Prajwal@123', 'Prajwal_Resume_Pune.pdf', 'Scalability')
    });
    test('Update Naukri Profile of Prajwal for Banglore Location', async ({ page }) => {
        const job = new Job(page)
        await job.updateNaukaryProfile('prajwalnarute100@gmail.com', 'Prajwal@123', 'Prajwal_Resume_Bengaluru.pdf', 'Scalability')
    });
    test('Update Naukri Profile of Prajwal for Hyderabad Location', async ({ page }) => {
        const job = new Job(page)
        await job.updateNaukaryProfile('prajwalnarute12@gmail.com', 'Prajwal@123', 'Prajwal_Resume_Hyderabad.pdf', 'Scalability')
    });
    test('Update Naukri Profile of Pratik for Mumbai Location', async ({ page }) => {
        const job = new Job(page)
        await job.updateNaukaryProfile('pratiknarute2@gmail.com', 'Pratik@123', 'Pratik_Resume.pdf', 'Python')
    });

    test('Update Naukri Profile of Narendra for Bhopal Location', async ({ page }) => {
        const job = new Job(page)
        await job.updateNaukaryProfile('narendraahirwar0306@gmail.com', 'Narendra.@123', 'Narendra_Resume.pdf', 'Node.js')
    });

})
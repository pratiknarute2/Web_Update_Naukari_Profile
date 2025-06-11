const { test, expect } = require('@playwright/test');
const Job = require("../Pages/Job.js");

test.describe('Update Profile', () => {
    test('Update Naukri Profile of Prajwal', async({page})=>{
        const job = new Job(page)
        await job.updateNaukaryProfile('prajwalnarute2002@gmail.com', 'Prajwal@123')
    });

})
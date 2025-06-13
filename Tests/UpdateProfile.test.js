const { test, expect } = require('@playwright/test');
const Job = require("../Pages/Job.js");

test.describe.parallel('Update Profile', () => {
    test('Update Naukri Profile of Prajwal for Pune Location', async({page})=>{
        const job = new Job(page)
        await job.updateNaukaryProfile('prajwalnarute2002@gmail.com', 'Prajwal@123','Prajwal_Narute.pdf')
    });
     test('Update Naukri Profile of Prajwal for Banglore Location', async({page})=>{
        const job = new Job(page)
        await job.updateNaukaryProfile('prajwalnarute100@gmail.com', 'Prajwal@123','Prajwal_Narute2.pdf')
    });

})
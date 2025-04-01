const { expect } = require('@playwright/test');
const UIAction = require('../Base/UIAction');


class LeadPage extends UIAction{
    constructor(page){
        super()
        this.page = page

        this.totalLeadItems = page.locator("(//div[contains(text(),' Items per page')])[1]/parent::div/following-sibling::div//div")
        this.sales = page.locator('a').filter({ hasText: 'trending_upSales' })
        this.allLead = page.getByRole('link', { name: ' All lead' })
    }

    async getAllLeadAPI(request, token) {
        const getLeadAPIResponse = await request.get('https://uatnode.kolonizer.in/master/api/lead', {
            params: { 
                type: 'all'
             },  
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Feature': 'Leads',
                'Path': 'lead/lead'
            }
        });
    
        // ✅ Ensure response is successful
        expect(getLeadAPIResponse.ok()).toBeTruthy();
    
        // ✅ Properly await and log response data
        const responseData = await getLeadAPIResponse.json();
        console.log("Total Lead Count:", JSON.stringify(responseData.leads.totalcountData, null, 2));
    
        return responseData.leads.totalcountData;
    }
    
    async verifyTotalLeadCount(expectedCount){
        await this.clickElement(this.sales,"Sale menu list")
        await this.page.goto('https://uatdreamcity.kolonizer.in/lead/lead?type=all')
        // await this.clickElement(this.allLead,"All lead sub menu list")
        await this.isDisplayed(this.totalLeadItems,'Total lead items')
        let actualCount =await this.totalLeadItems.textContent()
        actualCount = actualCount.split('of')
        actualCount = actualCount[1].trim()
        actualCount = Number(actualCount)

        await expect(actualCount, '❌ Should be match lead count bet UI and API level').toBe(expectedCount)
        console.log(`✅ Assertion Passed: Lead count matches between UI and API => Actual:${actualCount} | expected:${expectedCount}`);
    }

}
module.exports = LeadPage


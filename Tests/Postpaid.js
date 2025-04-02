(async () => {
    const APIs = {
        1: 'https://paymonthly-ukstage.ldsvcplatform.com/app/api_v1/GeneralSettings/settings?TRANSACTION_ID=&COUNTRY_CODE=UK&COUNTRY_REQ=GBR&API_VERSION=api_v1&BUNDLE_CATEGROY=Post%20Paid%20Bundles&LANG=en',
        2: 'https://paymonthly-ukstage.ldsvcplatform.com/app/api_v1/PostpaidBundles/getAllHomeBundles?TRANSACTION_ID=&COUNTRY_CODE=UK&COUNTRY_REQ=GBR&API_VERSION=api_v1&BUNDLE_CATEGROY=Post%20Paid%20Bundles,Marketing%20Bundles&LANG=en',
        3: 'https://paymonthly-ukstage.ldsvcplatform.com/app/api_v1/GeneralSettings/banners?TRANSACTION_ID=&COUNTRY_CODE=UK&COUNTRY_REQ=GBR&API_VERSION=api_v1&BUNDLE_CATEGROY=Post%20Paid%20Bundles&LANG=en',
        4: 'https://paymonthly-ukstage.ldsvcplatform.com/app/api_v1/GetPages/getFAQs?TRANSACTION_ID=&COUNTRY_CODE=UK&COUNTRY_REQ=GBR&API_VERSION=api_v1&BUNDLE_CATEGROY=Post%20Paid%20Bundles&LANG=en',
        5: 'https://paymonthly-ukstage.ldsvcplatform.com/app/api_v1/Menu/getMenu?TRANSACTION_ID=&COUNTRY_CODE=UK&COUNTRY_REQ=GBR&API_VERSION=api_v1&BUNDLE_CATEGROY=Post%20Paid%20Bundles&LANG=en',
        6: 'https://paymonthly-ukstage.ldsvcplatform.com/app/api_v1/GetPPPages/getWhyChooseLyca?TRANSACTION_ID=&COUNTRY_CODE=UK&COUNTRY_REQ=GBR&API_VERSION=api_v1&BUNDLE_CATEGROY=Post%20Paid%20Bundles&LANG=en',
        7: 'https://paymonthly-ukstage.ldsvcplatform.com/app/api_v1/PostpaidBundles/getAllbundles?TRANSACTION_ID=&COUNTRY_CODE=UK&COUNTRY_REQ=GBR&API_VERSION=api_v1&BUNDLE_CATEGROY=Add%20on%20Bundles&LANG=en'
    };
    

   
    let countryName = prompt("Enter Country Name (at/au/uk):").trim().toLowerCase();

    if (!['at', 'au', 'uk'].includes(countryName)) {
        console.error("❌ Unsupported country! Please enter 'at' or 'au'.");
        return;
    }
 
    const availableCountryAPI = {};
    Object.entries(APIs).forEach(([key, value]) => {
        let newValue = value;
        
        if (countryName === 'at') {
            availableCountryAPI[`${key}-en`] = newValue;
            availableCountryAPI[`${key}-de`] = value.replace('lang=en', 'lang=de');
        } else if (countryName === 'au') {
            newValue = value.replace('.at', '.com.au').replace('AT', 'AU');
            availableCountryAPI[key] = newValue;
        }else if (countryName === 'uk') {
            availableCountryAPI[key] = newValue;
        }
    });

    console.log(`✅ Available APIs for ${countryName}:`);
    Object.entries(availableCountryAPI).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
    });

    let apiNumbersInput = prompt("Enter API Numbers (comma-separated, e.g., 1,3) or 'all':").trim().toLowerCase();
    let apiNumbers = apiNumbersInput === 'all'
        ? Object.keys(availableCountryAPI)
        : apiNumbersInput.split(',').map(num => num.trim()).filter(num => availableCountryAPI[num]);

    if (apiNumbers.length === 0) {
        console.error("❌ No valid API numbers provided!");
        return;
    }

    let results = [];
    let unexpectedAPIs = [];

    for (let apiNumber of apiNumbers) {
        let url = availableCountryAPI[apiNumber];
        console.log(`🚀 Checking API ${apiNumber}: ${url}`);

        try {
            let startTime = performance.now();
            const response = await fetch(url);
            let endTime = performance.now();
            let responseTime = `${(endTime - startTime).toFixed(2)} ms`;

            const status = response.status;
            const headers = Object.fromEntries(response.headers.entries());

            let responseSizeKB = headers['content-length']
                ? `${(parseInt(headers['content-length']) / 1024).toFixed(2)} KB`
                : `${(new Blob([await response.text()]).size / 1024).toFixed(2)} KB`;

            const expectedHeaders = {
                'cf-cache-status': 'HIT'
            };

            let headersStatus = "✅ Expected";
            let remarks = [];

            Object.entries(expectedHeaders).forEach(([header, expectedValue]) => {
                let actualValue = headers[header] || "Not Present";
                if (actualValue !== expectedValue) {
                    headersStatus = "❌ Unexpected";
                    remarks.push(`Expected: '${expectedValue}', Found: '${actualValue}'`);
                }
            });

            if (headersStatus === "❌ Unexpected") {
                unexpectedAPIs.push(url);
            }

            results.push({
                Country: countryName.toUpperCase(),
                API: url,
                StatusCode: status,
                ResponseTime: responseTime,
                ResponseSize: responseSizeKB,
                HeadersStatus: headersStatus,
                Remark: remarks.length > 0 ? remarks.join("\n") : "✅ All headers as expected"
            });

        } catch (error) {
            results.push({
                Country: countryName.toUpperCase(),
                API: url,
                StatusCode: "❌ Failed",
                ResponseTime: "N/A",
                ResponseSize: "N/A",
                HeadersStatus: "❌ Unexpected",
                Remark: `Failed to Fetch: ${error.message}`
            });
            unexpectedAPIs.push(url);
        }
    }

    console.table(results);

    if (unexpectedAPIs.length > 0) {
        console.log("\n🚨 List of APIs with unexpected headers:");
        console.log(unexpectedAPIs.join("\n"));
    } else {
        console.log("✅ All APIs have expected headers.");
    }
})();
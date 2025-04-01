(async () => {
    const APIs = {
            //done Home page, PLP, PDP, Quick top up
            1: 'https://www.lycamobile.at/bff/web/pim/v1/get-bundles?type=cvm&draft=false&lang=en',
            2: 'https://www.lycamobile.at/bff/web/pim/v1/get-bundles?type=cvm&draft=false&lang=de',
            3: 'https://www.lycamobile.at/bff/web/pim/v1/get-bundles?type=ca&draft=false&lang=en',
            4: 'https://www.lycamobile.at/bff/web/pim/v1/get-bundles?type=ca&draft=false&lang=de',
            5: 'https://www.lycamobile.at/bff/web/cms/v1/template/roaming-bundles?draft=false&lang=en',
            6: 'https://www.lycamobile.at/bff/web/cms/v1/template/roaming-bundles?draft=false&lang=de',
            7: 'https://www.lycamobile.at/bff/countries/v1/AT/config?draft=false&lang=en',
            8: 'https://www.lycamobile.at/bff/countries/v1/AT/config?draft=false&lang=de',
            9: 'https://www.lycamobile.at/bff/web/cms/category/v3/header?draft=false&lang=en',
            10: 'https://www.lycamobile.at/bff/web/cms/category/v3/header?draft=false&lang=de',
            11: 'https://www.lycamobile.at/bff/countries/v2/AT?draft=false&lang=en',
            12: 'https://www.lycamobile.at/bff/countries/v2/AT?draft=false&lang=de',
            13: 'https://www.lycamobile.at/bff/web/cms/category/v3/footer?draft=false&lang=en',
            14: 'https://www.lycamobile.at/bff/web/cms/category/v3/footer?draft=false&lang=de',
            15: 'https://www.lycamobile.at/bff/web/pim/v1/get-countries?draft=false&lang=en',
            16: 'https://www.lycamobile.at/bff/web/pim/v1/get-countries?draft=false&lang=de',
            17: 'https://www.lycamobile.at/bff/web/pim/v1/get-all/topup?draft=false&lang=en',
            18: 'https://www.lycamobile.at/bff/web/pim/v1/get-all/topup?draft=false&lang=de',
            19: 'https://www.lycamobile.at/bff/web/rate/v1/countries/roaming/AT?draft=false&lang=en',
            20: 'https://www.lycamobile.at/bff/web/rate/v1/countries/roaming/AT?draft=false&lang=de',
            21: 'https://www.lycamobile.at/bff/web/rate/v1/countries/roaming/AT',
            22: 'https://www.lycamobile.at/bff/web/rate/v1/countries/roaming',
            23: 'https://www.lycamobile.at/bff/web/cms/template/v3/9a724347-6be0-4468-af23-dc24049cdca2?draft=false&lang=en',
            24: 'https://www.lycamobile.at/bff/web/cms/template/v3/9a724347-6be0-4468-af23-dc24049cdca2?draft=false&lang=de',
            25: 'https://www.lycamobile.at/bff/web/cms/template/v3/b3b0b3ac-5905-4950-9795-98adfce36f65?draft=false&lang=en',
            26: 'https://www.lycamobile.at/bff/web/cms/template/v3/b3b0b3ac-5905-4950-9795-98adfce36f65?draft=false&lang=de',
            27: 'https://www.lycamobile.at/bff/web/cms/template/v3/389eb180-6e3f-428e-ac48-e0c7571fed1d?draft=false&lang=en',
            28: 'https://www.lycamobile.at/bff/web/cms/template/v3/389eb180-6e3f-428e-ac48-e0c7571fed1d?draft=false&lang=de',
            29: 'https://www.lycamobile.at/bff/payment/v1/apm-list/SIM?draft=false&lang=en',
            30: 'https://www.lycamobile.at/bff/payment/v1/apm-list/SIM?draft=false&lang=de'
       
    };


    let countryName = prompt("Enter Country Name (at/au):").toLowerCase();
    const availableCountryAPI = {};

    console.log(`✅ Available APIs for ${countryName}:`);

    if (countryName === 'at') {
        Object.entries(APIs).forEach(([key, value]) => {
            console.log(`${key}: ${value}`);
            availableCountryAPI[key] = value;  // ✅ Fixed object assignment
        });
    } else if (countryName === 'au') {
        Object.entries(APIs).forEach(([key, value]) => {
            if (value.includes('lang=en')) {
                let newValue = value.replace('.at', '.com.au');
                console.log(`${key}: ${newValue}`);
                availableCountryAPI[key] = newValue;  // ✅ Fixed object assignment
            }
        });
    }

    let apiNumbersInput = prompt("Enter API Numbers (comma-separated, e.g., 1,3) or 'all':");
    let apiNumbers = apiNumbersInput.toLowerCase() === 'all'
        ? Object.keys(availableCountryAPI)  // ✅ Use `availableCountryAPI`, not `APIs[countryName]`
        : apiNumbersInput.split(',').map(num => num.trim()).filter(num => availableCountryAPI[num]);

    if (apiNumbers.length === 0) {
        console.error("❌ No valid API numbers provided!");
        return;
    }

    let results = [];

    for (let apiNumber of apiNumbers) {
        let url = availableCountryAPI[apiNumber];  // ✅ Corrected API URL reference
        console.log(`🚀 Checking API ${apiNumber}: ${url}`);

        try {
            const response = await fetch(url);
            const status = response.status;
            const headers = Object.fromEntries(response.headers.entries());

            let responseSizeKB = "Unknown";
            if (headers['content-length']) {
                responseSizeKB = `${(parseInt(headers['content-length']) / 1024).toFixed(2)} KB`;
            } else {
                let responseBody = await response.text();
                responseSizeKB = `${(new Blob([responseBody]).size / 1024).toFixed(2)} KB`;
            }

            const expectedHeaders = {
                'cf-cache-status': 'HIT',
                'referrer-policy': 'same-origin, no-referrer',
                'content-security-policy': "default-src https: http: wss: 'self' data: 'unsafe-inline' blob:;"
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

            results.push({
                Country: countryName,
                API: url,
                StatusCode: status,
                ResponseSize: responseSizeKB,
                HeadersStatus: headersStatus,
                Remark: remarks.length > 0 ? remarks.join("\n") : "✅ All headers as expected"
            });

        } catch (error) {
            results.push({
                Country: countryName,
                API: url,
                StatusCode: "❌ Failed",
                ResponseSize: "N/A",
                HeadersStatus: "❌ Unexpected",
                Remark: `Failed to Fetch: ${error.message}`
            });
        }
    }

    console.table(results);
})();
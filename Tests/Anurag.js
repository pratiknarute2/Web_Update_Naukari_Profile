(async () => {
    const APIs = {
        // Done Pages for ==> Home, PLP, PDP, Quick top up, free sim, Help and support, Rates[National, International, Roaming], Add basket
        1: 'https://www.lycamobile.at/bff/web/pim/v1/get-bundles?type=cvm&draft=false&lang=en',
        2: 'https://www.lycamobile.at/bff/web/pim/v1/get-bundles?type=ca&draft=false&lang=en',
        3: 'https://www.lycamobile.at/bff/web/cms/v1/template/roaming-bundles?draft=false&lang=en',
        4: 'https://www.lycamobile.at/bff/countries/v1/AT/config?draft=false&lang=en',
        5: 'https://www.lycamobile.at/bff/web/cms/category/v3/header?draft=false&lang=en',
        6: 'https://www.lycamobile.at/bff/countries/v2/AT?draft=false&lang=en',
        7: 'https://www.lycamobile.at/bff/web/cms/category/v3/footer?draft=false&lang=en',
        8: 'https://www.lycamobile.at/bff/web/pim/v1/get-countries?draft=false&lang=en',
        9: 'https://www.lycamobile.at/bff/web/pim/v1/get-all/topup?draft=false&lang=en',
        10: 'https://www.lycamobile.at/bff/web/rate/v1/countries/roaming/AT?draft=false&lang=en',
        11: 'https://www.lycamobile.at/bff/web/rate/v1/countries/roaming/AT',
        12: 'https://www.lycamobile.at/bff/web/rate/v1/countries/roaming',
        13: 'https://www.lycamobile.at/bff/web/cms/template/v3/9a724347-6be0-4468-af23-dc24049cdca2?draft=false&lang=en',
        14: 'https://www.lycamobile.at/bff/web/cms/template/v3/b3b0b3ac-5905-4950-9795-98adfce36f65?draft=false&lang=en',
        15: 'https://www.lycamobile.at/bff/web/cms/template/v3/389eb180-6e3f-428e-ac48-e0c7571fed1d?draft=false&lang=en',
        16: 'https://www.lycamobile.at/bff/payment/v1/apm-list/SIM?draft=false&lang=en',
        17: 'https://www.lycamobile.at/bff/web/pim/v1/product/2040?draft=false&lang=en',
        18: 'https://www.lycamobile.at/bff/web/pim/v1/product/2207?draft=false&lang=en',
        19: 'https://www.lycamobile.at/bff/web/pim/v1/product/2208?draft=false&lang=en',
        20: 'https://www.lycamobile.at/bff/web/pim/v1/product/1911?draft=false&lang=en',
        21: 'https://www.lycamobile.at/bff/web/pim/v1/product/2057?draft=false&lang=en',
        22: 'https://www.lycamobile.at/bff/web/rate/v1/national-rates?draft=false&lang=en',
        23: 'https://www.lycamobile.at/bff/web/rate/v1/countries/international/AT?draft=false&lang=en',
        24: 'https://www.lycamobile.at/bff/web/rate/v1/international-rates?only_popular_countries=true&draft=false&lang=en',
        25: 'https://www.lycamobile.at/bff/web/cms/template/v3/f538c9ed-fff5-4b1c-a896-617cf31960a7?draft=false&lang=en',
        26: 'https://www.lycamobile.at/bff/web/rate/v1/countries/zone-wise?draft=false&lang=en',
        27: 'https://www.lycamobile.at/bff/web/cms/template/v3/d38eabc3-9f0d-4a77-9318-e4bd1df63643?draft=false&lang=en',
        28: 'https://www.lycamobile.at/bff/web/cms/template/v3/04743b28-63d4-4dc5-9f69-78d581cd2e36?draft=false&lang=en',
        29: 'https://www.lycamobile.at/bff/web/cms/template/v3/a0e9d659-4bf1-4425-9d61-7b49b57eb416?draft=false&lang=en'
    };
    

   
    let countryName = prompt("Enter Country Name (at/au):").trim().toLowerCase();

    if (!['at', 'au'].includes(countryName)) {
        console.error("❌ Unsupported country! Please enter 'at' or 'au'.");
        return;
    }

    const availableCountryAPI = {};
    

    console.log(`✅ Available APIs for ${countryName}:`);

    Object.entries(APIs).forEach(([key, value]) => {
        let newValue = value; // Default to English version
    
        if (countryName === 'at') {
            console.log(`${key}-en: ${newValue}`); // Log English version
            availableCountryAPI[`${key}-en`] = newValue;
    
            // German version
            let newValueDE = value.replace('lang=en', 'lang=de');
            console.log(`${key}-de: ${newValueDE}`); // Log German version
            availableCountryAPI[`${key}-de`] = newValueDE;
    
        } else if (countryName === 'au') {
            newValue = value.replace('.at', '.com.au').replace('AT', 'AU');
            console.log(`${key}: ${newValue}`);
            availableCountryAPI[key] = newValue;
        }
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

    for (let apiNumber of apiNumbers) {
        let url = availableCountryAPI[apiNumber];
        console.log(`🚀 Checking API ${apiNumber}: ${url}`);

        try {
            const response = await fetch(url);
            const status = response.status;
            const headers = Object.fromEntries(response.headers.entries());

            let responseSizeKB = headers['content-length']
                ? `${(parseInt(headers['content-length']) / 1024).toFixed(2)} KB`
                : `${(new Blob([await response.text()]).size / 1024).toFixed(2)} KB`;

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
                Country: countryName.toUpperCase(),
                API: url,
                StatusCode: status,
                ResponseSize: responseSizeKB,
                HeadersStatus: headersStatus,
                Remark: remarks.length > 0 ? remarks.join("\n") : "✅ All headers as expected"
            });

        } catch (error) {
            results.push({
                Country: countryName.toUpperCase(),
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
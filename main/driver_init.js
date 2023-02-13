const webdriver = require('selenium-webdriver');

class DriverInit{

    initDriver(browser){
        if (browser === 'chrome'){
            const chromeCapabilities = webdriver.Capabilities.chrome();
            const chromeOptions = {'args': ['--incognito']};
            chromeCapabilities.set("goog:chromeOptions", chromeOptions);
            const driver = new webdriver.Builder().forBrowser(browser).withCapabilities(chromeCapabilities).build();
            driver.manage().window().maximize();
            // driver.manage().setTimeouts(({pageLoad: (19000)}));
            Object.freeze(driver);
            return driver;
        } else {
            const firefoxCapabilities = webdriver.Capabilities.firefox();
            const firefoxOptions = {'args': ['--private']};
            firefoxCapabilities.set("moz:firefoxOptions", firefoxOptions);
            const driver = new webdriver.Builder().forBrowser(browser).withCapabilities(firefoxCapabilities).build();
            driver.manage().window().maximize();
            // driver.manage().setTimeouts({implicit: (3000)});
            // driver.manage().setTimeouts(({pageLoad: (100000)}));
            Object.freeze(driver);
            return driver;
        }
    }
}

module.exports = new DriverInit();
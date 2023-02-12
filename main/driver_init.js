const webdriver = require('selenium-webdriver');
let driver;

class DriverInit{

    initDriver(browser){
        if (browser === 'chrome'){
            const chromeCapabilities = webdriver.Capabilities.chrome();
            const chromeOptions = {'args': ['--incognito']};
            chromeCapabilities.set("goog:chromeOptions", chromeOptions);
            const driver = new webdriver.Builder().forBrowser(browser).withCapabilities(chromeCapabilities).build();
            driver.manage().window().maximize();
            // driver.manage().setTimeouts({implicit: (100000)});
            Object.freeze(driver);
            return driver;
        } else {
            const driver = new webdriver.Builder().forBrowser(browser).build();
            driver.manage().window().maximize();
            Object.freeze(driver);
            return driver;
        }
    }
    getInstance(browser){
        // if (driver == null) {
        driver = this.initDriver(browser);
            // Hide the constructor so the returned object can't be new'd
            // driver.constructor = null;
        // }
        return driver;
    }
}

module.exports = new DriverInit();
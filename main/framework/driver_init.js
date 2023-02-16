const webdriver = require('selenium-webdriver');

class DriverInit {
    constructor(browser) {
        this.browser = browser;
        if (!DriverInit._instance) {
            if (browser === 'chrome') {
                const chromeCapabilities = webdriver.Capabilities.chrome();
                const chromeOptions = {'args': ['--incognito']};
                chromeCapabilities.set("goog:chromeOptions", chromeOptions);
                DriverInit._instance = new webdriver.Builder().forBrowser(browser).withCapabilities(chromeCapabilities).build();
                DriverInit._instance.manage().window().maximize();
                Object.freeze(DriverInit._instance);
            } 
            else {
                const firefoxCapabilities = webdriver.Capabilities.firefox();
                const firefoxOptions = {'args': ['--private']};
                firefoxCapabilities.set("moz:firefoxOptions", firefoxOptions);
                DriverInit._instance = new webdriver.Builder().forBrowser(browser).withCapabilities(firefoxCapabilities).build();
                DriverInit._instance.manage().window().maximize();
                Object.freeze(DriverInit._instance);
            }
        }
        return DriverInit._instance;
    }

    static getInstance(browser) {
        new DriverInit(browser);
        return this._instance;
    }
    static async deleteInstance() {
        this._instance = undefined;
    }
}

module.exports = DriverInit;
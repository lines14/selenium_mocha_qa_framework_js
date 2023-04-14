const webdriver = require('selenium-webdriver');

class Singleton {
    constructor(browser) {
        if (!Singleton._instance) {
            if (browser === 'chrome') {
                const chromeCapabilities = webdriver.Capabilities.chrome();
                const chromeOptions = {'args': ['--incognito']};
                chromeCapabilities.set("goog:chromeOptions", chromeOptions);
                Singleton._instance = new webdriver.Builder().forBrowser(browser).withCapabilities(chromeCapabilities).build();
                Singleton._instance.manage().window().maximize();
                Object.freeze(Singleton._instance);
            } else {
                const firefoxCapabilities = webdriver.Capabilities.firefox();
                const firefoxOptions = {'args': ['--private']};
                firefoxCapabilities.set("moz:firefoxOptions", firefoxOptions);
                Singleton._instance = new webdriver.Builder().forBrowser(browser).withCapabilities(firefoxCapabilities).build();
                Singleton._instance.manage().window().maximize();
                Object.freeze(Singleton._instance);
            }
        }
        return Singleton._instance;
    }

    static getInstance(browser) {
        new Singleton(browser);
        return this._instance;
    }
    static async deleteInstance() {
        this._instance = undefined;
    }
}

module.exports = Singleton;
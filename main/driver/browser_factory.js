const webdriver = require('selenium-webdriver');
const configManager = require('../utils/data/config_manager');

class Driver {
    _instance = null;

    static createInstance() {
        if (!this._instance) {
            if (configManager.getConfigData().browser === 'chrome') {
                const chromeCapabilities = webdriver.Capabilities.chrome();
                const chromeOptions = {'args': ['--incognito']};
                chromeCapabilities.set("goog:chromeOptions", chromeOptions);
                this._instance = new webdriver.Builder().forBrowser('chrome').withCapabilities(chromeCapabilities).build();
                if (configManager.getConfigData().isMaximize) {
                    this._instance.manage().window().maximize();
                }
                Object.freeze(this._instance);
            } else if (configManager.getConfigData().browser === 'firefox') {
                const firefoxCapabilities = webdriver.Capabilities.firefox();
                const firefoxOptions = {'args': ['-private']};
                firefoxCapabilities.set("moz:firefoxOptions", firefoxOptions);
                this._instance = new webdriver.Builder().forBrowser('firefox').withCapabilities(firefoxCapabilities).build();
                if (configManager.getConfigData().isMaximize) {
                    this._instance.manage().window().maximize();
                }
                Object.freeze(this._instance);
            }
        }
    }

    static get instance() {
        return this._instance;
    }

    static set instance(value) {
        this._instance = value;
    }
}

module.exports = Driver;
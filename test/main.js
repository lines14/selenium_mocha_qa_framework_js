const {Builder, Browser, By, Key, until} = require('selenium-webdriver');
require('chromedriver');

module.exports = class driverSetUp {
    driverSet() {
        let driver = new Builder().forBrowser(Browser.CHROME).build();
        driver.manage().window().maximize();
        return driver;
    };
};
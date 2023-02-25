const Singleton = require('./singleton');
const {until} = require('selenium-webdriver');
const configManager = require('../config_manager');

class BaseForm {
    constructor(pageLocator, pageName) {
        this.pageLocator = pageLocator;
        this.pageName = pageName;
        this.driver = Singleton.getInstance(configManager.getConfigData().browser);
    }
    async getUniqueElement() {
        return await this.driver.findElement(this.pageLocator);
    }
    async pageIsDisplayed() {
        console.log(`    ▶ ${this.pageName} is open`)
        const uniqueElement = await this.getUniqueElement();
        const bool = await uniqueElement.isDisplayed();
        return bool;
    }
    async pageIsEnabled() {
        console.log(`    ▶ ${this.pageName} is enabled`)
        const element = await this.getUniqueElement();
        return await element.isEnabled();
    }
    async waitPageIsLocated() {
        await this.driver.wait(until.elementLocated(this.pageLocator), configManager.getConfigData().waitTime);
    }
    async waitPageIsEnabled() {
        await this.driver.wait(until.elementIsEnabled(await this.getUniqueElement(), configManager.getConfigData().waitTime));
    }
}

module.exports = BaseForm;
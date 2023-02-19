const Singleton = require('./singleton');
const {until} = require('selenium-webdriver');
const dataProvider = require('../data_provider');

class BaseForm {
    constructor(pageLocator, pageName) {
        this.pageLocator = pageLocator;
        this.pageName = pageName;
        this.driver = Singleton.getInstance(dataProvider.getConfigData().browser);
    }
    async getUniqueElement() {
        return await this.driver.findElement(this.pageLocator);
    }
    async boolPageIsDisplayed() {
        const uniqueElement = await this.getUniqueElement();
        const bool = await uniqueElement.isDisplayed();
        if (bool === true) {
            console.log(`    ▶ check ${this.pageName} is displayed`)
        }
        return bool;
    }
    async boolPageIsEnabled() {
        const element = await this.getUniqueElement();
        console.log(`    ▶ check ${this.pageName} is enabled`)
        return await element.isEnabled();
    }
    async boolWaitPageIsLocated() {
        await this.driver.wait(until.elementLocated(this.pageLocator), dataProvider.getConfigData().waitTime);
    }
    async boolWaitPageIsEnabled() {
        await this.driver.wait(until.elementIsEnabled(await this.getUniqueElement(), dataProvider.getConfigData().waitTime));
    }
}

module.exports = BaseForm;
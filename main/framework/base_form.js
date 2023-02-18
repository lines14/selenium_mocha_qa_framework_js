const DriverInit = require('./driver_init');
const {until} = require('selenium-webdriver');
const dataProvider = require('../data_provider');

class BaseForm {
    constructor(pageLocator, pageName) {
        this.pageLocator = pageLocator;
        this.pageName = pageName;
        this.driver = DriverInit.getInstance(dataProvider.getConfigData().browser);
    }
    async getUniqueElement() {
        return await this.driver.findElement(this.pageLocator);
    }
    async boolPageIsDisplayed() {
        const uniqueElement = await this.getUniqueElement();
        const bool = await uniqueElement.isDisplayed();
        if (bool === true) {
            console.log(`    ▶ ${this.pageName} is displayed`)
        }
        return bool;
    }
    async boolPageIsEnabled() {
        const element = await this.getUniqueElement();
        console.log(`    ▶ ${this.pageName} is enabled`)
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
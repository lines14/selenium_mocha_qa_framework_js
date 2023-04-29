const Driver = require('./driver/browser_factory');
const {until} = require('selenium-webdriver');
const configManager = require('./utils/data/config_manager');
const logger = require('./utils/log/logger');

class BaseForm {
    constructor(pageLocator, pageName) {
        this.pageLocator = pageLocator;
        this.pageName = pageName;
    }

    async getUniqueElement() {
        return await Driver.instance.findElement(this.pageLocator);
    }

    async pageIsDisplayed() {
        logger.log(`    ▶ ${this.pageName} is open`)
        const uniqueElement = await this.getUniqueElement();
        return await uniqueElement.isDisplayed();
    }

    async pageIsEnabled() {
        logger.log(`    ▶ ${this.pageName} is enabled`)
        const element = await this.getUniqueElement();
        return await element.isEnabled();
    }

    async waitPageIsLocated() {
        await Driver.instance.wait(until.elementLocated(this.pageLocator), configManager.getConfigData().waitTime);
    }
    
    async waitPageIsEnabled() {
        await Driver.instance.wait(until.elementIsEnabled(await this.getUniqueElement(), configManager.getConfigData().waitTime));
    }
}

module.exports = BaseForm;
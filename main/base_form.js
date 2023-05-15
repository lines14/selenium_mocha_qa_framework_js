import Driver from './driver/browser_factory.js';
import { until } from 'selenium-webdriver';
import configManager from './utils/data/config_manager.js';
import logger from './utils/log/logger.js';

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
        return await (await this.getUniqueElement()).isDisplayed();
    }

    async pageIsEnabled() {
        logger.log(`    ▶ ${this.pageName} is enabled`)
        return await (await this.getUniqueElement()).isEnabled();
    }

    async waitPageIsLocated() {
        await Driver.instance.wait(until.elementLocated(this.pageLocator), configManager.getConfigData().waitTime);
    }
    
    async waitPageIsEnabled() {
        await Driver.instance.wait(until.elementIsEnabled(await this.getUniqueElement(), configManager.getConfigData().waitTime));
    }
}

export default BaseForm;
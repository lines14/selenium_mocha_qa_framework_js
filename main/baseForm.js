import BrowserFactory from './driver/browserFactory.js';
import { until } from 'selenium-webdriver';
import ConfigManager from './utils/data/configManager.js';
import Logger from './utils/log/logger.js';

class BaseForm {
    constructor(pageLocator, pageName) {
        this.pageLocator = pageLocator;
        this.pageName = pageName;
    }

    async getUniqueElement() {
        return await BrowserFactory.instance.findElement(this.pageLocator);
    }

    async pageIsDisplayed() {
        Logger.log(`    ▶ ${this.pageName} is open`)
        return await (await this.getUniqueElement()).isDisplayed();
    }

    async pageIsEnabled() {
        Logger.log(`    ▶ ${this.pageName} is enabled`)
        return await (await this.getUniqueElement()).isEnabled();
    }

    async waitPageIsLocated() {
        await BrowserFactory.instance.wait(until.elementLocated(this.pageLocator), ConfigManager.getConfigData().waitTime);
    }
    
    async waitPageIsEnabled() {
        await BrowserFactory.instance.wait(until.elementIsEnabled(await this.getUniqueElement(), ConfigManager.getConfigData().waitTime));
    }
}

export default BaseForm;
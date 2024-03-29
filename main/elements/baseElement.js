import BrowserFactory from '../driver/browserFactory.js';
import ConfigManager from '../utils/data/configManager.js';
import { until, Key } from 'selenium-webdriver';
import { resolveNestedPromises } from 'resolve-nested-promises';
import Logger from '../utils/log/logger.js';

class BaseElement {
    constructor(elementLocator, elementName) {
        this.elementLocator = elementLocator;
        this.elementName = elementName;
    }

    async getElement() {
        await BrowserFactory.instance.wait(until.elementLocated(this.elementLocator), ConfigManager.getConfigData().waitTime);
        return await BrowserFactory.instance.findElement(this.elementLocator);
    }

    async getElements() {
        return await BrowserFactory.instance.findElements(this.elementLocator);
    }

    async getText() {
        Logger.log(`    ▶ get displayed ${this.elementName}`)
        const text = await (await this.getElement()).getText();
        Logger.log(`    ▶ text contains: "${text}"`)
        return text;
    }

    async clickButton() {
        Logger.log(`    ▶ click ${this.elementName}`)
        await (await this.getElement()).click();
    }

    async inputText(text) {
        Logger.log(`    ▶ input ${this.elementName}`)
        await (await this.getElement()).sendKeys(text);
    }

    async enterText(text) {
        Logger.log(`    ▶ input ${this.elementName} and submit`)
        await (await this.getElement()).sendKeys(text, Key.ENTER);
    }

    async getAttributeValue(attr) {
        return (await this.getElement()).getAttribute(attr);
    }

    async elementIsDisplayed() {
        Logger.log(`    ▶ ${this.elementName} is present`)
        return await (await this.getElement()).isDisplayed();
    }

    async elementIsEnabled() {
        return await (await this.getElement()).isEnabled();
    }

    async parseChildrenForAttr(attr) {
        const childrenAttr = (await this.getElements()).map((element) => element.getAttribute(attr));
        return resolveNestedPromises(childrenAttr);
    }

    async parseChildrenForText() {
        const childrenText = (await this.getElements()).map((element) => element.getText());
        return resolveNestedPromises(childrenText);
    }

    async waitIsVisible() {
        Logger.log(`    ▶ wait ${this.elementName} is visible`)
        await BrowserFactory.instance.wait(until.elementIsVisible(await this.getElement()), ConfigManager.getConfigData().waitTime);
    }

    async waitStalenessOf() {
        await BrowserFactory.instance.wait(until.stalenessOf(this.elementLocator), ConfigManager.getConfigData().waitTime);
    }
    
    async waitIsEnabled() {
        Logger.log(`    ▶ wait ${this.elementName} is enabled`)
        await BrowserFactory.instance.wait(until.elementIsEnabled(await this.getElement(), ConfigManager.getConfigData().waitTime));
    }
}
    
export default BaseElement;
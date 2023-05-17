import BrowserFactory from '../driver/browserFactory.js';
import configManager from '../utils/data/configManager.js';
import { until, Key } from 'selenium-webdriver';
import { resolveNestedPromises } from 'resolve-nested-promises';
import logger from '../utils/log/logger.js';

class BaseElement {
    constructor(elementLocator, elementName) {
        this.elementLocator = elementLocator;
        this.elementName = elementName;
    }

    async getElement() {
        await BrowserFactory.instance.wait(until.elementLocated(this.elementLocator), configManager.getConfigData().waitTime);
        return await BrowserFactory.instance.findElement(this.elementLocator);
    }

    async getElements() {
        return await BrowserFactory.instance.findElements(this.elementLocator);
    }

    async getText() {
        logger.log(`    ▶ get displayed ${this.elementName}`)
        const text = await (await this.getElement()).getText();
        logger.log(`    ▶ text contains: "${text}"`)
        return text;
    }

    async clickButton() {
        logger.log(`    ▶ click ${this.elementName}`)
        await (await this.getElement()).click();
    }

    async inputText(text) {
        logger.log(`    ▶ input ${this.elementName}`)
        await (await this.getElement()).sendKeys(text);
    }

    async enterText(text) {
        logger.log(`    ▶ input ${this.elementName} and submit`)
        await (await this.getElement()).sendKeys(text, Key.ENTER);
    }

    async getAttributeValue(attr) {
        return (await this.getElement()).getAttribute(attr);
    }

    async elementIsDisplayed() {
        logger.log(`    ▶ ${this.elementName} is present`)
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
        logger.log(`    ▶ wait ${this.elementName} is visible`)
        await BrowserFactory.instance.wait(until.elementIsVisible(await this.getElement()), configManager.getConfigData().waitTime);
    }

    async waitStalenessOf() {
        await BrowserFactory.instance.wait(until.stalenessOf(this.elementLocator), configManager.getConfigData().waitTime);
    }
    
    async waitIsEnabled() {
        logger.log(`    ▶ wait ${this.elementName} is enabled`)
        await BrowserFactory.instance.wait(until.elementIsEnabled(await this.getElement(), configManager.getConfigData().waitTime));
    }
}
    
export default BaseElement;
import Driver from '../driver/browser_factory.js';
import configManager from '../utils/data/config_manager.js';
import { until, Key } from 'selenium-webdriver';
import { resolveNestedPromises } from 'resolve-nested-promises';
import logger from '../utils/log/logger.js';

class BaseElement {
    constructor(elementLocator, elementName) {
        this.elementLocator = elementLocator;
        this.elementName = elementName;
    }

    async getElement() {
        await Driver.instance.wait(until.elementLocated(this.elementLocator), configManager.getConfigData().waitTime);
        return await Driver.instance.findElement(this.elementLocator);
    }

    async getElements() {
        return await Driver.instance.findElements(this.elementLocator);
    }

    async getText() {
        logger.log(`    ▶ get displayed ${this.elementName}`)
        const element = await this.getElement();
        const text = await element.getText();
        logger.log(`    ▶ text contains: "${text}"`)
        return text;
    }

    async clickButton() {
        logger.log(`    ▶ click ${this.elementName}`)
        const element = await this.getElement();
        await element.click();
    }

    async inputText(text) {
        logger.log(`    ▶ input ${this.elementName}`)
        const element = await this.getElement();
        await element.sendKeys(text);
    }

    async enterText(text) {
        logger.log(`    ▶ input ${this.elementName} and submit`)
        const element = await this.getElement();
        await element.sendKeys(text, Key.ENTER);
    }

    async getAttributeValue(attr) {
        const element = await this.getElement();
        return element.getAttribute(attr);
    }

    async elementIsDisplayed() {
        logger.log(`    ▶ ${this.elementName} is present`)
        const element = await this.getElement();
        return await element.isDisplayed();
    }

    async checkElementIsEnabled() {
        const element = await this.getElement();
        return await element.isEnabled();
    }

    async parseChildrenForAttr(attr) {
        const children = await this.getElements();
        const childrenAttr = children.map(element => element.getAttribute(attr));
        return resolveNestedPromises(childrenAttr);
    }

    async parseChildrenForText() {
        const children = await this.getElements();
        const childrenText = children.map(element => element.getText());
        return resolveNestedPromises(childrenText);
    }

    async waitIsVisible() {
        logger.log(`    ▶ wait ${this.elementName} is visible`)
        await Driver.instance.wait(until.elementIsVisible(await this.getElement()), configManager.getConfigData().waitTime);
    }

    async waitStalenessOf() {
        await Driver.instance.wait(until.stalenessOf(this.elementLocator), configManager.getConfigData().waitTime);
    }
    
    async waitIsEnabled() {
        logger.log(`    ▶ wait ${this.elementName} is enabled`)
        await Driver.instance.wait(until.elementIsEnabled(await this.getElement(), configManager.getConfigData().waitTime));
    }
}
    
export default BaseElement;
const Singleton = require('./singleton');
const configManager = require('../config_manager');
const {until, Key} = require('selenium-webdriver');
const {resolveNestedPromises} = require('resolve-nested-promises')

class BaseElement {
    constructor(elementLocator, elementName) {
        this.elementLocator = elementLocator;
        this.elementName = elementName;
        this.driver = Singleton.getInstance(configManager.getConfigData().browser);
    }
    async getElement() {
        await this.driver.wait(until.elementLocated(this.elementLocator), configManager.getConfigData().waitTime);
        return await this.driver.findElement(this.elementLocator);
    }
    async getElements() {
        return await this.driver.findElements(this.elementLocator);
    }
    async getText() {
        console.log(`    ▶ get displayed ${this.elementName}`)
        const element = await this.getElement();
        const text = await element.getText();
        console.log(`    ▶ text contains: "${text}"`)
        return text;
    }
    async clickButton() {
        console.log(`    ▶ click ${this.elementName}`)
        const element = await this.getElement();
        await element.click();
    }
    async inputText(text) {
        console.log(`    ▶ input ${this.elementName}`)
        const element = await this.getElement();
        await element.sendKeys(text);
    }
    async enterText(text) {
        console.log(`    ▶ input ${this.elementName} and submit`)
        const element = await this.getElement();
        await element.sendKeys(text, Key.ENTER);
    }
    async getAttributeValue(attr) {
        const element = await this.getElement();
        const atr = element.getAttribute(attr);
        return atr;
    }
    async elementIsDisplayed() {
        console.log(`    ▶ ${this.elementName} is present`)
        const element = await this.getElement();
        const bool = await element.isDisplayed();
        return bool;
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
        console.log(`    ▶ wait ${this.elementName} is visible`)
        await this.driver.wait(until.elementIsVisible(await this.getElement()), configManager.getConfigData().waitTime);
    }
    async waitStalenessOf() {
        await this.driver.wait(until.stalenessOf(this.elementLocator), configManager.getConfigData().waitTime);
    }
    async waitIsEnabled() {
        console.log(`    ▶ wait ${this.elementName} is enabled`)
        await this.driver.wait(until.elementIsEnabled(await this.getElement(), configManager.getConfigData().waitTime));
    }
}
    
module.exports = BaseElement;
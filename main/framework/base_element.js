const Singleton = require('./singleton');
const configManager = require('../config_manager');
const {By, until, Key} = require('selenium-webdriver');
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
        const element = await this.getElement();
        console.log(`    ▶ get ${this.elementName}`)
        return await element.getText();
    }
    async clickButton() {
        const element = await this.getElement();
        await element.click();
        console.log(`    ▶ click ${this.elementName}`)
    }
    async inputText(text) {
        const element = await this.getElement();
        await element.sendKeys(text);
        console.log(`    ▶ input ${this.elementName}`)
    }
    async enterText(text) {
        const element = await this.getElement();
        await element.sendKeys(text, Key.ENTER);
        console.log(`    ▶ enter ${this.elementName}`)
    }
    async getAttributeValue(attr) {
        const element = await this.getElement();
        const atr = element.getAttribute(attr);
        return atr;
    }
    async boolElementIsDisplayed() {
        const element = await this.getElement();
        const bool = await element.isDisplayed();
        if (bool === true) {
            console.log(`    ▶ check ${this.elementName} is displayed`)
        }
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
    async parseChildrenAttrByCounter(attr) {
        const itemsCount = 2;
        let counter = 1;
        const platformsListAll = [];
        while (counter <= itemsCount){
            const eachPlatformsList = await this.driver.findElements(By.xpath(`${this.elementLocator}[${counter}]//subchild-locator`));
            const eachAttributesList = eachPlatformsList.map(element => element.getAttribute(attr));
            platformsListAll.push(eachAttributesList);
            counter += 1;            
        }
        return resolveNestedPromises(platformsListAll);
    }
    async parseChildrenTextByCounter() {
        const itemsCount = 10;
        let counter = 1;
        const rowsListAll = [];
        while (counter <= itemsCount){
            const eachRowList = await this.driver.findElements(By.xpath(`${this.elementLocator}[${counter}]//div[@role="row"]//div[@role="gridcell"]`));
            const eachRowTextList = eachRowList.map(element => element.getText());
            rowsListAll.push(eachRowTextList);
            counter += 1;            
        }
        return resolveNestedPromises(rowsListAll);
    }
    async boolWaitIsVisible() {
        await this.driver.wait(until.elementIsVisible(await this.getElement()), configManager.getConfigData().waitTime);
        console.log(`    ▶ wait ${this.elementName} is visible`)
    }
    async boolWaitStalenessOf() {
        await this.driver.wait(until.stalenessOf(this.elementLocator), configManager.getConfigData().waitTime);
    }
    async boolWaitIsEnabled() {
        await this.driver.wait(until.elementIsEnabled(await this.getElement(), configManager.getConfigData().waitTime));
        console.log(`    ▶ wait ${this.elementName} is enabled`)
    }
}
    
module.exports = BaseElement;
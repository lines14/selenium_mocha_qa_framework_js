const DriverInit = require('./driver_init');
const dataProvider = require('../data_provider');
const {By, until, Key} = require('selenium-webdriver');
const {resolveNestedPromises} = require('resolve-nested-promises')

class BaseElement {
    constructor(elementLocator, elementName) {
        this.elementLocator = elementLocator;
        this.elementName = elementName;
        this.driver = DriverInit.getInstance(dataProvider.getConfigData().browser);
    }
    async getElement() {
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
        console.log(`    ▶ ${this.elementName} is clicked`)
        // await this.driver.sleep(3000)
    }
    async inputText(text) {
        const element = await this.getElement();
        await element.sendKeys(text);
        console.log(`    ▶ ${this.elementName} entered`)
    }
    async enterText(text) {
        const element = await this.getElement();
        await element.sendKeys(text, Key.ENTER);
        console.log(`    ▶ ${this.elementName} entered`)
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
            console.log(`    ▶ ${this.elementName} is displayed`)
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
        return Promise.all(childrenAttr).then(function(resolvedAttr) {
            return resolvedAttr;
        })
    }
    async parseChildrenForText() {
        const children = await this.getElements();
        const childrenText = children.map(element => element.getText());
        return Promise.all(childrenText).then(function(resolvedText) {
            return resolvedText;
        }) 
    }
    async parseChildrenAttrByCounter(attr) {
        const itemsCount = 2;
        let counter = 1;
        const platformsListAll = [];
        while (counter <= itemsCount){
            const eachPlatformsList = await this.driver.findElements(By.xpath(`${this.elementLocator}[${counter}]//div[2]/div[1]/div/span`));
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
            const eachRowList = await this.driver.findElements(By.xpath(`${this.elementLocator}[${counter}]//div//div`));
            const eachRowTextList = eachRowList.map(element => element.getText());
            rowsListAll.push(eachRowTextList);
            counter += 1;            
        }
        return resolveNestedPromises(rowsListAll);
    }
    async boolWaitIsLocated() {
        await this.driver.wait(until.elementLocated(this.elementLocator), dataProvider.getConfigData().waitTime);
    }
    async boolWaitIsVisible() {
        await this.driver.wait(until.elementIsVisible(await this.getElement()), dataProvider.getConfigData().waitTime);
        console.log(`    ▶ ${this.elementName} is visible`)
    }
    async boolWaitStalenessOf() {
        await this.driver.wait(until.stalenessOf(this.elementLocator), dataProvider.getConfigData().waitTime);
    }
    async boolWaitIsEnabled() {
        await this.driver.wait(until.elementIsEnabled(await this.getElement(), dataProvider.getConfigData().waitTime));
        console.log(`    ▶ ${this.elementName} is enabled`)
    }
}
    
module.exports = BaseElement;
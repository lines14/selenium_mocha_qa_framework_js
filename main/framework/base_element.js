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
        return await element.getText();
    }
    async clickButton() {
        const element = await this.getElement();
        await element.click();
    }
    async inputText(text) {
        const element = await this.getElement();
        await element.sendKeys(text);
    }
    async enterText(text) {
        const element = await this.getElement();
        await element.sendKeys(text, Key.ENTER);
    }
    async getAttributeValue(attr) {
        const element = await this.getElement();
        const atr = element.getAttribute(attr);
        return atr;
    }
    async boolElementIsDisplayed() {
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
    async parseChildrenByCounter(attr) {
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
    async boolWaitIsLocated() {
        await this.driver.wait(until.elementLocated(this.elementLocator), 19000);
    }
    async boolWaitIsVisible() {
        await this.waitBoolIsLocated().then(element => {return this.driver.wait(until.elementIsVisible(element), 19000)});
    }
    async boolWaitStalenessOf() {
        await this.driver.wait(until.stalenessOf(this.elementLocator), 19000);
    }
    async boolWaitIsEnabled() {
        await this.driver.wait(until.elementIsEnabled(this.getElement(), 19000));
    }
}
    
module.exports = BaseElement;

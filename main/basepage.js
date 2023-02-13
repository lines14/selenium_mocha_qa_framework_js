const {By, until, Key} = require('selenium-webdriver');
const Browser = require('../main/browser');

class BasePage extends Browser{

    static async verifyWebPageByCustomText(path) {
        const text = await this.driver.findElement(By.xpath(path)).getText();
        return text;
    }
    static async verifyWebPageByDisplayedElement(path) {
        const confirmed = await this.driver.findElement(By.xpath(path)).isDisplayed();
        return confirmed;
    }
    static async waitUntilElementIsDisplayed(path) {
        await this.driver.wait(until.elementLocated(By.xpath(path)), 19000);
    }
    static async waitUntilElementIsVisible(path) {
        await this.driver.wait(until.elementLocated(By.xpath(path)), 19000).then(element => {return this.driver.wait(until.elementIsVisible(element), 19000)});
    }
    static async waitUntilElementStalenessOf(path) {
        await this.driver.wait(until.stalenessOf(By.xpath(path)), 19000);
    }
    static async waitUntilElementIsEnabled(path) {
        await this.driver.wait(until.elementIsEnabled(this.driver.findElement(By.xpath(path))), 19000);
    }
    static async clickButtonByXpath(path) {
        await this.driver.findElement(By.xpath(path)).click();
    }
    static async clickButtonByCss(path) {
        await this.driver.findElement(By.css(path)).click();
    }
    static async inputTextByCss(css, text){
        await this.driver.findElement(By.css(css)).sendKeys(text);
    }
    static async inputTextByXpath(path, text){
        await this.driver.findElement(By.xpath(path)).sendKeys(text);
    }
    static async enterTextByXpath(path, text){
        await this.driver.findElement(By.xpath(path)).sendKeys(text, Key.ENTER);
    }
    static async checkElementIsEnabled(path) {
        const enabledElement = await this.driver.findElement(By.xpath(path)).isEnabled();
        return enabledElement;
    }
    static async clickById(id){
        await this.driver.findElement(By.id(id)).click();
    }
    static async verifyWebElementAttributeValue(path, attr) {
        const element = await this.driver.findElement(By.xpath(path));
        const atr = element.getAttribute(attr);
        return atr;
    }
    static async parseTheChildElementsUnlimitedForAttr(path, attr){
        const children = await this.driver.findElements(By.xpath(path));
        const childrenAttr = children.map(element => element.getAttribute(attr));
        return Promise.all(childrenAttr).then(function(resolvedAttr){
            return resolvedAttr;
        })
    }
    static async parseTheChildElementsUnlimitedForText(path){
        const children = await this.driver.findElements(By.xpath(path));
        const childrenText = children.map(element => element.getText());
        return Promise.all(childrenText).then(function(resolvedText){
            return resolvedText;
        }) 
    }
    static async parseTheChildElementsUnlimitedByCounter(path, attr){
        const children = [];
        let counter = 1;
        while (true) {
            try {
                const child = await this.driver.findElement(By.xpath(path+`[${counter}]`));
                children.push(child.getAttribute(attr))
                counter += 1;
            } catch(err) {
                break;
            }
        }
        return Promise.all(children).then(function(atr) {
            return atr;
        })
    }
}

module.exports = BasePage;
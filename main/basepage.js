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
        await this.driver.wait(until.elementLocated(By.xpath(path)), 9000);
    }
    static async waitUntilElementIsEnabled(path) {
        await this.driver.wait(until.elementIsEnabled(this.driver.findElement(By.xpath(path))), 9000);
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
    static async parseTheChildElementsUnlimited(path, childPath, attr){
        const children = [];
        let counter = 1;
        while (true) {
            try {
                const child = await this.driver.findElement(By.xpath(path+childPath+`[${counter}]`));
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
    static async parseTheChildElements(path, childPath, maxCount, childSubPath, attr){
        const children = [];
        let counter = 1;
        while (counter <= maxCount) {
            const child = await this.driver.findElement(By.xpath(path+childPath+`[${counter}]`+childSubPath));
            children.push(child.getAttribute(attr))
            counter += 1;
        }
        return Promise.all(children).then(function(atr) {
            return atr;
        })
    }
    static async parseTheChildElementsForText(path, childPath, maxCount, childSubPath){
        const children = [];
        let counter = 1;
        while (counter <= maxCount) {
            const child = await this.driver.findElement(By.xpath(path+childPath+`[${counter}]`+childSubPath)).getText();
            children.push(child)
            counter += 1;
        }
        return children;
    }
    static async parseTheChildElementsUnlimitedForText(path, childPath, childSubPath){
        const children = [];
        let counter = 1;
        while (true) {
            try {
                const child = await this.driver.findElement(By.xpath(path+childPath+`[${counter}]`+childSubPath)).getText();
                children.push(child)
                counter += 1;
            } catch(err) {
                break;
            }
        }
        return children;
    }
    static async verifyWebElementAttributeValue(path, attr) {
        const element = await this.driver.findElement(By.xpath(path));
        const atr = element.getAttribute(attr);

        return Promise.resolve(atr).then(function(at) {
            return at;
        })
    }

}

module.exports = BasePage;
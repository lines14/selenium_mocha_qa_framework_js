const {By, until, Key} = require('selenium-webdriver');
var Browser = require ('../main/browser');

class BasePage extends Browser{

    async verifyWebPageByCustomText(path) {
        let text = await driver.findElement(By.xpath(path)).getText();
        return text;
    }
    async verifyWebPageByDisplayedElement(path) {
        let confirmed = await driver.findElement(By.xpath(path)).isDisplayed();
        return confirmed;
    }
    async waitUntilElementIsDisplayed(path) {
        await driver.wait(until.elementLocated(By.xpath(path)), 9000);
    }
    async waitUntilElementIsEnabled(path) {
        await driver.wait(until.elementIsEnabled(driver.findElement(By.xpath(path))), 9000);
    }
    async clickButtonByXpath(path) {
        await driver.findElement(By.xpath(path)).click();
    }
    async clickButtonByCss(path) {
        await driver.findElement(By.css(path)).click();
    }
    async inputTextByCss(css, text){
        await driver.findElement(By.css(css)).sendKeys(text);
    }
    async inputTextByXpath(path, text){
        await driver.findElement(By.xpath(path)).sendKeys(text);
    }
    async enterTextByXpath(path, text){
        await driver.findElement(By.xpath(path)).sendKeys(text, Key.ENTER);
    }
    async checkElementIsEnabled(path) {
        let enabledElement = await driver.findElement(By.xpath(path)).isEnabled();
        return enabledElement;
    }
    async clickById(id){
        await driver.findElement(By.id(id)).click();
    }
    async parseTheChildElementsUnlimited(path, childPath, attr){
        let children = [];
        let counter = 1;
        while (true) {
            try {
                let child = await driver.findElement(By.xpath(path+childPath+`[${counter}]`));
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
    async parseTheChildElements(path, childPath, maxCount, childSubPath, attr){
        let children = [];
        let counter = 1;
        while (counter <= maxCount) {
            let child = await driver.findElement(By.xpath(path+childPath+`[${counter}]`+childSubPath));
            children.push(child.getAttribute(attr))
            counter += 1;
        }
        return Promise.all(children).then(function(atr) {
            return atr;
        })
    }
    async parseTheChildElementsForText(path, childPath, maxCount, childSubPath){
        let children = [];
        let counter = 1;
        while (counter <= maxCount) {
            let child = await driver.findElement(By.xpath(path+childPath+`[${counter}]`+childSubPath)).getText();
            children.push(child)
            counter += 1;
        }
        return children;
    }
    async parseTheChildElementsUnlimitedForText(path, childPath, childSubPath){
        let children = [];
        let counter = 1;
        while (true) {
            try {
                let child = await driver.findElement(By.xpath(path+childPath+`[${counter}]`+childSubPath)).getText();
                children.push(child)
                counter += 1;
            } catch(err) {
                break;
            }
        }
        return children;
    }
    async verifyWebElementAttributeValue(path, attr) {
        let element = await driver.findElement(By.xpath(path));
        let atr = element.getAttribute(attr);

        return Promise.resolve(atr).then(function(at) {
            return at;
        })
    }

}

module.exports = BasePage;
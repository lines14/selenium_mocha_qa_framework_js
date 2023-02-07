const {By, until, Key} = require('selenium-webdriver');
var driverinit = require ('../main/driver_init');

class BasePage{

    async initTheDriver(browser){
        global.driver = await driverinit.getInstance(browser);
    }
    async go_to_url(theURL){
        await driver.get(theURL);
    }
    async scrollToTheBottom() {
        await driver.executeScript('window.scrollBy(0, document.body.scrollHeight);');
        await driver.executeScript('window.scrollBy(0, document.body.scrollHeight);');
    };
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
    async checkTheTabsCount(){
        let tabsCount = (await driver.getAllWindowHandles()).length;
        return tabsCount;
    }
    async switchDriverToTheAnotherTab(number){
        await driver.wait(async () => (await driver.getAllWindowHandles()).length === 2, 9000);
        // var parent = await driver.getWindowHandle();
        var windows = await driver.getAllWindowHandles();
        await driver.switchTo().window(windows[number]);
        // driver.close();
        // driver.switchTo().window(parent);
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
    async quitDriver(){
        await driver.quit();
    }

}

module.exports = BasePage;
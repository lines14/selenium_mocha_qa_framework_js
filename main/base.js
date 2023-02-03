const {By, until} = require('selenium-webdriver');
var driverinit = require ('../main/driver_init');

class Base{

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
        let pageVerified = await driver.findElement(By.xpath(path)).getText();
        return pageVerified;
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
    async enterTextByCss(css, text){
        await driver.findElement(By.css(css)).sendKeys(text);
    }
    async enterTextByXpath(path, text){
        await driver.findElement(By.xpath(path)).sendKeys(text);
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
    async parseTheChildElements(path, childPath, attr){
        let children = [];
        let counter = 1;
        while (true) {
            try {
                let child = await driver.findElement(By.xpath(path+childPath+`[${counter}]`));
                // console.log(child)
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
    async quitDriver(){
        await driver.quit();
    }

}

module.exports = Base;
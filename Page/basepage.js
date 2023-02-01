var webdriver = require('selenium-webdriver');
const {By, until} = require('selenium-webdriver');
var driver = new webdriver.Builder().forBrowser('chrome').build();
driver.manage().window().maximize();
// driver.manage().setTimeouts({implicit: (10000)});

class BasePage{
    constructor(){
        global.driver = driver;
    }
    async go_to_url(theURL){
        await driver.get(theURL);
    }
    async verifyWebPageByCustomText(path) {
        let pageVerified = await driver.findElement(By.xpath(path)).getText();
        return pageVerified;
    }
    async verifyWebPageByDisplayedElement(path) {
        let pageConfirmed = await driver.findElement(By.xpath(path)).isDisplayed();
        return pageConfirmed;
    }
    async waitUntilElementIsDisplayed(path) {
        await driver.wait(until.elementLocated(By.xpath(path)), 9000);
    }
    async waitUntilElementIsEnabled(path) {
        await driver.wait(until.elementIsEnabled(driver.findElement(By.xpath(path))), 9000);
    }
    async clickButton(path) {
        await driver.findElement(By.xpath(path)).click();
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
    async closeBrowser(){
        await driver.quit();
    }
}

module.exports = BasePage;
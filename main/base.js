const {By, until} = require('selenium-webdriver');
var driverinit = require ('../main/driver_init');

class DriverInit{

    constructor(){
        global.driverinit = driverinit;
    }
    initDriver(){
        var driver = driverinit.getInstance();
        return driver;
    }
    
}

class Base extends DriverInit{

    constructor(){
        super();
        global.driver = this.initDriver();
    }
    async initTheDriver(){
        await this.initDriver();
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
    async quitDriver(){
        await driver.quit();
    }

}

module.exports = Base;
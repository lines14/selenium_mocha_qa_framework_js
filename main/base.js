const {By, until} = require('selenium-webdriver');
var driverinit = require ('../main/driver_init');
var webdriver = require('selenium-webdriver');

class Base{

    async initTheDriver(browser){
        global.driver = await driverinit.getInstance(browser);
    }
    async go_to_url(theURL){
        await driver.get(theURL);
    }
    async scrollToTheElement(path) {
        // await driver.sleep(3000)
        let element = await driver.findElement(By.xpath(path));
        // const deltaY = (await element.getRect()).y
        await driver.actions().scroll(1000, 1000, 1000, 1000).perform()
        // console.log(element)
        // let clickAction = new Actions(driver).click(element);
        // await clickAction.build().perform();
        // await driver.sleep(5000);
        // await element.scrollIntoView(false);
        // var actions = driver.actions({ bridge: true });
        // actions.mouse().move({x: 400, y: 1100, duration: 2000, origin: webdriver.VIEWPORT}).perform();;
        // await driver.actions({ bridge: true }).move({origin: element}).perform()
        // await driver.executeScript("arguments[0].scrollIntoView()", element);
        // await driver.sleep(300);
    };
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
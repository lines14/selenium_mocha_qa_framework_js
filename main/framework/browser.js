const DriverInit = require('./driver_init');
const {Key} = require('selenium-webdriver');

class Browser {
    async initTheDriver(browser) {
        this.driver = await DriverInit.getInstance(browser);
    }
    async go_to_url(theURL) {
        await this.driver.get(theURL);
    }
    async scrollToTheBottom() {
        await this.driver.executeScript('window.scrollBy(0, document.body.scrollHeight);');
    }
    async checkTheTabsCount() {
        const tabsCount = (await this.driver.getAllWindowHandles()).length;
        return tabsCount;
    }
    async switchDriverToTheAnotherTab(number) {
        await this.driver.wait(async () => (await this.driver.getAllWindowHandles()).length === 2, 9000);
        const windows = await this.driver.getAllWindowHandles();
        await this.driver.switchTo().window(windows[number]);
    }
    async getAlert() {
        return await this.driver.switchTo().alert();
    }
    async getAlertText() {
        const alert = await this.getAlert();
        return await alert.getText();
    }
    async enterTextToAlert(text) {
        const alert = await this.getAlert();
        await alert.sendKeys(text);
        console.log('    ▶ input text to alert form')
    }
    async acceptAlert() {
        const alert = await this.getAlert();
        await alert.accept();
        console.log('    ▶ accepted alert')
    }
    async goIntoFrame(index) {
        await this.driver.switchTo().frame(index);
        console.log('    ▶ go into frame')
    }
    async goOutOfFrame() {
        await this.driver.switchTo().defaultContent();
        console.log('    ▶ go out of frame')
    }
    async quitDriver() {
        await this.driver.quit();
        await DriverInit.deleteInstance();
    }
}

module.exports = new Browser();
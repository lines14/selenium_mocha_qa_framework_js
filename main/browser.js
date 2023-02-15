const DriverInit = require('../main/driver_init');

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
    async quitDriver() {
        await this.driver.quit();
        await DriverInit.deleteInstance();
    }
}

module.exports = new Browser();
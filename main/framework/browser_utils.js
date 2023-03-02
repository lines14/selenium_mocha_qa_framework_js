const Singleton = require('./singleton');
const configManager = require('../config_manager');

class BrowserUtils {
    async initTheDriver(browser) {
        this.driver = await Singleton.getInstance(browser);
    }
    async getUrl(_) {
        await this.driver.get(_);
    }
    async scrollToTheBottom() {
        await this.driver.executeScript('window.scrollBy(0, document.body.scrollHeight);');
    }
    async handleOriginalTab() {
        return await this.driver.getWindowHandle();
    }
    async getTabsCount() {
        const tabsCount = (await this.driver.getAllWindowHandles()).length;
        return tabsCount;
    }
    async switchDriverToTheAnotherTab(prevTabsCount, number) {
        console.log(`    ▶ switch driver to ${number} tab`);
        await this.driver.wait(async () => (await this.driver.getAllWindowHandles()).length > prevTabsCount, configManager.getConfigData().waitTime);
        const windows = await this.driver.getAllWindowHandles();
        await this.driver.switchTo().window(windows[number]);
    }
    async switchDriverToTheOriginalTab(originalTab) {
        console.log(`    ▶ switch driver to previous tab`);
        await this.driver.switchTo().window(originalTab);
    }
    async getAlert() {
        return await this.driver.switchTo().alert();
    }
    async getAlertText() {
        console.log(`    ▶ alert with text is open`);
        const alert = await this.getAlert();
        const text = await alert.getText();
        console.log(`    ▶ text contains: "${text}"`);
        return text;
    }
    async enterTextToAlert(text) {
        console.log('    ▶ input text to alert form');
        const alert = await this.getAlert();
        await alert.sendKeys(text);
    }
    async acceptAlert() {
        console.log('    ▶ accept alert');
        const alert = await this.getAlert();
        await alert.accept();
    }
    async alertIsDisplayed() {
        try {
            await this.getAlert();
            return true;
        } catch(err) {
            return false;
        }
    }
    async goIntoFrame(index) {
        console.log('    ▶ go into frame');
        await this.driver.switchTo().frame(index);
    }
    async goOutOfFrame() {
        console.log('    ▶ go out of frame');
        await this.driver.switchTo().defaultContent();
    }
    async closeTab() {
        console.log('    ▶ close tab');
        await this.driver.close();
    }
    async quitDriver() {
        await this.driver.quit();
        await Singleton.deleteInstance();
    }
}

module.exports = new BrowserUtils();
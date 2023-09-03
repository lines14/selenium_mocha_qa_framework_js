import BrowserFactory from './browserFactory.js';
import ConfigManager from '../utils/data/configManager.js';
import Logger from '../utils/log/logger.js';

class BrowserUtils {
    static initTheDriver() {
        Logger.log('    ▶ init driver');
        BrowserFactory.createInstance();
    }

    static async getUrl(_) {
        await BrowserFactory.instance.get(_);
    }

    static async scrollToTheBottom() {
        await BrowserFactory.instance.executeScript('window.scrollBy(0, document.body.scrollHeight);');
    }

    static async handleOriginalTab() {
        return await BrowserFactory.instance.getWindowHandle();
    }

    static async getTabsCount() {
        return (await BrowserFactory.instance.getAllWindowHandles()).length;
    }

    static async switchDriverToTheAnotherTab(prevTabsCount, original_window) {
        Logger.log('    ▶ switch driver to another tab');
        await BrowserFactory.instance.wait(async () => (await BrowserFactory.instance.getAllWindowHandles()).length > prevTabsCount, ConfigManager.getConfigData().waitTime);
        (await BrowserFactory.instance.getAllWindowHandles()).forEach((element) => {
            if (element !== original_window) BrowserFactory.instance.switchTo().window(element);
        });
    }

    static async switchDriverToTheOriginalTab(originalTab) {
        Logger.log(`    ▶ switch driver to previous tab`);
        await BrowserFactory.instance.switchTo().window(originalTab);
    }

    static async getAlert() {
        return await BrowserFactory.instance.switchTo().alert();
    }

    static async getAlertText() {
        Logger.log(`    ▶ alert with text is open`);
        const text = await (await this.getAlert()).getText();
        Logger.log(`    ▶ text contains: "${text}"`);
        return text;
    }

    static async enterTextToAlert(text) {
        Logger.log('    ▶ input text to alert form');
        await (await this.getAlert()).sendKeys(text);
    }

    static async acceptAlert() {
        Logger.log('    ▶ accept alert');
        await (await this.getAlert()).accept();
    }

    static async alertIsDisplayed() {
        try {
            await this.getAlert();
            return true;
        } catch(err) {
            return false;
        }
    }

    static async goIntoFrame(index) {
        Logger.log('    ▶ go into frame');
        await BrowserFactory.instance.switchTo().frame(index);
    }

    static async goOutOfFrame() {
        Logger.log('    ▶ go out of frame');
        await BrowserFactory.instance.switchTo().defaultContent();
    }

    static async closeTab() {
        Logger.log('    ▶ close tab');
        await BrowserFactory.instance.close();
    }
    
    static quitDriver() {
        Logger.log('    ▶ quit driver');
        BrowserFactory.instance.quit();
        BrowserFactory.instance = null;
    }
}

export default BrowserUtils;
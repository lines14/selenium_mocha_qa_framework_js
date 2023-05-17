import BrowserFactory from './browserFactory.js';
import configManager from '../utils/data/configManager.js';
import logger from '../utils/log/logger.js';

class BrowserUtils {
    initTheDriver() {
        logger.log('    ▶ init driver');
        BrowserFactory.createInstance();
    }

    async getUrl(_) {
        await BrowserFactory.instance.get(_);
    }

    async scrollToTheBottom() {
        await BrowserFactory.instance.executeScript('window.scrollBy(0, document.body.scrollHeight);');
    }

    async handleOriginalTab() {
        return await BrowserFactory.instance.getWindowHandle();
    }

    async getTabsCount() {
        return (await BrowserFactory.instance.getAllWindowHandles()).length;
    }

    async switchDriverToTheAnotherTab(prevTabsCount, original_window) {
        logger.log('    ▶ switch driver to another tab');
        await BrowserFactory.instance.wait(async () => (await BrowserFactory.instance.getAllWindowHandles()).length > prevTabsCount, configManager.getConfigData().waitTime);
        (await BrowserFactory.instance.getAllWindowHandles()).forEach((element) => {
            if (element !== original_window) BrowserFactory.instance.switchTo().window(element);
        });
    }

    async switchDriverToTheOriginalTab(originalTab) {
        logger.log(`    ▶ switch driver to previous tab`);
        await BrowserFactory.instance.switchTo().window(originalTab);
    }

    async getAlert() {
        return await BrowserFactory.instance.switchTo().alert();
    }

    async getAlertText() {
        logger.log(`    ▶ alert with text is open`);
        const text = await (await this.getAlert()).getText();
        logger.log(`    ▶ text contains: "${text}"`);
        return text;
    }

    async enterTextToAlert(text) {
        logger.log('    ▶ input text to alert form');
        await (await this.getAlert()).sendKeys(text);
    }

    async acceptAlert() {
        logger.log('    ▶ accept alert');
        await (await this.getAlert()).accept();
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
        logger.log('    ▶ go into frame');
        await BrowserFactory.instance.switchTo().frame(index);
    }

    async goOutOfFrame() {
        logger.log('    ▶ go out of frame');
        await BrowserFactory.instance.switchTo().defaultContent();
    }

    async closeTab() {
        logger.log('    ▶ close tab');
        await BrowserFactory.instance.close();
    }
    
    quitDriver() {
        logger.log('    ▶ quit driver');
        BrowserFactory.instance.quit();
        BrowserFactory.instance = null;
    }
}

export default new BrowserUtils();
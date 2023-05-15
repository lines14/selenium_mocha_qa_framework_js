import Driver from './browser_factory.js';
import configManager from '../utils/data/config_manager.js';
import logger from '../utils/log/logger.js';

class BrowserUtils {
    initTheDriver() {
        logger.log('    ▶ init driver');
        Driver.createInstance();
    }

    async getUrl(_) {
        await Driver.instance.get(_);
    }

    async scrollToTheBottom() {
        await Driver.instance.executeScript('window.scrollBy(0, document.body.scrollHeight);');
    }

    async handleOriginalTab() {
        return await Driver.instance.getWindowHandle();
    }

    async getTabsCount() {
        return (await Driver.instance.getAllWindowHandles()).length;
    }

    async switchDriverToTheAnotherTab(prevTabsCount, number) {
        logger.log(`    ▶ switch driver to ${number} tab`);
        await Driver.instance.wait(async () => (await Driver.instance.getAllWindowHandles()).length > prevTabsCount, configManager.getConfigData().waitTime);
        const windows = await Driver.instance.getAllWindowHandles();
        await Driver.instance.switchTo().window(windows[number]);
    }

    async switchDriverToTheOriginalTab(originalTab) {
        logger.log(`    ▶ switch driver to previous tab`);
        await Driver.instance.switchTo().window(originalTab);
    }

    async getAlert() {
        return await Driver.instance.switchTo().alert();
    }

    async getAlertText() {
        logger.log(`    ▶ alert with text is open`);
        const alert = await this.getAlert();
        const text = await alert.getText();
        logger.log(`    ▶ text contains: "${text}"`);
        return text;
    }

    async enterTextToAlert(text) {
        logger.log('    ▶ input text to alert form');
        const alert = await this.getAlert();
        await alert.sendKeys(text);
    }

    async acceptAlert() {
        logger.log('    ▶ accept alert');
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
        logger.log('    ▶ go into frame');
        await Driver.instance.switchTo().frame(index);
    }

    async goOutOfFrame() {
        logger.log('    ▶ go out of frame');
        await Driver.instance.switchTo().defaultContent();
    }

    async closeTab() {
        logger.log('    ▶ close tab');
        await Driver.instance.close();
    }
    
    quitDriver() {
        logger.log('    ▶ quit driver');
        Driver.instance.quit();
        Driver.instance = null;
    }
}

export default new BrowserUtils();
import { assert } from 'chai';
import mainPage from './pageObjects/mainPage.js';
import alertsFrameWindowsPage from './pageObjects/alertsFrameWindowsPage.js';
import alertsPage from './pageObjects/alertsPage.js';
import leftMenuForm from './pageObjects/leftMenuForm.js';
import ConfigManager from '../main/utils/data/configManager.js';
import BrowserUtils from '../main/driver/browserUtils.js';
import Randomizer from '../main/utils/random/randomizer.js';

describe('Test scenario: #1. Alerts', () => {
    it('#1. Alerts', async () => {
        await BrowserUtils.getUrl(ConfigManager.getConfigData().baseURL);
        assert.isTrue(await mainPage.pageIsDisplayed(), 'Main page is not open');

        await mainPage.clickAlertsFrameWindowsButton();
        await alertsFrameWindowsPage.pageIsDisplayed();
        await leftMenuForm.clickAlertsButton();
        assert.isTrue(await alertsPage.pageIsDisplayed(), 'Alerts form has not appeared on the page');

        await alertsPage.clickAlertButton();
        assert.equal(await BrowserUtils.getAlertText(), ConfigManager.getTestData().alertText1, 'Alert with text "You clicked a button" is not open');

        await BrowserUtils.acceptAlert();
        assert.isFalse(await BrowserUtils.alertIsDisplayed(), 'Alert has not closed');

        await alertsPage.clickConfirmButton();
        assert.equal(await BrowserUtils.getAlertText(), ConfigManager.getTestData().alertText2, 'Alert with text "Do you confirm action?" is not open');

        await BrowserUtils.acceptAlert();
        assert.isFalse(await BrowserUtils.alertIsDisplayed(), 'Alert has not closed');
        assert.isTrue(await alertsPage.confirmTextIsDisplayed(), 'Text "You selected Ok" has not appeared on page');

        await alertsPage.clickPromptButton();
        assert.equal(await BrowserUtils.getAlertText(), ConfigManager.getTestData().alertText3, 'Alert with text "Please enter your name" is not open');

        const randomText = await Randomizer.getRandomString(true, true, true);
        await BrowserUtils.enterTextToAlert(randomText);
        await BrowserUtils.acceptAlert();
        assert.isFalse(await BrowserUtils.alertIsDisplayed(), 'Alert has not closed');
        assert.equal(await alertsPage.getEnteredText(), ConfigManager.getTestData().labelText + randomText, "Appeared text not equals to the one you've entered before");
    });
});
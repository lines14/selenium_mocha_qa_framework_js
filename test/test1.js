import { assert } from 'chai';
import configManager from '../main/utils/data/configManager.js';
import browserUtils from '../main/driver/browserUtils.js';
import mainPage from './pageObjects/mainPage.js';
import alertsFrameWindowsPage from './pageObjects/alertsFrameWindowsPage.js';
import alertsPage from './pageObjects/alertsPage.js';
import leftMenuForm from './pageObjects/leftMenuForm.js';
import randomizer from '../main/utils/random/randomizer.js';

describe('Test scenario: #1. Alerts', () => {
    it('#1. Alerts', async () => {
        await browserUtils.getUrl(configManager.getConfigData().baseURL);
        assert.isTrue(await mainPage.pageIsDisplayed(), 'Main page is not open');

        await mainPage.clickAlertsFrameWindowsButton();
        await alertsFrameWindowsPage.pageIsDisplayed();
        await leftMenuForm.clickAlertsButton();
        assert.isTrue(await alertsPage.pageIsDisplayed(), 'Alerts form has not appeared on the page');

        await alertsPage.clickAlertButton();
        assert.equal(await browserUtils.getAlertText(), configManager.getTestData().alertText1, 'Alert with text "You clicked a button" is not open');

        await browserUtils.acceptAlert();
        assert.isFalse(await browserUtils.alertIsDisplayed(), 'Alert has not closed');

        await alertsPage.clickConfirmButton();
        assert.equal(await browserUtils.getAlertText(), configManager.getTestData().alertText2, 'Alert with text "Do you confirm action?" is not open');

        await browserUtils.acceptAlert();
        assert.isFalse(await browserUtils.alertIsDisplayed(), 'Alert has not closed');
        assert.isTrue(await alertsPage.confirmTextIsDisplayed(), 'Text "You selected Ok" has not appeared on page');

        await alertsPage.clickPromptButton();
        assert.equal(await browserUtils.getAlertText(), configManager.getTestData().alertText3, 'Alert with text "Please enter your name" is not open');

        const randomText = await randomizer.getRandomString(true, true, true);
        await browserUtils.enterTextToAlert(randomText);
        await browserUtils.acceptAlert();
        assert.isFalse(await browserUtils.alertIsDisplayed(), 'Alert has not closed');
        assert.equal(await alertsPage.getEnteredText(), configManager.getTestData().labelText + randomText, "Appeared text not equals to the one you've entered before");
    });
});
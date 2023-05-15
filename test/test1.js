import { assert } from 'chai';
import configManager from '../main/utils/data/config_manager.js';
import browserUtils from '../main/driver/browser_utils.js';
import mainPage from './page_objects/main_page.js';
import alertsFrameWindowsPage from './page_objects/alerts_frame_windows_page.js';
import alertsPage from './page_objects/alerts_page.js';
import leftMenuForm from './page_objects/left_menu_form.js';

describe('Test scenario: #1. Alerts', function(){
    it('#1. Alerts', async function() {
        await browserUtils.getUrl(configManager.getConfigData().url);
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

        await browserUtils.enterTextToAlert(configManager.getTestData().randomText);
        await browserUtils.acceptAlert();
        assert.isFalse(await browserUtils.alertIsDisplayed(), 'Alert has not closed');
        assert.equal(await alertsPage.getEnteredText(), configManager.getTestData().labelText + configManager.getTestData().randomText, "Appeared text not equals to the one you've entered before");
    });
});
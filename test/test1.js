const chai = require('chai');
const configManager = require('../main/config_manager');
const mainPage = require('../main/page_objects/main_page');
const alertsFrameWindowsPage = require('../main/page_objects/alerts_frame_windows_page');
const alertsPage = require('../main/page_objects/alerts_page');
const leftMenuForm = require('../main/page_objects/left_menu_form');
const browserUtils = require('../main/framework/browser_utils');

describe('Test scenario: #1. Alerts', function(){
    before(async function() {
        await browserUtils.initTheDriver(configManager.getConfigData().browser);
    });
    it('#1. Alerts', async function() {
        await browserUtils.getUrl(configManager.getConfigData().url);
        const isMainPageDisplayed = await mainPage.pageIsDisplayed()
        chai.assert.equal(isMainPageDisplayed, true, 'Main page is not open');

        await mainPage.clickAlertsFrameWindowsButton();
        await alertsFrameWindowsPage.pageIsDisplayed();
        await leftMenuForm.clickAlertsButton();
        const isAlertsPageDisplayed = await alertsPage.pageIsDisplayed();
        chai.assert.equal(isAlertsPageDisplayed, true, 'Alerts form has not appeared on the page');

        await alertsPage.clickAlertButton();
        const alertText1 = await browserUtils.getAlertText();
        chai.assert.equal(alertText1, configManager.getTestData().alertText1, 'Alert with text "You clicked a button" is not open');

        await browserUtils.acceptAlert();
        const isFirstAlertDisplayed = await browserUtils.alertIsDisplayed();
        chai.assert.equal(isFirstAlertDisplayed, false, 'Alert has not closed');

        await alertsPage.clickConfirmButton();
        const alertText2 = await browserUtils.getAlertText();
        chai.assert.equal(alertText2, configManager.getTestData().alertText2, 'Alert with text "Do you confirm action?" is not open');

        await browserUtils.acceptAlert();
        const isSecondAlertDisplayed = await browserUtils.alertIsDisplayed();
        chai.assert.equal(isSecondAlertDisplayed, false, 'Alert has not closed');
        const isConfirmTextDisplayed = await alertsPage.confirmTextIsDisplayed();
        chai.assert.equal(isConfirmTextDisplayed, true, 'Text "You selected Ok" has not appeared on page');

        await alertsPage.clickPromptButton();
        const alertText3 = await browserUtils.getAlertText();
        chai.assert.equal(alertText3, configManager.getTestData().alertText3, 'Alert with text "Please enter your name" is not open');

        await browserUtils.enterTextToAlert(configManager.getTestData().randomText);
        await browserUtils.acceptAlert();
        const isThirdAlertDisplayed = await browserUtils.alertIsDisplayed();
        chai.assert.equal(isThirdAlertDisplayed, false, 'Alert has not closed');
        const enteredText = await alertsPage.getEnteredText();
        chai.assert.equal(enteredText, configManager.getTestData().labelText + configManager.getTestData().randomText, "Appeared text not equals to the one you've entered before");
    });
    after(async function() {
        await browserUtils.quitDriver();
    });
});
const chai = require('chai');
const dataProvider = require('../main/data_provider');
const mainPage = require('../main/page_objects/main_page');
const alertsFrameWindowsPage = require('../main/page_objects/alerts_frame_windows_page');
const alertsPage = require('../main/page_objects/alerts_page');
const browser = require('../main/framework/browser');
const alertChecker = require('../main/framework/alert_checker');

describe('Test scenario: #1. Alerts:', function(){
    before(async function() {
        await browser.initTheDriver(dataProvider.getConfigData().browser);
    });

    it('Main page is open', async function() {
        await browser.go_to_url(dataProvider.getConfigData().url);
        const bool1 = await mainPage.mainPageIsDisplayed()
        chai.assert.equal(bool1, true, 'Main page is not open');
    });

    it('Alerts form has appeared on the page', async function() {
        await mainPage.clickAlertsFrameWindowsButton();
        await alertsFrameWindowsPage.alertsFrameWindowsPageIsDisplayed();
        await alertsFrameWindowsPage.clickAlertsButton();
        const bool2 = await alertsPage.alertsPageIsDisplayed();
        chai.assert.equal(bool2, true, 'Alerts form has not appeared on the page');
    });

    it('Alert with text "You clicked a button" is open', async function() {
        await alertsPage.clickButtonToSeeAlertButton();
        const alertText1 = await browser.getAlertText();
        chai.assert.equal(alertText1, 'You clicked a button', 'Alert with text "You clicked a button" is not open');
    });

    it('Alert has closed', async function() {
        await browser.acceptAlert();
        const bool3 = await alertChecker.boolAlertIsDisplayed();
        chai.assert.equal(bool3, false, 'Alert has not closed');
    });

    it('Alert with text "Do you confirm action?" is open', async function() {
        await alertsPage.onButtonClickConfirmBoxWillAppearButton();
        const alertText2 = await browser.getAlertText();
        chai.assert.equal(alertText2, 'Do you confirm action?', 'Alert with text "Do you confirm action?" is not open');
    });

    it('Alert has closed. Text "You selected Ok" has appeared on page', async function() {
        await browser.acceptAlert();
        const bool4 = await alertChecker.boolAlertIsDisplayed();
        chai.assert.equal(bool4, false, 'Alert has not closed');
        const bool5 = await alertsPage.confirmTextIsDisplayed();
        chai.assert.equal(bool5, true, 'Text "You selected Ok" has not appeared on page');
    });

    it('Alert with text "Please enter your name" is open', async function() {
        await alertsPage.onButtonClickPromptBoxWillAppearButton();
        const alertText3 = await browser.getAlertText();
        chai.assert.equal(alertText3, 'Please enter your name', 'Alert with text "Please enter your name" is not open');
    });

    it("Alert has closed. Appeared text equals to the one you've entered before", async function() {
        await browser.enterTextToAlert(dataProvider.getTestData().randomText);
        await browser.acceptAlert();
        const bool6 = await alertChecker.boolAlertIsDisplayed();
        chai.assert.equal(bool6, false, 'Alert has not closed');
        const enteredText = await alertsPage.getEnteredText();
        chai.assert.equal(enteredText, `You entered ${dataProvider.getTestData().randomText}`, "Appeared text not equals to the one you've entered before");
    });

    after(async function() {
        await browser.quitDriver();
    });
});
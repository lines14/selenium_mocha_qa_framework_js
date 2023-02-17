const chai = require('chai');
const dataProvider = require('../main/data_provider');
const mainPage = require('../main/page_objects/main_page');
const alertsFrameWindowsPage = require('../main/page_objects/alerts_frame_windows_page');
const alertsPage = require('../main/page_objects/alerts_page');
const browserWindowsPage = require('../main/page_objects/browser_windows_page');
const samplePage = require('../main/page_objects/sample_page');
const linksPage = require('../main/page_objects/links_page');
const browser = require('../main/framework/browser');
const alertChecker = require('../main/framework/alert_checker');

describe('Test scenario: #4. Handles:', function(){
    let originalTab1;
    let originalTab2;
    before(async function() {
        await browser.initTheDriver(dataProvider.getConfigData().browser);
    });

    it('Main page is open', async function() {
        await browser.go_to_url(dataProvider.getConfigData().url);
        const bool1 = await mainPage.mainPageIsDisplayed()
        chai.assert.equal(bool1, true, 'Main page is not open');
    });

    it('Page with Browser Windows form is open', async function() {
        await mainPage.clickAlertsFrameWindowsButton();
        await alertsFrameWindowsPage.alertsFrameWindowsPageIsDisplayed();
        await alertsFrameWindowsPage.clickBrowserWindowsButton();
        const bool2 = await browserWindowsPage.browserWindowsPageIsDisplayed();
        chai.assert.equal(bool2, true, 'Page with Browser Windows form is not open');
    });

    it('New tab with sample page is open', async function() {
        originalTab1 = await browser.handleOriginalTab();
        await browserWindowsPage.clickNewTabButton()
        const tabsCount1 = await browser.checkTheTabsCount();
        chai.assert.equal(tabsCount1, 2, 'New tab is not open');
        await browser.switchDriverToTheAnotherTab(1);
        const bool3 = await samplePage.samplePageIsDisplayed();
        chai.assert.equal(bool3, true, 'Sample page is not open');
    });

    it('Page with Browser Windows form is open', async function() {
        await browser.closeTab();
        await browser.switchDriverToTheOriginalTab(originalTab1);
        const bool3 = await browserWindowsPage.browserWindowsPageIsDisplayed();
        chai.assert.equal(bool3, true, 'Page with Browser Windows form is not open');
    });

    it('Page with Links form is open', async function() {
        await browserWindowsPage.clickElementsButton();
        await browserWindowsPage.waitLinksButtonVisible();
        await browserWindowsPage.clickLinksButton();
        const bool4 = await linksPage.linksPageIsDisplayed();
        chai.assert.equal(bool4, true, 'Page with Links form is not open');
    });

    it('New tab with main page is open', async function() {
        originalTab2 = await browser.handleOriginalTab();
        await linksPage.clickHomeLink();
        const tabsCount2 = await browser.checkTheTabsCount();
        chai.assert.equal(tabsCount2, 2, 'New tab is not open');
        await browser.switchDriverToTheAnotherTab(1);
        const bool5 = await mainPage.mainPageIsDisplayed()
        chai.assert.equal(bool5, true, 'Main page is not open');
    });

    it('Page with Links form is open', async function() {
        await browser.switchDriverToTheOriginalTab(originalTab2);
        const bool6 = await linksPage.linksPageIsDisplayed();
        chai.assert.equal(bool6, true, 'Page with Links form is not open');
    });

    after(async function() {
        await browser.quitDriver();
    });
});
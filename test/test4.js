const chai = require('chai');
const dataProvider = require('../main/data_provider');
const mainPage = require('../main/page_objects/main_page');
const alertsFrameWindowsPage = require('../main/page_objects/alerts_frame_windows_page');
const browserWindowsPage = require('../main/page_objects/browser_windows_page');
const leftMenuForm = require('../main/page_objects/left_menu_form');
const samplePage = require('../main/page_objects/sample_page');
const linksPage = require('../main/page_objects/links_page');
const browserUtils = require('../main/framework/browser_utils');

describe('Test scenario: #4. Handles:', function(){
    let originalTab1;
    let originalTab2;
    before(async function() {
        await browserUtils.initTheDriver(dataProvider.getConfigData().browser);
    });

    it('Main page is open', async function() {
        await browserUtils.go_to_url(dataProvider.getConfigData().url);
        const bool1 = await mainPage.mainPageIsDisplayed()
        chai.assert.equal(bool1, true, 'Main page is not open');
    });

    it('Page with Browser Windows form is open', async function() {
        await mainPage.clickAlertsFrameWindowsButton();
        await alertsFrameWindowsPage.alertsFrameWindowsPageIsDisplayed();
        await leftMenuForm.clickBrowserWindowsButton();
        const bool2 = await browserWindowsPage.browserWindowsPageIsDisplayed();
        chai.assert.equal(bool2, true, 'Page with Browser Windows form is not open');
    });

    it('New tab with sample page is open', async function() {
        originalTab1 = await browserUtils.handleOriginalTab();
        await browserWindowsPage.clickNewTabButton()
        const tabsCount1 = await browserUtils.checkTheTabsCount();
        chai.assert.equal(tabsCount1, 2, 'New tab is not open');
        await browserUtils.switchDriverToTheAnotherTab(1);
        const bool3 = await samplePage.samplePageIsDisplayed();
        chai.assert.equal(bool3, true, 'Sample page is not open');
    });

    it('Page with Browser Windows form is open', async function() {
        await browserUtils.closeTab();
        await browserUtils.switchDriverToTheOriginalTab(originalTab1);
        const bool3 = await browserWindowsPage.browserWindowsPageIsDisplayed();
        chai.assert.equal(bool3, true, 'Page with Browser Windows form is not open');
    });

    it('Page with Links form is open', async function() {
        await leftMenuForm.clickElementsButton();
        await leftMenuForm.waitLinksButtonVisible();
        await leftMenuForm.clickLinksButton();
        const bool4 = await linksPage.linksPageIsDisplayed();
        chai.assert.equal(bool4, true, 'Page with Links form is not open');
    });

    it('New tab with main page is open', async function() {
        originalTab2 = await browserUtils.handleOriginalTab();
        await linksPage.clickHomeLink();
        const tabsCount2 = await browserUtils.checkTheTabsCount();
        chai.assert.equal(tabsCount2, 2, 'New tab is not open');
        await browserUtils.switchDriverToTheAnotherTab(1);
        const bool5 = await mainPage.mainPageIsDisplayed()
        chai.assert.equal(bool5, true, 'Main page is not open');
    });

    it('Page with Links form is open', async function() {
        await browserUtils.switchDriverToTheOriginalTab(originalTab2);
        const bool6 = await linksPage.linksPageIsDisplayed();
        chai.assert.equal(bool6, true, 'Page with Links form is not open');
    });

    after(async function() {
        await browserUtils.quitDriver();
    });
});
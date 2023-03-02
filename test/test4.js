const chai = require('chai');
const configManager = require('../main/config_manager');
const mainPage = require('../main/page_objects/main_page');
const alertsFrameWindowsPage = require('../main/page_objects/alerts_frame_windows_page');
const browserWindowsPage = require('../main/page_objects/browser_windows_page');
const leftMenuForm = require('../main/page_objects/left_menu_form');
const samplePage = require('../main/page_objects/sample_page');
const linksPage = require('../main/page_objects/links_page');
const browserUtils = require('../main/framework/browser_utils');

describe('Test scenario: #4. Handles:', function(){
    before(async function() {
        await browserUtils.initTheDriver(configManager.getConfigData().browser);
    });
    it('#4. Handles', async function() {
        await browserUtils.getUrl(configManager.getConfigData().url);
        let isMainPageDisplayed = await mainPage.pageIsDisplayed()
        chai.assert.equal(isMainPageDisplayed, true, 'Main page is not open');

        await mainPage.clickAlertsFrameWindowsButton();
        await alertsFrameWindowsPage.pageIsDisplayed();
        await leftMenuForm.clickBrowserWindowsButton();
        let isBrowserWindowsPageDisplayed = await browserWindowsPage.pageIsDisplayed();
        chai.assert.equal(isBrowserWindowsPageDisplayed, true, 'Page with Browser Windows form is not open');

        const originalTab1 = await browserUtils.handleOriginalTab();
        let prevTabsCount = await browserUtils.getTabsCount();
        await browserWindowsPage.clickNewTabButton()
        const tabsCount1 = await browserUtils.getTabsCount();
        chai.assert.isTrue(tabsCount1 > prevTabsCount, 'New tab is not open');
        await browserUtils.switchDriverToTheAnotherTab(prevTabsCount, 1);
        const isSamplePageDisplayed = await samplePage.pageIsDisplayed();
        chai.assert.equal(isSamplePageDisplayed, true, 'Sample page is not open');

        await browserUtils.closeTab();
        await browserUtils.switchDriverToTheOriginalTab(originalTab1);
        isBrowserWindowsPageDisplayed = await browserWindowsPage.pageIsDisplayed();
        chai.assert.equal(isBrowserWindowsPageDisplayed, true, 'Page with Browser Windows form is not open');

        await leftMenuForm.clickElementsButton();
        await leftMenuForm.waitLinksButtonVisible();
        await leftMenuForm.clickLinksButton();
        let isLinksPageDisplayed = await linksPage.pageIsDisplayed();
        chai.assert.equal(isLinksPageDisplayed, true, 'Page with Links form is not open');

        const originalTab2 = await browserUtils.handleOriginalTab();
        prevTabsCount = await browserUtils.getTabsCount();
        await linksPage.clickHomeLink();
        const tabsCount2 = await browserUtils.getTabsCount();
        chai.assert.isTrue(tabsCount2 > prevTabsCount, 'New tab is not open');
        await browserUtils.switchDriverToTheAnotherTab(prevTabsCount, 1);
        isMainPageDisplayed = await mainPage.pageIsDisplayed()
        chai.assert.equal(isMainPageDisplayed, true, 'Main page is not open');

        await browserUtils.switchDriverToTheOriginalTab(originalTab2);
        isLinksPageDisplayed = await linksPage.pageIsDisplayed();
        chai.assert.equal(isLinksPageDisplayed, true, 'Page with Links form is not open');
    });
    after(async function() {
        await browserUtils.quitDriver();
    });
});
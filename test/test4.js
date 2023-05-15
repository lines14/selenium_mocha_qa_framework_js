import { assert } from 'chai';
import configManager from '../main/utils/data/config_manager.js';
import browserUtils from '../main/driver/browser_utils.js';
import mainPage from './page_objects/main_page.js';
import alertsFrameWindowsPage from './page_objects/alerts_frame_windows_page.js';
import browserWindowsPage from './page_objects/browser_windows_page.js';
import leftMenuForm from './page_objects/left_menu_form.js';
import samplePage from './page_objects/sample_page.js';
import linksPage from './page_objects/links_page.js';

describe('Test scenario: #4. Handles:', function(){
    it('#4. Handles', async function() {
        await browserUtils.getUrl(configManager.getConfigData().url);
        let isMainPageDisplayed = await mainPage.pageIsDisplayed()
        assert.equal(isMainPageDisplayed, true, 'Main page is not open');

        await mainPage.clickAlertsFrameWindowsButton();
        await alertsFrameWindowsPage.pageIsDisplayed();
        await leftMenuForm.clickBrowserWindowsButton();
        let isBrowserWindowsPageDisplayed = await browserWindowsPage.pageIsDisplayed();
        assert.equal(isBrowserWindowsPageDisplayed, true, 'Page with Browser Windows form is not open');

        const originalTab1 = await browserUtils.handleOriginalTab();
        let prevTabsCount = await browserUtils.getTabsCount();
        await browserWindowsPage.clickNewTabButton()
        const tabsCount1 = await browserUtils.getTabsCount();
        assert.isTrue(tabsCount1 > prevTabsCount, 'New tab is not open');
        await browserUtils.switchDriverToTheAnotherTab(prevTabsCount, 1);
        const isSamplePageDisplayed = await samplePage.pageIsDisplayed();
        assert.equal(isSamplePageDisplayed, true, 'Sample page is not open');

        await browserUtils.closeTab();
        await browserUtils.switchDriverToTheOriginalTab(originalTab1);
        isBrowserWindowsPageDisplayed = await browserWindowsPage.pageIsDisplayed();
        assert.equal(isBrowserWindowsPageDisplayed, true, 'Page with Browser Windows form is not open');

        await leftMenuForm.clickElementsButton();
        await leftMenuForm.waitLinksButtonVisible();
        await leftMenuForm.clickLinksButton();
        let isLinksPageDisplayed = await linksPage.pageIsDisplayed();
        assert.equal(isLinksPageDisplayed, true, 'Page with Links form is not open');

        const originalTab2 = await browserUtils.handleOriginalTab();
        prevTabsCount = await browserUtils.getTabsCount();
        await linksPage.clickHomeLink();
        const tabsCount2 = await browserUtils.getTabsCount();
        assert.isTrue(tabsCount2 > prevTabsCount, 'New tab is not open');
        await browserUtils.switchDriverToTheAnotherTab(prevTabsCount, 1);
        isMainPageDisplayed = await mainPage.pageIsDisplayed()
        assert.equal(isMainPageDisplayed, true, 'Main page is not open');

        await browserUtils.switchDriverToTheOriginalTab(originalTab2);
        isLinksPageDisplayed = await linksPage.pageIsDisplayed();
        assert.equal(isLinksPageDisplayed, true, 'Page with Links form is not open');
    });
});
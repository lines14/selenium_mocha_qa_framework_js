import { assert } from 'chai';
import mainPage from './pageObjects/mainPage.js';
import alertsFrameWindowsPage from './pageObjects/alertsFrameWindowsPage.js';
import browserWindowsPage from './pageObjects/browserWindowsPage.js';
import leftMenuForm from './pageObjects/leftMenuForm.js';
import samplePage from './pageObjects/samplePage.js';
import linksPage from './pageObjects/linksPage.js';
import BrowserUtils from '../main/driver/browserUtils.js';
import ConfigManager from '../main/utils/data/configManager.js';

describe('Test scenario: #4. Handles:', () => {
    it('#4. Handles', async () => {
        await BrowserUtils.getUrl(ConfigManager.getConfigData().baseURL);
        assert.isTrue(await mainPage.pageIsDisplayed(), 'Main page is not open');

        await mainPage.clickAlertsFrameWindowsButton();
        await alertsFrameWindowsPage.pageIsDisplayed();
        await leftMenuForm.clickBrowserWindowsButton();
        assert.isTrue(await browserWindowsPage.pageIsDisplayed(), 'Page with Browser Windows form is not open');

        let originalTab = await BrowserUtils.handleOriginalTab();
        let prevTabsCount = await BrowserUtils.getTabsCount();
        await browserWindowsPage.clickNewTabButton()
        assert.isTrue(await BrowserUtils.getTabsCount() > prevTabsCount, 'New tab is not open');
        await BrowserUtils.switchDriverToTheAnotherTab(prevTabsCount, originalTab);
        assert.isTrue(await samplePage.pageIsDisplayed(), 'Sample page is not open');

        await BrowserUtils.closeTab();
        await BrowserUtils.switchDriverToTheOriginalTab(originalTab);
        assert.isTrue(await browserWindowsPage.pageIsDisplayed(), 'Page with Browser Windows form is not open');

        await leftMenuForm.clickElementsButton();
        await leftMenuForm.waitLinksButtonVisible();
        await leftMenuForm.clickLinksButton();
        assert.isTrue(await linksPage.pageIsDisplayed(), 'Page with Links form is not open');

        originalTab = await BrowserUtils.handleOriginalTab();
        prevTabsCount = await BrowserUtils.getTabsCount();
        await linksPage.clickHomeLink();
        assert.isTrue(await BrowserUtils.getTabsCount() > prevTabsCount, 'New tab is not open');
        await BrowserUtils.switchDriverToTheAnotherTab(prevTabsCount, originalTab);
        assert.isTrue(await mainPage.pageIsDisplayed(), 'Main page is not open');

        await BrowserUtils.switchDriverToTheOriginalTab(originalTab);
        assert.isTrue(await linksPage.pageIsDisplayed(), 'Page with Links form is not open');
    });
});
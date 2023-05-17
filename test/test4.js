import { assert } from 'chai';
import configManager from '../main/utils/data/configManager.js';
import browserUtils from '../main/driver/browserUtils.js';
import mainPage from './pageObjects/mainPage.js';
import alertsFrameWindowsPage from './pageObjects/alertsFrameWindowsPage.js';
import browserWindowsPage from './pageObjects/browserWindowsPage.js';
import leftMenuForm from './pageObjects/leftMenuForm.js';
import samplePage from './pageObjects/samplePage.js';
import linksPage from './pageObjects/linksPage.js';

describe('Test scenario: #4. Handles:', () => {
    it('#4. Handles', async () => {
        await browserUtils.getUrl(configManager.getConfigData().baseURL);
        assert.isTrue(await mainPage.pageIsDisplayed(), 'Main page is not open');

        await mainPage.clickAlertsFrameWindowsButton();
        await alertsFrameWindowsPage.pageIsDisplayed();
        await leftMenuForm.clickBrowserWindowsButton();
        assert.isTrue(await browserWindowsPage.pageIsDisplayed(), 'Page with Browser Windows form is not open');

        let originalTab = await browserUtils.handleOriginalTab();
        let prevTabsCount = await browserUtils.getTabsCount();
        await browserWindowsPage.clickNewTabButton()
        assert.isTrue(await browserUtils.getTabsCount() > prevTabsCount, 'New tab is not open');
        await browserUtils.switchDriverToTheAnotherTab(prevTabsCount, 1);
        assert.isTrue(await samplePage.pageIsDisplayed(), 'Sample page is not open');

        await browserUtils.closeTab();
        await browserUtils.switchDriverToTheOriginalTab(originalTab);
        assert.isTrue(await browserWindowsPage.pageIsDisplayed(), 'Page with Browser Windows form is not open');

        await leftMenuForm.clickElementsButton();
        await leftMenuForm.waitLinksButtonVisible();
        await leftMenuForm.clickLinksButton();
        assert.isTrue(await linksPage.pageIsDisplayed(), 'Page with Links form is not open');

        originalTab = await browserUtils.handleOriginalTab();
        prevTabsCount = await browserUtils.getTabsCount();
        await linksPage.clickHomeLink();
        assert.isTrue(await browserUtils.getTabsCount() > prevTabsCount, 'New tab is not open');
        await browserUtils.switchDriverToTheAnotherTab(prevTabsCount, 1);
        assert.isTrue(await mainPage.pageIsDisplayed(), 'Main page is not open');

        await browserUtils.switchDriverToTheOriginalTab(originalTab);
        assert.isTrue(await linksPage.pageIsDisplayed(), 'Page with Links form is not open');
    });
});
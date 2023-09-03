import { assert } from 'chai';
import mainPage from './pageObjects/mainPage.js';
import alertsFrameWindowsPage from './pageObjects/alertsFrameWindowsPage.js';
import nestedFramesPage from './pageObjects/nestedFramesPage.js';
import framesPage from './pageObjects/framesPage.js';
import leftMenuForm from './pageObjects/leftMenuForm.js';
import frame1 from './pageObjects/frame1.js';
import frame2 from './pageObjects/frame2.js';
import frame3 from './pageObjects/frame3.js';
import frame4 from './pageObjects/frame4.js';
import BrowserUtils from '../main/driver/browserUtils.js';
import ConfigManager from '../main/utils/data/configManager.js';

describe('Test scenario: #2. Iframe:', () => {
    it('#2. Iframe', async () => {
        await BrowserUtils.getUrl(ConfigManager.getConfigData().baseURL);
        assert.isTrue(await mainPage.pageIsDisplayed(), 'Main page is not open');

        await mainPage.clickAlertsFrameWindowsButton();
        await alertsFrameWindowsPage.pageIsDisplayed();
        await leftMenuForm.clickNestedFramesButton();
        assert.isTrue(await nestedFramesPage.pageIsDisplayed(), 'Page with Nested Frames form is not open');
        await BrowserUtils.goIntoFrame(ConfigManager.getTestData().frame1);
        assert.equal(await frame1.getFrameText(), ConfigManager.getTestData().parentFrameText, 'Message "Parent frame" not present on page');
        await BrowserUtils.goIntoFrame(ConfigManager.getTestData().frameNoName);
        assert.equal(await frame2.getFrameText(), ConfigManager.getTestData().childIframeText, 'Message "Child Iframe" not present on page');
        await BrowserUtils.goOutOfFrame();
        await BrowserUtils.goOutOfFrame();

        await leftMenuForm.clickFramesButton();
        assert.isTrue(await framesPage.pageIsDisplayed(), 'Page with Frames form is not open');
        await BrowserUtils.goIntoFrame(ConfigManager.getTestData().frame1);
        const firstFrameText = await frame3.getFrameText();
        await BrowserUtils.goOutOfFrame();
        await BrowserUtils.goIntoFrame(ConfigManager.getTestData().frame2);
        assert.equal(firstFrameText, await frame4.getFrameText(), 'Message from upper frame is not equal to the message from lower frame');
    });
});
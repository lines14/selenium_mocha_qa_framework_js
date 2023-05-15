import { assert } from 'chai';
import configManager from '../main/utils/data/config_manager.js';
import mainPage from './page_objects/main_page.js';
import alertsFrameWindowsPage from './page_objects/alerts_frame_windows_page.js';
import nestedFramesPage from './page_objects/nested_frames_page.js';
import framesPage from './page_objects/frames_page.js';
import leftMenuForm from './page_objects/left_menu_form.js';
import browserUtils from '../main/driver/browser_utils.js';
import frame1 from './page_objects/frame1.js';
import frame2 from './page_objects/frame2.js';
import frame3 from './page_objects/frame3.js';
import frame4 from './page_objects/frame4.js';

describe('Test scenario: #2. Iframe:', function(){
    it('#2. Iframe', async function() {
        await browserUtils.getUrl(configManager.getConfigData().url);
        const isMainPageDisplayed = await mainPage.pageIsDisplayed()
        assert.equal(isMainPageDisplayed, true, 'Main page is not open');

        await mainPage.clickAlertsFrameWindowsButton();
        await alertsFrameWindowsPage.pageIsDisplayed();
        await leftMenuForm.clickNestedFramesButton();
        const isNestedFramesPageDisplayed = await nestedFramesPage.pageIsDisplayed();
        assert.equal(isNestedFramesPageDisplayed, true, 'Page with Nested Frames form is not open');
        await browserUtils.goIntoFrame('frame1');
        const parentFrameText = await frame1.getFrameText();
        assert.equal(parentFrameText, configManager.getTestData().parentFrameText, 'Message "Parent frame" not present on page');
        await browserUtils.goIntoFrame(0);
        const childIframeText = await frame2.getFrameText();
        assert.equal(childIframeText, configManager.getTestData().childIframeText, 'Message "Child Iframe" not present on page');
        await browserUtils.goOutOfFrame();
        await browserUtils.goOutOfFrame();

        await leftMenuForm.clickFramesButton();
        const isFramesPageDisplayed = await framesPage.pageIsDisplayed();
        assert.equal(isFramesPageDisplayed, true, 'Page with Frames form is not open');
        await browserUtils.goIntoFrame('frame1');
        const firstFrameText = await frame3.getFrameText();
        await browserUtils.goOutOfFrame();
        await browserUtils.goIntoFrame('frame2');
        const secondFrameText = await frame4.getFrameText();
        await browserUtils.goOutOfFrame();
        assert.equal(firstFrameText, secondFrameText, 'Message from upper frame is not equal to the message from lower frame');
    });
});
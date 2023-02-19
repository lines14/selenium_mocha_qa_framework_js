const chai = require('chai');
const configManager = require('../main/config_manager');
const mainPage = require('../main/page_objects/main_page');
const alertsFrameWindowsPage = require('../main/page_objects/alerts_frame_windows_page');
const nestedFramesPage = require('../main/page_objects/nested_frames_page');
const framesPage = require('../main/page_objects/frames_page');
const leftMenuForm = require('../main/page_objects/left_menu_form');
const browserUtils = require('../main/framework/browser_utils');
const frame1 = require('../main/page_objects/frame1');
const frame2 = require('../main/page_objects/frame2');
const frame3 = require('../main/page_objects/frame3');
const frame4 = require('../main/page_objects/frame4');

describe('Test scenario: #2. Iframe:', function(){
    before(async function() {
        await browserUtils.initTheDriver(configManager.getConfigData().browser);
    });

    it('Main page is open', async function() {
        await browserUtils.go_to_url(configManager.getConfigData().url);
        const bool1 = await mainPage.mainPageIsDisplayed()
        chai.assert.equal(bool1, true, 'Main page is not open');
    });

    it('Page with Nested Frames form is open. There are messages "Parent frame" & "Child Iframe" present on page', async function() {
        await mainPage.clickAlertsFrameWindowsButton();
        await alertsFrameWindowsPage.alertsFrameWindowsPageIsDisplayed();
        await leftMenuForm.clickNestedFramesButton();
        const bool2 = await nestedFramesPage.nestedFramesPageIsDisplayed();
        chai.assert.equal(bool2, true, 'Page with Nested Frames form is not open');
        await browserUtils.goIntoFrame('frame1');
        const text1 = await frame1.getFrameText();
        chai.assert.equal(text1, 'Parent frame', 'Message "Parent frame" not present on page');
        await browserUtils.goIntoFrame(0);
        const text2 = await frame2.getFrameText();
        chai.assert.equal(text2, 'Child Iframe', 'Message "Child Iframe" not present on page');
        await browserUtils.goOutOfFrame();
        await browserUtils.goOutOfFrame();
    });

    it('Page with Frames form is open. Message from upper frame is equal to the message from lower frame', async function() {
        await leftMenuForm.clickFramesButton();
        const bool3 = await framesPage.framesPageIsDisplayed();
        chai.assert.equal(bool3, true, 'Page with Frames form is not open');
        await browserUtils.goIntoFrame('frame1');
        const text3 = await frame3.getFrameText();
        await browserUtils.goOutOfFrame();
        await browserUtils.goIntoFrame('frame2');
        const text4 = await frame4.getFrameText();
        await browserUtils.goOutOfFrame();
        chai.assert.equal(text3, text4, 'Message from upper frame is not equal to the message from lower frame');
    });

    after(async function() {
        await browserUtils.quitDriver();
    });
});
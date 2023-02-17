const chai = require('chai');
const dataProvider = require('../main/data_provider');
const mainPage = require('../main/page_objects/main_page');
const alertsFrameWindowsPage = require('../main/page_objects/alerts_frame_windows_page');
const nestedFramesPage = require('../main/page_objects/nested_frames_page');
const framesPage = require('../main/page_objects/frames_page');
const browser = require('../main/framework/browser');

describe('Test scenario: #2. Iframe:', function(){
    before(async function() {
        await browser.initTheDriver(dataProvider.getConfigData().browser);
    });

    it('Main page is open', async function() {
        await browser.go_to_url(dataProvider.getConfigData().url);
        const bool1 = await mainPage.mainPageIsDisplayed()
        chai.assert.equal(bool1, true, 'Main page is not open');
    });

    it('Page with Nested Frames form is open. There are messages "Parent frame" & "Child Iframe" present on page', async function() {
        await mainPage.clickAlertsFrameWindowsButton();
        await alertsFrameWindowsPage.alertsFrameWindowsPageIsDisplayed();
        await alertsFrameWindowsPage.clickNestedFramesButton();
        const bool2 = await nestedFramesPage.nestedFramesPageIsDisplayed();
        chai.assert.equal(bool2, true, 'Page with Nested Frames form is not open');
        await nestedFramesPage.goIntoFirstFrame();
        const text1 = await nestedFramesPage.getFirstFrameText();
        chai.assert.equal(text1, 'Parent frame', 'Message "Parent frame" not present on page');
        await nestedFramesPage.goIntoSecondFrame();
        const text2 = await nestedFramesPage.getSecondFrameText();
        chai.assert.equal(text2, 'Child Iframe', 'Message "Child Iframe" not present on page');
        await browser.goOutOfFrame();
        await browser.goOutOfFrame();
    });

    it('Page with Frames form is open. Message from upper frame is equal to the message from lower frame', async function() {
        await nestedFramesPage.clickFramesButton();
        const bool3 = await framesPage.framesPageIsDisplayed();
        chai.assert.equal(bool3, true, 'Page with Frames form is not open');
        await framesPage.goIntoFirstFrame();
        const text3 = await framesPage.getFirstFrameText();
        await browser.goOutOfFrame();
        await framesPage.goIntoSecondFrame();
        const text4 = await framesPage.getSecondFrameText();
        await browser.goOutOfFrame();
        chai.assert.equal(text3, text4, 'Message from upper frame is not equal to the message from lower frame');
    });

    after(async function() {
        await browser.quitDriver();
    });
});
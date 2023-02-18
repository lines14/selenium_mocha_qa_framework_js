const chai = require('chai');
const dataProvider = require('../main/data_provider');
const mainPage = require('../main/page_objects/main_page');
const alertsFrameWindowsPage = require('../main/page_objects/alerts_frame_windows_page');
const nestedFramesPage = require('../main/page_objects/nested_frames_page');
const framesPage = require('../main/page_objects/frames_page');
const elementsPage = require('../main/page_objects/elements_page');
const webTablesPage = require('../main/page_objects/web_tables_page');
const browser = require('../main/framework/browser');
const frame1 = require('../main/page_objects/frame1');
const frame2 = require('../main/page_objects/frame2');
const frame3 = require('../main/page_objects/frame3');
const frame4 = require('../main/page_objects/frame4');
const { webTablesPageIsDisplayed } = require('../main/page_objects/web_tables_page');

describe('Test scenario: #3. Tables:', function(){
    before(async function() {
        await browser.initTheDriver(dataProvider.getConfigData().browser);
    });

    it('Main page is open', async function() {
        await browser.go_to_url(dataProvider.getConfigData().url);
        const bool1 = await mainPage.mainPageIsDisplayed()
        chai.assert.equal(bool1, true, 'Main page is not open');
    });

    it('Page with Web Tables form is open', async function() {
        await mainPage.clickElementsButton();
        await elementsPage.elementsPageIsDisplayed();
        await elementsPage.clickWebTablesButton();
        const bool2 = await webTablesPage.webTablesPageIsDisplayed();
        chai.assert.equal(bool2, true, 'Page with Web Tables form is not open');
    });

    it('Registration Form has appeared on page', async function() {
        await webTablesPage.clickAddButton();
        await webTablesPage.waitRegistrationFormVisible();
        const bool3 = await webTablesPage.registrationFormIsDisplayed();
        chai.assert.equal(bool3, true, 'Registration Form has not appeared on page');
    });

    after(async function() {
        await browser.quitDriver();
    });
});
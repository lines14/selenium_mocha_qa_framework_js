const chai = require('chai');
const dataProvider = require('../main/data_provider');
const mainPage = require('../main/page_objects/main_page');
const elementsPage = require('../main/page_objects/elements_page');
const webTablesPage = require('../main/page_objects/web_tables_page');
const browser = require('../main/framework/browser');
const dataManager = require('../main/framework/data_manager');

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

    it('Registration Form has closed. Data of User № has appeared in a table', async function() {
        await dataManager.sendData();
        await webTablesPage.waitAddButtonIsVisible();
        const state = await webTablesPage.registrationFormIsPresent();
        chai.assert.equal(state, 0, 'Registration Form has not closed');
        const dataToCompare = dataProvider.getTestData().User1.split(' ');
        const tableRowsListAll = await dataManager.tableRowsAll();
        const strTableRowsListAll = tableRowsListAll.map(element => element.toString());
        chai.assert.includeDeepMembers(strTableRowsListAll, dataToCompare, 'Data of User № has not appeared in a table');
        // console.log(strTableRowsListAll);
        // console.log(dataToCompare);
    });

    after(async function() {
        await browser.quitDriver();
    });
});
const chai = require('chai');
const dataProvider = require('../main/data_provider');
const mainPage = require('../main/page_objects/main_page');
const elementsPage = require('../main/page_objects/elements_page');
const webTablesPage = require('../main/page_objects/web_tables_page');
const browserUtils = require('../main/framework/browser_utils');
const dataManager = require('../main/framework/data_manager');

describe('Test scenario: #3. Tables:', function(){
    let rowsCount1;
    let dataToCompare;
    before(async function() {
        await browserUtils.initTheDriver(dataProvider.getConfigData().browser);
    });

    it('Main page is open', async function() {
        await browserUtils.go_to_url(dataProvider.getConfigData().url);
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
        await dataManager.sendTestData();
        await webTablesPage.waitPageIsEnabled();
        const bool4 = await webTablesPage.pageIsEnabled();
        chai.assert.isTrue(bool4, 'Registration Form has not closed');
        rowsCount1 = await dataManager.filledRowsCounter();
        dataToCompare = dataProvider.getTestData().User1.split(' ');
        const tableRowsListAll1 = await dataManager.getTableRowsAll();
        chai.assert.includeDeepMembers(tableRowsListAll1, dataToCompare, 'Data of User № has not appeared in a table');
    });

    it('Number of records in table has changed. Data of User № has been deleted from table', async function() {
        await webTablesPage.clickDeletebutton();
        const rowsCount2 = await dataManager.filledRowsCounter();
        chai.assert.notEqual(rowsCount1, rowsCount2, 'Number of records in table has not changed');
        const tableRowsListAll2 = await dataManager.getTableRowsAll();
        chai.assert.notIncludeDeepMembers(tableRowsListAll2, dataToCompare, 'Data of User № has not been deleted from table');
    });

    after(async function() {
        await browserUtils.quitDriver();
    });
});
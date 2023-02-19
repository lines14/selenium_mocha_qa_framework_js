const chai = require('chai');
const configManager = require('../main/config_manager');
const mainPage = require('../main/page_objects/main_page');
const elementsPage = require('../main/page_objects/elements_page');
const leftMenuForm = require('../main/page_objects/left_menu_form');
const webTablesPage = require('../main/page_objects/web_tables_page');
const browserUtils = require('../main/framework/browser_utils');
const dataManager = require('../main/framework/data_manager');

describe('Test scenario: #3. Tables:', function(){
    let rowsCount1;
    let dataToCompare;
    before(async function() {
        await browserUtils.initTheDriver(configManager.getConfigData().browser);
    });
    it('#3. Tables', async function() {
        await browserUtils.go_to_url(configManager.getConfigData().url);
        const bool1 = await mainPage.mainPageIsDisplayed()
        chai.assert.equal(bool1, true, 'Main page is not open');

        await mainPage.clickElementsButton();
        await elementsPage.elementsPageIsDisplayed();
        await leftMenuForm.clickWebTablesButton();
        const bool2 = await webTablesPage.webTablesPageIsDisplayed();
        chai.assert.equal(bool2, true, 'Page with Web Tables form is not open');

        await webTablesPage.clickAddButton();
        await webTablesPage.waitRegistrationFormVisible();
        const bool3 = await webTablesPage.registrationFormIsDisplayed();
        chai.assert.equal(bool3, true, 'Registration Form has not appeared on page');

        await dataManager.sendTestData();
        await webTablesPage.waitPageIsEnabled();
        const bool4 = await webTablesPage.pageIsEnabled();
        chai.assert.isTrue(bool4, 'Registration Form has not closed');
        rowsCount1 = await dataManager.filledRowsCounter();
        dataToCompare = configManager.getTestData().User1.split(' ');
        const tableRowsListAll1 = await dataManager.getTableRowsAll();
        chai.assert.includeDeepMembers(tableRowsListAll1, dataToCompare, 'Data of User № has not appeared in a table');

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
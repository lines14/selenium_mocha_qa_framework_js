const chai = require('chai');
const configManager = require('../main/config_manager');
const mainPage = require('../main/page_objects/main_page');
const elementsPage = require('../main/page_objects/elements_page');
const leftMenuForm = require('../main/page_objects/left_menu_form');
const webTablesPage = require('../main/page_objects/web_tables_page');
const browserUtils = require('../main/framework/browser_utils');
const modelsGenerator = require('../main/framework/models_generator');

describe('Test scenario: #3. Tables:', function(){
    before(async function() {
        await browserUtils.initTheDriver(configManager.getConfigData().browser);
    });
    it('#3. Tables', async function() {
        await browserUtils.getUrl(configManager.getConfigData().url);
        const isMainPageDisplayed = await mainPage.pageIsDisplayed()
        chai.assert.equal(isMainPageDisplayed, true, 'Main page is not open');

        await mainPage.clickElementsButton();
        await elementsPage.pageIsDisplayed();
        await leftMenuForm.clickWebTablesButton();
        const isWebTablesPageDisplayed = await webTablesPage.pageIsDisplayed();
        chai.assert.equal(isWebTablesPageDisplayed, true, 'Page with Web Tables form is not open');

        await webTablesPage.clickAddButton();
        await webTablesPage.waitRegistrationFormVisible();
        const isRegistrationFormDisplayed = await webTablesPage.registrationFormIsDisplayed();
        chai.assert.equal(isRegistrationFormDisplayed, true, 'Registration Form has not appeared on page');

        await webTablesPage.sendTestData(configManager.getTestData().User1);
        await webTablesPage.waitPageIsEnabled();
        const isWebTablesPageEnabled = await webTablesPage.pageIsEnabled();
        chai.assert.isTrue(isWebTablesPageEnabled, 'Registration Form has not closed');
        const rowsCount1 = await webTablesPage.filledRowsCounter();
        const testModel = await modelsGenerator.modelsGenerator([configManager.getTestData().User1.split(',')], 1);
        const modelsFromTable1 = await modelsGenerator.modelsGenerator(await webTablesPage.getTableRowsText(), await webTablesPage.filledRowsCounter());
        chai.assert.includeMembers(modelsFromTable1, testModel, 'Data of User № has not appeared in a table');
        
        await webTablesPage.clickDeletebutton(rowsCount1);
        const rowsCount2 = await webTablesPage.filledRowsCounter();
        chai.assert.notEqual(rowsCount1, rowsCount2, 'Number of records in table has not changed');
        const modelsFromTable2 = await modelsGenerator.modelsGenerator(await webTablesPage.getTableRowsText(), await webTablesPage.filledRowsCounter());
        chai.assert.notIncludeMembers(modelsFromTable2, testModel, 'Data of User № has not been deleted from table');
    });
    after(async function() {
        await browserUtils.quitDriver();
    });
});
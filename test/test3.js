const chai = require('chai');
const configManager = require('../main/config_manager');
const mainPage = require('../main/page_objects/main_page');
const elementsPage = require('../main/page_objects/elements_page');
const leftMenuForm = require('../main/page_objects/left_menu_form');
const webTablesPage = require('../main/page_objects/web_tables_page');
const browserUtils = require('../main/framework/browser_utils');
const dataManager = require('../main/framework/data_manager');

describe('Test scenario: #3. Tables:', function(){
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

        let data_index = 1;
        while (data_index < configManager.getTestData().length) {
            await webTablesPage.clickAddButton();
            await webTablesPage.waitRegistrationFormVisible();
            const bool3 = await webTablesPage.registrationFormIsDisplayed();
            chai.assert.equal(bool3, true, 'Registration Form has not appeared on page');

            await dataManager.sendTestData(data_index);
            await webTablesPage.waitWebTablesPageIsEnabled();
            const bool4 = await webTablesPage.webTablesPageIsEnabled();
            chai.assert.isTrue(bool4, 'Registration Form has not closed');
            const rowsCount1 = await dataManager.filledRowsCounter();
            const testModel = await dataManager.modelFromTestData(data_index);
            const modelsFromTable1 = await dataManager.modelsFromTable();
            chai.assert.include(modelsFromTable1, testModel, 'Data of User № has not appeared in a table');
            
            await webTablesPage.clickDeletebutton(rowsCount1);
            const rowsCount2 = await dataManager.filledRowsCounter();
            chai.assert.notEqual(rowsCount1, rowsCount2, 'Number of records in table has not changed');
            const modelsFromTable2 = await dataManager.modelsFromTable();
            chai.assert.notInclude(modelsFromTable2, testModel, 'Data of User № has not been deleted from table');

            data_index += 1;
        }
    });
    after(async function() {
        await browserUtils.quitDriver();
    });
});
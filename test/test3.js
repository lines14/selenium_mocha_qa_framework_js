import { assert } from 'chai';
import configManager from '../main/utils/data/config_manager.js';
import browserUtils from '../main/driver/browser_utils.js';
import mainPage from './page_objects/main_page.js';
import modelsGenerator from '../main/utils/data/models_generator_deprecated.js';
import elementsPage from './page_objects/elements_page.js';
import leftMenuForm from './page_objects/left_menu_form.js';
import webTablesPage from './page_objects/web_tables_page.js';

describe('Test scenario: #3. Tables:', function(){
    it('#3. Tables', async function() {
        await browserUtils.getUrl(configManager.getConfigData().url);
        const isMainPageDisplayed = await mainPage.pageIsDisplayed()
        assert.equal(isMainPageDisplayed, true, 'Main page is not open');

        await mainPage.clickElementsButton();
        await elementsPage.pageIsDisplayed();
        await leftMenuForm.clickWebTablesButton();
        const isWebTablesPageDisplayed = await webTablesPage.pageIsDisplayed();
        assert.equal(isWebTablesPageDisplayed, true, 'Page with Web Tables form is not open');

        await webTablesPage.clickAddButton();
        await webTablesPage.waitRegistrationFormVisible();
        const isRegistrationFormDisplayed = await webTablesPage.registrationFormIsDisplayed();
        assert.equal(isRegistrationFormDisplayed, true, 'Registration Form has not appeared on page');

        await webTablesPage.sendTestData(configManager.getTestData().User1);
        await webTablesPage.waitPageIsEnabled();
        const isWebTablesPageEnabled = await webTablesPage.pageIsEnabled();
        assert.isTrue(isWebTablesPageEnabled, 'Registration Form has not closed');
        const rowsCount1 = await webTablesPage.filledRowsCounter();
        const testModel = await modelsGenerator.modelsGenerator([configManager.getTestData().User1.split(',')], 1);
        const modelsFromTable1 = await modelsGenerator.modelsGenerator(await webTablesPage.getTableRowsText(), await webTablesPage.filledRowsCounter());
        assert.includeMembers(modelsFromTable1, testModel, 'Data of User № has not appeared in a table');
        
        await webTablesPage.clickDeletebutton(rowsCount1);
        const rowsCount2 = await webTablesPage.filledRowsCounter();
        assert.notEqual(rowsCount1, rowsCount2, 'Number of records in table has not changed');
        const modelsFromTable2 = await modelsGenerator.modelsGenerator(await webTablesPage.getTableRowsText(), await webTablesPage.filledRowsCounter());
        assert.notIncludeMembers(modelsFromTable2, testModel, 'Data of User № has not been deleted from table');
    });
});
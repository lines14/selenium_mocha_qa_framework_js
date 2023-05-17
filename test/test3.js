import { assert } from 'chai';
import configManager from '../main/utils/data/configManager.js';
import JSONUtils from '../main/utils/data/JSONUtils.js';
import browserUtils from '../main/driver/browserUtils.js';
import mainPage from './pageObjects/mainPage.js';
import elementsPage from './pageObjects/elementsPage.js';
import leftMenuForm from './pageObjects/leftMenuForm.js';
import webTablesPage from './pageObjects/webTablesPage.js';

describe('Test scenario: #3. Tables:', () => {
    it('#3. Tables', async () => {
        await browserUtils.getUrl(configManager.getConfigData().baseURL);
        assert.isTrue(await mainPage.pageIsDisplayed(), 'Main page is not open');

        await mainPage.clickElementsButton();
        await elementsPage.pageIsDisplayed();
        await leftMenuForm.clickWebTablesButton();
        assert.isTrue(await webTablesPage.pageIsDisplayed(), 'Page with Web Tables form is not open');

        await webTablesPage.clickAddButton();
        await webTablesPage.waitRegistrationFormVisible();
        assert.isTrue(await webTablesPage.registrationFormIsDisplayed(), 'Registration Form has not appeared on page');

        await webTablesPage.sendTestData(configManager.getTestData().user1);
        await webTablesPage.waitPageIsEnabled();
        assert.isTrue(await webTablesPage.pageIsEnabled(), 'Registration Form has not closed');
        const rowsCount = await webTablesPage.filledRowsCounter();
        const testModel = await JSONUtils.createJson([configManager.getTestData().user1.split(',')]);
        let modelsFromTable = await JSONUtils.createJson(await webTablesPage.getTableRowsText(), await webTablesPage.filledRowsCounter());
        assert.includeMembers(modelsFromTable, testModel, 'Data of user № has not appeared in a table');
        
        await webTablesPage.clickDeletebutton(rowsCount);
        assert.notEqual(rowsCount, await webTablesPage.filledRowsCounter(), 'Number of records in table has not changed');
        modelsFromTable = await JSONUtils.createJson(await webTablesPage.getTableRowsText(), await webTablesPage.filledRowsCounter());
        assert.notIncludeMembers(modelsFromTable, testModel, 'Data of user № has not been deleted from table');
    });
});
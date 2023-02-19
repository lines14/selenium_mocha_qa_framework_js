const Label = require('./base_element_children/label');
const Models = require ('./models');
const configManager = require('../config_manager');
const webTablesPage = require('../page_objects/web_tables_page');

class DataManager {
    constructor() {
        this.allRows = new Label('//*[@role="rowgroup"]', 'all rows in list');
    }
    async getTableRowsAll() {
        const tableRowsListAll = await this.allRows.parseChildrenTextByCounter();
        return tableRowsListAll;
    }
    async sendTestData() {
        const dataToSend = configManager.getTestData().User1.split(',');
        await webTablesPage.inputFirstName(dataToSend[0])
        await webTablesPage.inputLastName(dataToSend[1])
        await webTablesPage.inputAge(dataToSend[2])
        await webTablesPage.inputEmail(dataToSend[3])
        await webTablesPage.inputSalary(dataToSend[4])
        await webTablesPage.enterDepartment(dataToSend[5])
    }
    async filledRowsCounter() {
        const tableRowsListAll = await this.getTableRowsAll();
        const strTableRowsListAll = tableRowsListAll.map(element => element.toString());
        const stickyRows = strTableRowsListAll.map(element => element.split(',').join(''));
        const rowsCount = 10;
        let counter = 0;
        let quantity = 0;
        while (counter < rowsCount) {
            const bool = stickyRows[counter] == 0;
            if (bool === false) {
                quantity += 1;
            }
            counter += 1;
        }
        return quantity;
    }
    async modelsFromTable() {
        let counter = 0;
        const totalCount = await this.filledRowsCounter();
        const tableRowsAll = await this.getTableRowsAll();
        const modelsList = [];
        while (counter < totalCount) {
            this['model'+counter] = new Models();
            this['model'+counter].firstName = tableRowsAll[counter][0];
            this['model'+counter].lastName = tableRowsAll[counter][1];
            this['model'+counter].age = tableRowsAll[counter][2];
            this['model'+counter].email = tableRowsAll[counter][3];
            this['model'+counter].salary = tableRowsAll[counter][4];
            this['model'+counter].department = tableRowsAll[counter][5];
            modelsList.push(this['model'+counter]);
            counter += 1;
        }
        const strModelsList = modelsList.map(element => JSON.stringify(element));
        console.log('    ▶ check data in table')
        return strModelsList;
    }
    async modelFromTestData() {
        const testData = configManager.getTestData().User1.split(',');
        const testModel = new Models();
        testModel.firstName = testData[0];
        testModel.lastName = testData[1];
        testModel.age = testData[2];
        testModel.email = testData[3];
        testModel.salary = testData[4];
        testModel.department = testData[5];
        return JSON.stringify(testModel);
    }
}

module.exports = new DataManager();
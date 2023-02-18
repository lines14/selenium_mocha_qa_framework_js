const Label = require('./base_element_children/label');
const dataProvider = require('../data_provider');
const webTablesPage = require('../page_objects/web_tables_page');

class DataManager {
    constructor() {
        this.allRows = new Label('//*[@id="app"]/div/div/div[2]/div[2]/div[2]/div[3]/div[1]/div[2]/div', 'all rows in list');
    }
    async tableRowsAll() {
        return await this.allRows.parseChildrenTextByCounter();
    }
    async sendData() {
        const dataToSend = dataProvider.getTestData().User1.split(',');
        await webTablesPage.inputFirstName(dataToSend[0])
        await webTablesPage.inputLastName(dataToSend[1])
        await webTablesPage.inputAge(dataToSend[2])
        await webTablesPage.inputEmail(dataToSend[3])
        await webTablesPage.inputSalary(dataToSend[4])
        await webTablesPage.enterDepartment(dataToSend[5])
    }
}

module.exports = new DataManager();
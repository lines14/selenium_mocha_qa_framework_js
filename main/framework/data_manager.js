const Label = require('./base_element_children/label');
const configManager = require('../config_manager');
const webTablesPage = require('../page_objects/web_tables_page');

class DataManager {
    constructor() {
        this.allRows = new Label('//*[@role="rowgroup"]', 'all rows in list');
    }
    async getTableRowsAll() {
        const tableRowsListAll = await this.allRows.parseChildrenTextByCounter();
        const strTableRowsListAll = tableRowsListAll.map(element => element.toString());
        return strTableRowsListAll;
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
        const strTableRowsListAll = await this.getTableRowsAll();
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
        console.log('    ▶ check data in table')
        return quantity;
    }
}

module.exports = new DataManager();
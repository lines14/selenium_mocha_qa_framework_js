const Label = require('./base_element_children/label');
const Employee = require ('./employee');
const {By} = require('selenium-webdriver');
const {resolveNestedPromises} = require('resolve-nested-promises')
const configManager = require('../config_manager');
const webTablesPage = require('../page_objects/web_tables_page');

class DataManager {
    constructor(index) {
        this.row = new Label(By.xpath(`//*[@role="rowgroup"][${index}]//div[@role="row"]//div[@role="gridcell"]`, 'row from list'));
    }
    async getTableRowsAll() {
        const itemsCount = 10;
        let counter = 1;
        const rowsListAll = [];
        while (counter <= itemsCount){
            const instance = new DataManager(counter);
            const eachRowList = await instance.row.getElements();
            const eachRowTextList = eachRowList.map(element => element.getText());
            rowsListAll.push(eachRowTextList);
            counter += 1;   
        }
        return resolveNestedPromises(rowsListAll);
    }
    async sendTestData(data_index) {
        const dataList = configManager.getTestData();
        const dataToSend = dataList[data_index].user.split(',');
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
        console.log('    ▶ check data in table')
        let counter = 0;
        const totalCount = await this.filledRowsCounter();
        const tableRowsAll = await this.getTableRowsAll();
        const employeesList = [];
        while (counter < totalCount) {
            const employee = new Employee();
            employee.firstName = tableRowsAll[counter][0];
            employee.lastName = tableRowsAll[counter][1];
            employee.age = tableRowsAll[counter][2];
            employee.email = tableRowsAll[counter][3];
            employee.salary = tableRowsAll[counter][4];
            employee.department = tableRowsAll[counter][5];
            employeesList.push(employee);
            counter += 1;
        }
        const strEmployeesList = employeesList.map(element => JSON.stringify(element));
        return strEmployeesList;
    }
    async modelFromTestData(data_index) {
        const dataList = configManager.getTestData();
        const testData = dataList[data_index].user.split(',');
        const testModel = new Employee();
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
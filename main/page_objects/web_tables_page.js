const BaseForm = require('../framework/base_form');
const Button = require('../framework/base_element_children/button');
const Label = require('../framework/base_element_children/label');
const TextBox = require('../framework/base_element_children/text_box');
const {By} = require('selenium-webdriver');
const {resolveNestedPromises} = require('resolve-nested-promises')

class WebTablesPage extends BaseForm {
    constructor(index) {
        super(By.xpath('//div[@class="main-header" and text()="Web Tables"]'), 'page with "web tables" form');
        this.tableCell = new Label(By.xpath(`//*[@role="rowgroup"][${index}]//div[@role="row"]//div[@role="gridcell"]`, 'cell from table'));
        this.addButton = new Button(By.xpath('//*[@id="addNewRecordButton"]'), '"add" button');
        this.registrationFormHeadingText = new Label(By.xpath('//*[@id="registration-form-modal"]'), '"registration" form');
        this.firstNameBox = new TextBox(By.xpath('//*[@id="firstName"]'), 'first name');
        this.lastNameBox = new TextBox(By.xpath('//*[@id="lastName"]'), 'last name');
        this.emailBox = new TextBox(By.xpath('//*[@id="userEmail"]'), 'email');
        this.ageBox = new TextBox(By.xpath('//*[@id="age"]'), 'age');
        this.salaryBox = new TextBox(By.xpath('//*[@id="salary"]'), 'salary');
        this.departmentBox = new TextBox(By.xpath('//*[@id="department"]'), 'department');
        this.searchBox = new TextBox(By.xpath('//*[@id="searchBox"]'), 'search box');
        this.deleteButton = new Button(By.xpath(`//*[@id="delete-record-${index}"]`), '"delete" button');
    }
    async clickAddButton() {
        await this.addButton.clickButton();
    }
    async waitRegistrationFormVisible() {
        await this.registrationFormHeadingText.waitIsVisible();
    }
    async registrationFormIsDisplayed() {
        return await this.registrationFormHeadingText.elementIsDisplayed();
    }
    async clickDeletebutton(index) {
        const instance = new WebTablesPage(index);
        await instance.deleteButton.clickButton();
    }
    async sendTestData(dataSet) {
        const dataToSend = dataSet.split(',');
        await this.firstNameBox.inputText(dataToSend[0])
        await this.lastNameBox.inputText(dataToSend[1])
        await this.ageBox.inputText(dataToSend[2])
        await this.emailBox.inputText(dataToSend[3])
        await this.salaryBox.inputText(dataToSend[4])
        await this.departmentBox.enterText(dataToSend[5])
    }
    async getTableRowsText() {
        const itemsCount = 10;
        let counter = 1;
        const allRowsTextList = [];
        while (counter <= itemsCount){
            const instance = new WebTablesPage(counter);
            const eachRowCellsList = await instance.tableCell.getElements();
            const eachRowTextList = eachRowCellsList.map(element => element.getText());
            allRowsTextList.push(eachRowTextList);
            counter += 1;   
        }
        return resolveNestedPromises(allRowsTextList);
    }
    async filledRowsCounter() {
        const allRowsTextList = await this.getTableRowsText();
        const allRowsTextStr = allRowsTextList.map(element => element.toString());
        const gluedRows = allRowsTextStr.map(element => element.split(',').join(''));
        const rowsCount = 10;
        let counter = 0;
        let filledRowsQuantity = 0;
        while (counter < rowsCount) {
            const bool = gluedRows[counter] == 0;
            if (bool === false) {
                filledRowsQuantity += 1;
            }
            counter += 1;
        }
        return filledRowsQuantity;
    }
}

module.exports = new WebTablesPage();
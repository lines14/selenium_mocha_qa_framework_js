const BaseForm = require('../framework/base_form');
const Button = require('../framework/base_element_children/button');
const Label = require('../framework/base_element_children/label');
const TextBox = require('../framework/base_element_children/text_box');
const {By} = require('selenium-webdriver');

class WebTablesPage extends BaseForm {
    constructor(index) {
        super(By.xpath('//div[@class="main-header" and text()="Web Tables"]'), 'page with "web tables" form');
        this.button1 = new Button(By.xpath('//*[@id="addNewRecordButton"]'), '"add" button');
        this.registrationFormHeadingText = new Label(By.xpath('//*[@id="registration-form-modal"]'), '"registration" form');
        this.firstNameBox = new TextBox(By.xpath('//*[@id="firstName"]'), 'first name');
        this.lastNameBox = new TextBox(By.xpath('//*[@id="lastName"]'), 'last name');
        this.emailBox = new TextBox(By.xpath('//*[@id="userEmail"]'), 'email');
        this.ageBox = new TextBox(By.xpath('//*[@id="age"]'), 'age');
        this.salaryBox = new TextBox(By.xpath('//*[@id="salary"]'), 'salary');
        this.departmentBox = new TextBox(By.xpath('//*[@id="department"]'), 'department');
        this.searchBox = new TextBox(By.xpath('//*[@id="searchBox"]'), 'search box');
        this.button2 = new Button(By.xpath(`//*[@id="delete-record-${index}"]`), '"delete" button');
    }
    async webTablesPageIsDisplayed() {
        return await this.pageIsDisplayed();
    }
    async clickAddButton() {
        await this.button1.clickButton();
    }
    async waitRegistrationFormVisible() {
        await this.registrationFormHeadingText.waitIsVisible();
    }
    async registrationFormIsDisplayed() {
        return await this.registrationFormHeadingText.elementIsDisplayed();
    }
    async inputFirstName(text) {
        await this.firstNameBox.inputText(text);
    }
    async inputLastName(text) {
        await this.lastNameBox.inputText(text);
    }
    async inputEmail(text) {
        await this.emailBox.inputText(text);
    }
    async inputAge(text) {
        await this.ageBox.inputText(text);
    }
    async inputSalary(text) {
        await this.salaryBox.inputText(text);
    }
    async enterDepartment(text) {
        await this.departmentBox.enterText(text);
    }
    async waitWebTablesPageIsEnabled() {
        await this.waitPageIsEnabled();
    }
    async webTablesPageIsEnabled() {
        return await this.pageIsEnabled();
    }
    async clickDeletebutton(index) {
        const instance = new WebTablesPage(index);
        await instance.button2.clickButton();
    }
}

module.exports = new WebTablesPage();
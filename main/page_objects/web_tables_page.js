const BaseForm = require('../framework/base_form');
const Button = require('../framework/base_element_children/button');
const Label = require('../framework/base_element_children/label');
const TextBox = require('../framework/base_element_children/text_box');
const {By} = require('selenium-webdriver');

class WebTablesPage extends BaseForm {
    constructor() {
        super(By.xpath('//div[@class="main-header" and text()="Web Tables"]'), 'web tables page');
        this.button = new Button(By.xpath('//*[@id="addNewRecordButton"]'), 'add button');
        this.registrationFormHeadingText = new Label(By.xpath('//*[@id="registration-form-modal"]'), 'registration form heading');
        this.registrationBox1 = new TextBox(By.xpath('//*[@id="firstName"]'), 'first name');
        this.registrationBox2 = new TextBox(By.xpath('//*[@id="lastName"]'), 'last name');
        this.registrationBox3 = new TextBox(By.xpath('//*[@id="userEmail"]'), 'email');
        this.registrationBox4 = new TextBox(By.xpath('//*[@id="age"]'), 'age');
        this.registrationBox5 = new TextBox(By.xpath('//*[@id="salary"]'), 'salary');
        this.registrationBox6 = new TextBox(By.xpath('//*[@id="department"]'), 'department');
        this.searchBox = new TextBox(By.xpath('//*[@id="searchBox"]'), 'search box');
    }
    async webTablesPageIsDisplayed() {
        return await this.boolPageIsDisplayed();
    }
    async clickAddButton() {
        await this.button.clickButton();
    }
    async waitRegistrationFormVisible() {
        await this.registrationFormHeadingText.boolWaitIsVisible();
    }
    async registrationFormIsDisplayed() {
        return await this.registrationFormHeadingText.boolElementIsDisplayed();
    }
    async inputFirstName(text) {
        await this.registrationBox1.inputText(text);
    }
    async inputLastName(text) {
        await this.registrationBox2.inputText(text);
    }
    async inputEmail(text) {
        await this.registrationBox3.inputText(text);
    }
    async inputAge(text) {
        await this.registrationBox4.inputText(text);
    }
    async inputSalary(text) {
        await this.registrationBox5.inputText(text);
    }
    async enterDepartment(text) {
        await this.registrationBox6.enterText(text);
    }
    async waitAddButtonIsVisible() {
        await this.button.boolWaitIsVisible();
    }
    async registrationFormIsPresent() {
        return await this.registrationFormHeadingText.getElements();
    }
}

module.exports = new WebTablesPage();
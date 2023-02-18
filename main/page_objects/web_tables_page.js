const BaseForm = require('../framework/base_form');
const Button = require('../framework/base_element_children/button');
const Label = require('../framework/base_element_children/label');
const {By} = require('selenium-webdriver');

class WebTablesPage extends BaseForm {
    constructor() {
        super(By.xpath('//div[@class="main-header" and text()="Web Tables"]'), 'web tables page');
        this.button = new Button(By.xpath('//*[@id="addNewRecordButton"]'), 'add button');
        this.registrationFormHeadingText = new Label(By.xpath('//*[@id="registration-form-modal"]'), 'registration form heading');
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
}

module.exports = new WebTablesPage();
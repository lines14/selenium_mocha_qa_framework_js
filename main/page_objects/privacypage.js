const BaseForm = require('../framework/base_form');
const Element = require('../framework/base_element_children/element');
const ListOfElements = require('../framework/base_element_children/list_of_elements');
const {By} = require('selenium-webdriver');

class LoginPage extends BaseForm {
    constructor() {
        super();
        this.languagesList = new ListOfElements(By.xpath("//*[@id='languages']"), 'languages list');
        this.eachLanguage = new Element(By.xpath("//*[@id='languages']//a"), 'each language');
        this.policySignYear = new Element(By.xpath("//div[@id = 'newsColumn']//i[contains(text(), '2023')]"), 'policy sign year');
    }
    async waitForLanguagesList() {
        await this.languagesList.boolWaitIsLocated();
    }
    async verifyLanguagesListOnPrivacyPage() {
        return await this.languagesList.boolElementIsDisplayed();
    }
    async parseLanguages() {
        return await this.eachLanguage.parseChildrenForAttr('href');
    }
    async checkPolicySignYear() {
        return await this.policySignYear.getText();
    }
}

module.exports = new LoginPage();
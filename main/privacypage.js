const BaseElement = require('../main/base_element');

class LoginPage {
    constructor() {
        this.languagesList = new BaseElement("//*[@id='languages']", 'languages list');
        this.eachLanguage = new BaseElement("//*[@id='languages']//a", 'each language');
        this.policySignYear = new BaseElement("//div[@id = 'newsColumn']//i[contains(text(), '2023')]", 'policy sign year');
    }
    async waitForLanguagesList() {
        await this.languagesList.boolWaitIsLocated();
    }
    async verifyLanguagesListOnPrivacyPage() {
        return await this.languagesList.boolIsDisplayed();
    }
    async parseLanguages() {
        return await this.eachLanguage.parseChildrenForAttr('href');
    }
    async checkPolicySignYear() {
        return await this.policySignYear.getText();
    }
}

module.exports = new LoginPage();
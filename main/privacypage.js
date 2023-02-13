const BasePage = require('../main/basepage');

class LoginPage extends BasePage{

    static async waitForLanguagesList(){
        await this.waitUntilElementIsDisplayed("//*[@id='languages']")
    }
    static async verifyLanguagesListOnPrivacyPage(){
        return await this.verifyWebPageByDisplayedElement("//*[@id='languages']")
    }
    static async parseLanguages(){
        return await this.parseTheChildElementsUnlimitedForAttr("//*[@id='languages']//a", 'href');
    }
    static async checkPolicySignYear(){
        return await this.verifyWebPageByCustomText("//div[@id = 'newsColumn']//i[contains(text(), '2023')]")
    }
}

module.exports = LoginPage;
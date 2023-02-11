const BasePage = require('../main/basepage');

class LoginPage extends BasePage{

    static async verifyLanguagesListOnPrivacyPage(path){
        return await this.verifyWebPageByDisplayedElement(path)
    }
    static async parseChildElementsUnlimited(path, childPath, attr){
        return await this.parseTheChildElementsUnlimited(path, childPath, attr);
    }
    static async checkPolicySignYear(path){
        return await this.verifyWebPageByCustomText(path)
    }
    
}

module.exports = LoginPage;
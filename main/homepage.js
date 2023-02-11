const BasePage = require('../main/basepage');

class HomePage extends BasePage{

    static async inputFormAndEnter(path, text){
        await this.enterTextByXpath(path, text)
    }
    static async clickPrivacyPolicyButton(path){
        await this.clickButtonByXpath(path);
    }

}

module.exports = HomePage;
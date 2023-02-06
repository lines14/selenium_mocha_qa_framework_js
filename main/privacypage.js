var Base = require ('../main/base');

class LoginPage extends Base{

    async checkTabsCount(){
        return await this.checkTheTabsCount();
    }
    async switchDriverToAnotherTab(number){
        await this.switchDriverToTheAnotherTab(number);
    }
    async verifyLanguagesListOnPrivacyPage(path){
        return await this.verifyWebPageByDisplayedElement(path)
    }
    async parseChildElementsUnlimited(path, childPath, attr){
        return await this.parseTheChildElementsUnlimited(path, childPath, attr);
    }
    async checkPolicySignYear(path){
        return await this.verifyWebPageByCustomText(path)
    }
    async driverQuit(){
        await this.quitDriver()
    }
    
}

module.exports = new LoginPage();
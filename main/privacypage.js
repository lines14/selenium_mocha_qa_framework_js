var Base = require ('../main/base');

class LoginPage extends Base{

    async checkTabsCount(){
        return await this.checkTheTabsCount();
    }
    async verifyLanguagesListOnPrivacyPage(path){
        return await this.verifyWebPageByDisplayedElement(path)
    }
    async verifyLanguagesListIsDisplayed(path){
        await this.waitUntilElementIsDisplayed(path)
    }
    async inputForm(path, text){
        await this.enterTextByXpath(path, text)
    }
    async clickSubmitButton(path){
        await this.clickButton(path)
    }
    async verifyLoadingAnimation(path){
        return await this.checkElementIsEnabled(path)
    }
    async waitUntilErrorMessageExpects(path){
        await this.waitUntilElementIsEnabled(path)
    }
    async verifyErrorMessageShowed(path){
        await this.verifyWebPageByCustomText(path)
    }
    async switchDriverToAnotherTab(number){
        await this.switchDriverToTheAnotherTab(number);
    }
    async parseChildElements(path, childPath, attr){
        return await this.parseTheChildElements(path, childPath, attr);
    }
    async driverQuit(){
        await this.quitDriver()
    }
    
}

module.exports = new LoginPage();
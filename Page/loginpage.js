var BasePage = require ('../Page/basepage');

class LoginPage extends BasePage{

    async verifyLoginPageByDisplayedElement(path){
        return await this.verifyWebPageByDisplayedElement(path)
    }
    async verifyLoginFormIsDisplayed(path){
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
    async driverQuit(){
        await this.quitDriver()
    }
    
}

module.exports = new LoginPage();
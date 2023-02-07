var BasePage = require ('../main/basepage');

class HomePage extends BasePage{

    async driverInit(browser){
        await this.initTheDriver(browser);
    }
    async enter_url(theURL){
        await this.go_to_url(theURL);
    }
    async inputFormAndEnter(path, text){
        await this.enterTextByXpath(path, text)
    }
    async scrollToBottom(){
        await this.scrollToTheBottom();
    }
    async clickPrivacyPolicyButton(path){
        await this.clickButtonByXpath(path);
    }

}

module.exports = new HomePage();
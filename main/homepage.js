var Base = require ('../main/base');

class HomePage extends Base{

    async driverInit(browser){
        await this.initTheDriver(browser);
    }
    async enter_url(theURL){
        await this.go_to_url(theURL);
    }
    // async inputForm(path, text){
    //     await this.inputTextByXpath(path, text)
    // }
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
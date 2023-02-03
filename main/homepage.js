var Base = require ('../main/base');

class HomePage extends Base{

    async driverInit(browser){
        await this.initTheDriver(browser);
    }
    async enter_url(theURL){
        await this.go_to_url(theURL);
    }
    async scrollToBottom(){
        await this.scrollToTheBottom();
    }
    // async verifyHomePageByCustomText(path){
    //     return await this.verifyWebPageByCustomText(path)
    // }
    async clickPrivacyPolicyButton(path){
        await this.clickButtonByXpath(path);
    }

}

module.exports = new HomePage();
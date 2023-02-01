var BasePage = require ('../Page/basepage');

class HomePage extends BasePage{

    async enter_url(theURL){
        await this.go_to_url(theURL);
    }
    async verifyHomePageByCustomText(path){
        return await this.verifyWebPageByCustomText(path)
    }
    async clickLoginButton(path){
        await this.clickButton(path);
    }

}

module.exports = new HomePage();
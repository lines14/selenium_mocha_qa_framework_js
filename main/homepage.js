const BasePage = require('../main/basepage');

class HomePage extends BasePage{

    static async inputFormAndEnter(text){
        await this.enterTextByXpath("//input[@id = 'store_nav_search_term']", text)
    }
    static async clickPrivacyPolicyButton(){
        await this.clickButtonByXpath("//div[@id = 'footer_text']//following-sibling::a[1]");
    }

}

module.exports = HomePage;
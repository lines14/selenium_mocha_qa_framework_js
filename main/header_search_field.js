const BasePage = require('../main/basepage');

class HeaderSearchField extends BasePage {
    static async inputFormAndEnter(text) {
        await this.enterTextByXpath("//input[@id = 'store_nav_search_term']", text)
    }
}

module.exports = HeaderSearchField;
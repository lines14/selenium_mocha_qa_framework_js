const BaseElement = require('../main/base_element');

class HeaderSearchBar {
    constructor() {
        this.searchForm = new BaseElement("//input[@id = 'store_nav_search_term']", 'languages list');
    }
    async inputFormAndEnter(text) {
        await this.searchForm.enterText(text)
    }
}

module.exports = new HeaderSearchBar();
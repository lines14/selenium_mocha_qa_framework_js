const InputForm = require('../framework/base_element_children/input_form');
const {By} = require('selenium-webdriver');

class HeaderSearchForm {
    constructor() {
        this.searchForm = new InputForm(By.xpath("//input[@id = 'store_nav_search_term']"), 'languages list');
    }
    async inputFormAndEnter(text) {
        await this.searchForm.enterText(text)
    }
}

module.exports = new HeaderSearchForm();
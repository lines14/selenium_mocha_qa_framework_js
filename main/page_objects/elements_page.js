const BaseForm = require('../framework/base_form');
const {By} = require('selenium-webdriver');

class ElementsPage extends BaseForm {
    constructor() {
        super(By.xpath('//div[@class="main-header" and text()="Elements"]'), '"elements" page');
    }
    async elementsPageIsDisplayed() {
        return await this.pageIsDisplayed();
    }
}

module.exports = new ElementsPage();
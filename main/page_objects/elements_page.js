const BaseForm = require('../framework/base_form');
const Button = require('../framework/base_element_children/button');
const {By} = require('selenium-webdriver');

class ElementsPage extends BaseForm {
    constructor() {
        super(By.xpath('//div[@class="main-header" and text()="Elements"]'), 'elements page');
        this.button1 = new Button(By.xpath('//*[@id="item-3"]/span'), 'web tables button');
    }
    async elementsPageIsDisplayed() {
        return await this.boolPageIsDisplayed();
    }
    async clickWebTablesButton() {
        await this.button1.clickButton();
    }
}

module.exports = new ElementsPage();
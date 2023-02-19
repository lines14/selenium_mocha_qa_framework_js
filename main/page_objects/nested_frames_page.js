const BaseForm = require('../framework/base_form');
const Button = require('../framework/base_element_children/button');
const {By} = require('selenium-webdriver');

class NestedFramesPage extends BaseForm {
    constructor() {
        super(By.xpath('//div[@class="main-header" and text()="Nested Frames"]'), 'nested frames page');
        this.button = new Button(By.xpath('//span[contains(text(), "Frames")]'), 'frames button');
    }
    async nestedFramesPageIsDisplayed() {
        return await this.boolPageIsDisplayed();
    }
    async clickFramesButton() {
        await this.button.clickButton();
    }
}

module.exports = new NestedFramesPage();
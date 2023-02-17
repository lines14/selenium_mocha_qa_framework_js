const BaseForm = require('../framework/base_form');
const Button = require('../framework/base_element_children/button');
const {By} = require('selenium-webdriver');

class NestedFramesPage extends BaseForm {
    constructor() {
        super(By.xpath('//div[@class="main-header" and text()="Nested Frames"]'), 'nested frames page');
        this.button = new Button(By.xpath('/html/body/div[2]/div/div/div[2]/div[1]/div/div/div[3]/div/ul/li[3]'), 'frames button');
    }
    async nestedFramesPageIsDisplayed() {
        return await this.boolPageIsDisplayed();
    }
    async clickFramesButton() {
        await this.button.clickButton();
    }
}

module.exports = new NestedFramesPage();
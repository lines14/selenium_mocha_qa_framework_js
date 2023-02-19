const BaseForm = require('../framework/base_form');
const {By} = require('selenium-webdriver');

class NestedFramesPage extends BaseForm {
    constructor() {
        super(By.xpath('//div[@class="main-header" and text()="Nested Frames"]'), 'nested frames page');
    }
    async nestedFramesPageIsDisplayed() {
        return await this.boolPageIsDisplayed();
    }
}

module.exports = new NestedFramesPage();
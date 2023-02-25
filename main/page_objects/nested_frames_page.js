const BaseForm = require('../framework/base_form');
const {By} = require('selenium-webdriver');

class NestedFramesPage extends BaseForm {
    constructor() {
        super(By.xpath('//div[@class="main-header" and text()="Nested Frames"]'), 'page with "nested frames" form');
    }
    async nestedFramesPageIsDisplayed() {
        return await this.pageIsDisplayed();
    }
}

module.exports = new NestedFramesPage();
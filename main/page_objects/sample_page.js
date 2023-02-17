const BaseForm = require('../framework/base_form');
const {By} = require('selenium-webdriver');

class SamplePage extends BaseForm {
    constructor() {
        super(By.xpath('//*[text()="This is a sample page"]'), 'sample page');
    }
    async samplePageIsDisplayed() {
        return await this.boolPageIsDisplayed();
    }
}

module.exports = new SamplePage();
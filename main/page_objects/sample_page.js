const BaseForm = require('../framework/base_form');
const {By} = require('selenium-webdriver');

class SamplePage extends BaseForm {
    constructor() {
        super(By.xpath('//*[text()="This is a sample page"]'), 'new tab with sample page');
    }
}

module.exports = new SamplePage();
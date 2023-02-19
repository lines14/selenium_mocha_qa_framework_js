const BaseForm = require('../framework/base_form');
const Label = require('../framework/base_element_children/label');
const {By} = require('selenium-webdriver');

class Frame1 extends BaseForm {
    constructor() {
        super();
        this.frameText = new Label(By.xpath('//body[text()="Parent frame"]'), 'first frame text');
    }
    async getFrameText() {
        return await this.frameText.getText();
    }
}

module.exports = new Frame1();
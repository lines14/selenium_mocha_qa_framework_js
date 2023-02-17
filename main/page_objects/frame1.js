const BaseForm = require('../framework/base_form');
const Element = require('../framework/base_element_children/element');
const {By} = require('selenium-webdriver');

class Frame1 extends BaseForm {
    constructor() {
        super();
        this.frameText = new Element(By.xpath('//body'), 'first frame text');
    }
    async getFrameText() {
        return await this.frameText.getText();
    }
}

module.exports = new Frame1();
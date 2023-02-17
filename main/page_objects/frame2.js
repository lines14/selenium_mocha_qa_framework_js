const BaseForm = require('../framework/base_form');
const Element = require('../framework/base_element_children/element');
const {By} = require('selenium-webdriver');

class Frame2 extends BaseForm {
    constructor() {
        super();
        this.frameText = new Element(By.xpath('/html/body/p'), 'second frame text');
    }
    async getFrameText() {
        return await this.frameText.getText();
    }
}

module.exports = new Frame2();
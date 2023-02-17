const BaseForm = require('../framework/base_form');
const Element = require('../framework/base_element_children/element');
const {By} = require('selenium-webdriver');

class Frame4 extends BaseForm {
    constructor() {
        super();
        this.frameText = new Element(By.xpath('//*[@id="sampleHeading"]'), 'fourth frame text');
    }
    async getFrameText() {
        return await this.frameText.getText();
    }
}

module.exports = new Frame4();
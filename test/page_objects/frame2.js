const BaseForm = require('../framework/base_form');
const Label = require('../framework/base_element_children/label');
const {By} = require('selenium-webdriver');

class Frame2 extends BaseForm {
    constructor() {
        super();
        this.frameText = new Label(By.xpath('//p[text()="Child Iframe"]'), 'text from child iframe');
    }
    async getFrameText() {
        return await this.frameText.getText();
    }
}

module.exports = new Frame2();
const BaseForm = require('../framework/base_form');
const Label = require('../framework/base_element_children/label');
const {By} = require('selenium-webdriver');

class Frame3 extends BaseForm {
    constructor() {
        super();
        this.frameText = new Label(By.xpath('//*[@id="sampleHeading"]'), 'text from upper frame');
    }
    async getFrameText() {
        return await this.frameText.getText();
    }
}

module.exports = new Frame3();
const BaseForm = require('../../main/base_form');
const Label = require('../../main/elements/base_element_children/label');
const {By} = require('selenium-webdriver');

class Frame1 extends BaseForm {
    constructor() {
        super();
        this.frameText = new Label(By.xpath('//body[text()="Parent frame"]'), 'text from parent frame');
    }
    async getFrameText() {
        return await this.frameText.getText();
    }
}

module.exports = new Frame1();
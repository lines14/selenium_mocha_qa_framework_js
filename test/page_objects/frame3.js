import BaseForm from '../../main/base_form.js';
import Label from '../../main/elements/base_element_children/label.js';
import { By } from 'selenium-webdriver';

class Frame3 extends BaseForm {
    constructor() {
        super();
        this.frameText = new Label(By.xpath('//*[@id="sampleHeading"]'), 'text from upper frame');
    }
    
    async getFrameText() {
        return await this.frameText.getText();
    }
}

export default new Frame3();
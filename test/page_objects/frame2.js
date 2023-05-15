import BaseForm from '../../main/base_form.js';
import Label from '../../main/elements/base_element_children/label.js';
import { By } from 'selenium-webdriver';

class Frame2 extends BaseForm {
    constructor() {
        super();
        this.frameText = new Label(By.xpath('//p[text()="Child Iframe"]'), 'text from child iframe');
    }
    
    async getFrameText() {
        return await this.frameText.getText();
    }
}

export default new Frame2();
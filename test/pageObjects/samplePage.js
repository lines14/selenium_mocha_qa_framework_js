import BaseForm from '../../main/baseForm.js';
import { By } from 'selenium-webdriver';

class SamplePage extends BaseForm {
    constructor() {
        super(By.xpath('//*[text()="This is a sample page"]'), 'new tab with sample page');
    }
}

export default new SamplePage();
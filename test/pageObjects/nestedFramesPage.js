import BaseForm from '../../main/baseForm.js';
import { By } from 'selenium-webdriver';

class NestedFramesPage extends BaseForm {
    constructor() {
        super(By.xpath('//div[@class="main-header" and text()="Nested Frames"]'), 'page with "nested frames" form');
    }
}

export default new NestedFramesPage();
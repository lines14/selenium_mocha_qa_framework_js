import BaseForm from '../../main/base_form.js';
import { By } from 'selenium-webdriver';

class FramesPage extends BaseForm {
    constructor() {
        super(By.xpath('//div[@class="main-header" and text()="Frames"]'), 'page with "frames" form');
    }
}

export default new FramesPage();
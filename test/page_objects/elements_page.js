import BaseForm from '../../main/base_form.js';
import { By } from 'selenium-webdriver';

class ElementsPage extends BaseForm {
    constructor() {
        super(By.xpath('//div[@class="main-header" and text()="Elements"]'), '"elements" page');
    }
}

export default new ElementsPage();
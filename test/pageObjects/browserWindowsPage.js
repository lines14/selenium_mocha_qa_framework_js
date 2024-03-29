import BaseForm from '../../main/baseForm.js';
import Button from '../../main/elements/baseElementChildren/button.js';
import { By } from 'selenium-webdriver';

class BrowserWindowsPage extends BaseForm {
    constructor() {
        super(By.xpath('//div[@class="main-header" and text()="Browser Windows"]'), 'page with "browser windows" form');
        this.newTabButton = new Button(By.xpath('//*[@id="tabButton"]'), '"new tab" button');
    }
    
    async clickNewTabButton() {
        await this.newTabButton.clickButton();
    }
}

export default new BrowserWindowsPage();
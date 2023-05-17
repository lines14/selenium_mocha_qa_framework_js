import BaseForm from '../../main/baseForm.js';
import Label from '../../main/elements/baseElementChildren/label.js';
import { By } from 'selenium-webdriver';

class LinksPage extends BaseForm {
    constructor() {
        super(By.xpath('//div[@class="main-header" and text()="Links"]'), 'page with "links" form');
        this.homeLink = new Label(By.xpath('//*[@id="simpleLink"]'), '"home" link');
    }
    
    async clickHomeLink() {
        await this.homeLink.clickButton();
    }
}

export default new LinksPage();
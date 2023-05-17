import BaseForm from '../../main/baseForm.js';
import Button from '../../main/elements/baseElementChildren/button.js';
import { By } from 'selenium-webdriver';

class MainPage extends BaseForm {
    constructor() {
        super(By.xpath('//*[@id="app"]//following-sibling::img[@class="banner-image"]'), 'main page');
        this.alertsFrameWindowsButton = new Button(By.xpath('//h5[contains(text(), "Alerts, Frame & Windows")]'), '"alerts, frame & windows" button');
        this.elementsButton = new Button(By.xpath('//h5[contains(text(), "Elements")]'), '"elements" button');
    }

    async clickAlertsFrameWindowsButton() {
        await this.alertsFrameWindowsButton.clickButton();
    }
    
    async clickElementsButton() {
        await this.elementsButton.clickButton();
    }
}

export default new MainPage();
import BaseForm from '../../main/baseForm.js';
import { By } from 'selenium-webdriver';

class AlertsFrameWindowsPage extends BaseForm {
    constructor() {
        super(By.xpath('//div[@class="main-header" and text()="Alerts, Frame & Windows"]'), '"alerts, frame & windows" page');
    }
}

export default new AlertsFrameWindowsPage();
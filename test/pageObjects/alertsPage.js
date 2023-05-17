import BaseForm from '../../main/baseForm.js';
import Label from '../../main/elements/baseElementChildren/label.js';
import Button from '../../main/elements/baseElementChildren/button.js';
import { By } from 'selenium-webdriver';

class AlertsPage extends BaseForm {
    constructor() {
        super(By.xpath('//div[@class="main-header" and text()="Alerts"]'), '"alerts" form');
        this.alertButton = new Button(By.xpath('//*[@id="alertButton"]'), '"click button to see alert" button');
        this.confirmButton = new Button(By.xpath('//*[@id="confirmButton"]'), '"on button click, confirm box will appear" button');
        this.confirmText = new Label(By.xpath('//*[@id="confirmResult"]'), 'text "You selected Ok"');
        this.promptButton = new Button(By.xpath('//*[@id="promtButton"]'), '"on button click, prompt box will appear" button');
        this.promptText = new Label(By.xpath('//*[@id="promptResult"]'), 'text');
    }

    async clickAlertButton() {
        await this.alertButton.clickButton();
    }

    async clickConfirmButton() {
        await this.confirmButton.clickButton();
    }

    async confirmTextIsDisplayed() {
        return await this.confirmText.elementIsDisplayed();
    }

    async clickPromptButton() {
        await this.promptButton.clickButton();
    }
    
    async getEnteredText() {
        return await this.promptText.getText();
    }
}

export default new AlertsPage();
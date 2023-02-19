const BaseForm = require('../framework/base_form');
const Label = require('../framework/base_element_children/label');
const Button = require('../framework/base_element_children/button');
const {By} = require('selenium-webdriver');

class AlertsPage extends BaseForm {
    constructor() {
        super(By.xpath('//div[@class="main-header" and text()="Alerts"]'), 'alerts page');
        this.button1 = new Button(By.xpath('//*[@id="alertButton"]'), 'click button to see alert button');
        this.button2 = new Button(By.xpath('//*[@id="confirmButton"]'), 'on button click, confirm box will appear button');
        this.confirmText = new Label(By.xpath('//*[@id="confirmResult"]'), 'You selected Ok text');
        this.button3 = new Button(By.xpath('//*[@id="promtButton"]'), 'on button click, prompt box will appear button');
        this.promptText = new Label(By.xpath('//*[@id="promptResult"]'), 'entered text');
    }
    async alertsPageIsDisplayed() {
        return await this.boolPageIsDisplayed();
    }
    async clickButtonToSeeAlertButton() {
        await this.button1.clickButton();
    }
    async onButtonClickConfirmBoxWillAppearButton() {
        await this.button2.clickButton();
    }
    async confirmTextIsDisplayed() {
        return await this.confirmText.boolElementIsDisplayed();
    }
    async onButtonClickPromptBoxWillAppearButton() {
        await this.button3.clickButton();
    }
    async getEnteredText() {
        return await this.promptText.getText();
    }
}

module.exports = new AlertsPage();
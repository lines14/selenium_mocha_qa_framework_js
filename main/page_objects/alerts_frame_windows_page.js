const BaseForm = require('../framework/base_form');
const Button = require('../framework/base_element_children/button');
const {By} = require('selenium-webdriver');

class alertsFrameWindowsPage extends BaseForm {
    constructor() {
        super(By.xpath('//div[@class="main-header" and text()="Alerts, Frame & Windows"]'), 'alerts, frame & windows page');
        this.button = new Button(By.xpath('//html/body/div[2]/div/div/div[2]/div[1]/div/div/div[3]/div/ul/li[2]/span'), 'alerts button');
    }
    async alertsFrameWindowsPageIsDisplayed() {
        return await this.boolPageIsDisplayed();
    }
    async clickAlertsButton() {
        await this.button.clickButton();
    }
}

module.exports = new alertsFrameWindowsPage();
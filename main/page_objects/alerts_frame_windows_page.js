const BaseForm = require('../framework/base_form');
const Button = require('../framework/base_element_children/button');
const {By} = require('selenium-webdriver');

class AlertsFrameWindowsPage extends BaseForm {
    constructor() {
        super(By.xpath('//div[@class="main-header" and text()="Alerts, Frame & Windows"]'), 'alerts, frame & windows page');
        this.button1 = new Button(By.xpath('//html/body/div[2]/div/div/div[2]/div[1]/div/div/div[3]/div/ul/li[2]/span'), 'alerts button');
        this.button2 = new Button(By.xpath('//html/body/div[2]/div/div/div[2]/div[1]/div/div/div[3]/div/ul/li[4]/span'), 'nested frames button');
        this.button3 = new Button(By.xpath('//html/body/div[2]/div/div/div[2]/div[1]/div/div/div[3]/div/ul/li[1]/span'), 'browser windows button');
    }
    async alertsFrameWindowsPageIsDisplayed() {
        return await this.boolPageIsDisplayed();
    }
    async clickAlertsButton() {
        await this.button1.clickButton();
    }
    async clickNestedFramesButton() {
        await this.button2.clickButton();
    }
    async clickBrowserWindowsButton() {
        await this.button3.clickButton();
    }
}

module.exports = new AlertsFrameWindowsPage();
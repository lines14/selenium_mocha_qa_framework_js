const BaseForm = require('../framework/base_form');
const Button = require('../framework/base_element_children/button');
const {By} = require('selenium-webdriver');

class MainPage extends BaseForm {
    constructor() {
        super(By.xpath('//*[@id="app"]//following-sibling::img[@class="banner-image"]'), 'main page');
        this.button = new Button(By.xpath('//h5[contains(text(), "Alerts, Frame & Windows")]'), 'alerts, frame & windows button');
    }
    async mainPageIsDisplayed() {
        return await this.boolPageIsDisplayed();
    }
    async clickAlertsFrameWindowsButton() {
        await this.button.clickButton();
    }
}

module.exports = new MainPage();
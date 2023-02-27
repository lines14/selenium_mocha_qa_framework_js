const BaseForm = require('../framework/base_form');
const Button = require('../framework/base_element_children/button');
const {By} = require('selenium-webdriver');

class MainPage extends BaseForm {
    constructor() {
        super(By.xpath('//*[@id="app"]//following-sibling::img[@class="banner-image"]'), 'main page');
        this.alertsFrameWindowsButton = new Button(By.xpath('//h5[contains(text(), "Alerts, Frame & Windows")]'), '"alerts, frame & windows" button');
        this.elementsButton = new Button(By.xpath('//h5[contains(text(), "Elements")]'), '"elements" button');
    }
    async mainPageIsDisplayed() {
        return await this.pageIsDisplayed();
    }
    async clickAlertsFrameWindowsButton() {
        await this.alertsFrameWindowsButton.clickButton();
    }
    async clickElementsButton() {
        await this.elementsButton.clickButton();
    }
}

module.exports = new MainPage();
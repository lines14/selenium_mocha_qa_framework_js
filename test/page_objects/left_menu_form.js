const BaseForm = require('../framework/base_form');
const Button = require('../framework/base_element_children/button');
const {By} = require('selenium-webdriver');

class LeftMenuForm extends BaseForm {
    constructor() {
        super();
        this.alertsButton = new Button(By.xpath('//span[contains(text(), "Alerts")]'), '"alerts" button');
        this.nestedFramesButton = new Button(By.xpath('//span[contains(text(), "Nested Frames")]'), '"nested frames" button');
        this.browserWindowsButton = new Button(By.xpath('//span[contains(text(), "Browser Windows")]'), '"browser windows" button');
        this.framesButton = new Button(By.xpath('//span[contains(text(), "Frames")]'), '"frames" button');
        this.webTablesButton = new Button(By.xpath('//*[@id="item-3"]/span'), '"web tables" button');
        this.elementsButton = new Button(By.xpath('//div[@class="header-text" and text()="Elements"]'), '"elements" button');
        this.linksButton = new Button(By.xpath('//*[@id="item-5"]'), '"links" button');
    }
    async clickAlertsButton() {
        await this.alertsButton.clickButton();
    }
    async clickNestedFramesButton() {
        await this.nestedFramesButton.clickButton();
    }
    async clickBrowserWindowsButton() {
        await this.browserWindowsButton.clickButton();
    }
    async clickFramesButton() {
        await this.framesButton.clickButton();
    }
    async clickWebTablesButton() {
        await this.webTablesButton.clickButton();
    }
    async clickElementsButton() {
        await this.elementsButton.clickButton();
    }
    async waitLinksButtonVisible() {
        await this.linksButton.waitIsVisible();
    }
    async clickLinksButton() {
        await this.linksButton.clickButton();
    }
}

module.exports = new LeftMenuForm();
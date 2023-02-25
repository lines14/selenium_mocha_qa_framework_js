const BaseForm = require('../framework/base_form');
const Button = require('../framework/base_element_children/button');
const {By} = require('selenium-webdriver');

class LeftMenuForm extends BaseForm {
    constructor() {
        super();
        this.button1 = new Button(By.xpath('//span[contains(text(), "Alerts")]'), '"alerts" button');
        this.button2 = new Button(By.xpath('//span[contains(text(), "Nested Frames")]'), '"nested frames" button');
        this.button3 = new Button(By.xpath('//span[contains(text(), "Browser Windows")]'), '"browser windows" button');
        this.button4 = new Button(By.xpath('//span[contains(text(), "Frames")]'), '"frames" button');
        this.button5 = new Button(By.xpath('//*[@id="item-3"]/span'), '"web tables" button');
        this.button6 = new Button(By.xpath('//div[@class="header-text" and text()="Elements"]'), '"elements" button');
        this.button7 = new Button(By.xpath('//*[@id="item-5"]'), '"links" button');
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
    async clickFramesButton() {
        await this.button4.clickButton();
    }
    async clickWebTablesButton() {
        await this.button5.clickButton();
    }
    async clickElementsButton() {
        await this.button6.clickButton();
    }
    async waitLinksButtonVisible() {
        await this.button7.waitIsVisible();
    }
    async clickLinksButton() {
        await this.button7.clickButton();
    }
}

module.exports = new LeftMenuForm();
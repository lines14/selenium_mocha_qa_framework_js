const BaseForm = require('../framework/base_form');
const Button = require('../framework/base_element_children/button');
const {By} = require('selenium-webdriver');

class BrowserWindowsPage extends BaseForm {
    constructor() {
        super(By.xpath('//div[@class="main-header" and text()="Browser Windows"]'), 'browser windows page');
        this.button1 = new Button(By.xpath('//*[@id="tabButton"]'), 'new tab button');
        this.button2 = new Button(By.xpath('//*[@id="app"]/div/div/div[2]/div[1]/div/div/div[1]/span/div/div[1]'), 'elements button');
        this.button3 = new Button(By.xpath('/html/body/div[2]/div/div/div[2]/div[1]/div/div/div[1]/div/ul/li[6]'), 'links button');
    }
    async browserWindowsPageIsDisplayed() {
        return await this.boolPageIsDisplayed();
    }
    async clickNewTabButton() {
        await this.button1.clickButton();
    }
    async clickElementsButton() {
        await this.button2.clickButton();
    }
    async waitLinksButtonVisible() {
        await this.button3.boolWaitIsVisible();
    }
    async clickLinksButton() {
        await this.button3.clickButton();
    }
}

module.exports = new BrowserWindowsPage();
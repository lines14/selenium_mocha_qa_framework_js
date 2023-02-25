const BaseForm = require('../framework/base_form');
const Button = require('../framework/base_element_children/button');
const {By} = require('selenium-webdriver');

class BrowserWindowsPage extends BaseForm {
    constructor() {
        super(By.xpath('//div[@class="main-header" and text()="Browser Windows"]'), 'page with "browser windows" form');
        this.button1 = new Button(By.xpath('//*[@id="tabButton"]'), '"new tab" button');
    }
    async browserWindowsPageIsDisplayed() {
        return await this.pageIsDisplayed();
    }
    async clickNewTabButton() {
        await this.button1.clickButton();
    }
}

module.exports = new BrowserWindowsPage();
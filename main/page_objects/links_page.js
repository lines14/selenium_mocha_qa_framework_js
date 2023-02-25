const BaseForm = require('../framework/base_form');
const Label = require('../framework/base_element_children/label');
const {By} = require('selenium-webdriver');

class LinksPage extends BaseForm {
    constructor() {
        super(By.xpath('//div[@class="main-header" and text()="Links"]'), 'page with "links" form');
        this.link = new Label(By.xpath('//*[@id="simpleLink"]'), '"home" link');
    }
    async linksPageIsDisplayed() {
        return await this.pageIsDisplayed();
    }
    async clickHomeLink() {
        await this.link.clickButton();
    }
}

module.exports = new LinksPage();
const BaseForm = require('../framework/base_form');
const {By} = require('selenium-webdriver');

class FramesPage extends BaseForm {
    constructor() {
        super(By.xpath('//div[@class="main-header" and text()="Frames"]'), 'page with "frames" form');
    }
    async framesPageIsDisplayed() {
        return await this.boolPageIsDisplayed();
    }
}

module.exports = new FramesPage();
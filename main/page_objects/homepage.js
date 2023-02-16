const Button = require('../framework/base_element_children/button');
const {By} = require('selenium-webdriver');

class HomePage {
    constructor() {
        this.button = new Button(By.xpath("//div[@id = 'footer_text']//following-sibling::a"), 'privacy policy button');
    }
    async clickPrivacyPolicyButton() {
        await this.button.clickButton();
    }
}

module.exports = new HomePage();
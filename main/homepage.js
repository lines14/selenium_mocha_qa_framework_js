const BaseElement = require('../main/base_element');

class HomePage {
    constructor() {
        this.button = new BaseElement("//div[@id = 'footer_text']//following-sibling::a", 'privacy policy button');
    }
    async clickPrivacyPolicyButton() {
        await this.button.clickButton();
    }
}

module.exports = new HomePage();
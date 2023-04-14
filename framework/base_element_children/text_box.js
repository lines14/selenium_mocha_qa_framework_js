const BaseElement = require('../base_element');

class TextBox extends BaseElement {
    constructor(locator, name) {
        super(locator, name);
    }
}

module.exports = TextBox;
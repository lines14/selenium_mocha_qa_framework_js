const BaseElement = require('../base_element');

class Button extends BaseElement {
    constructor(locator, name) {
        super(locator, name);
    }
}

module.exports = Button;
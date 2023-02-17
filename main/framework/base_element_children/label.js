const BaseElement = require('../base_element');

class Label extends BaseElement {
    constructor(locator, name) {
        super(locator, name);
    }
}

module.exports = Label;
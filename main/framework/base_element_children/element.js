const BaseElement = require('../base_element');

class Element extends BaseElement {
    constructor(locator, name) {
        super(locator, name);
    }
}

module.exports = Element;
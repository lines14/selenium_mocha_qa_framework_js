const BaseElement = require('../base_element');

class ListOfElements extends BaseElement {
    constructor(locator, name) {
        super(locator, name);
    }
}

module.exports = ListOfElements;
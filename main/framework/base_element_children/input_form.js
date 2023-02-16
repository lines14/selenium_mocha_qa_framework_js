const BaseElement = require('../base_element');

class InputForm extends BaseElement {
    constructor(locator, name) {
        super(locator, name);
    }
}

module.exports = InputForm;
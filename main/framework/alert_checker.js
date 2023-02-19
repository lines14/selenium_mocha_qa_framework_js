const browserUtils = require('./browser_utils');

class AlertChecker {
    async boolAlertIsDisplayed() {
        try {
            await browserUtils.getAlert();
            return true;
        } catch(err) {
            return false;
        }
    }
}

module.exports = new AlertChecker();
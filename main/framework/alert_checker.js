const browser = require('./browser');

class AlertChecker {
    async boolAlertIsDisplayed() {
        try {
            await browser.getAlert();
            return true;
        } catch(err) {
            return false;
        }
    }
}

module.exports = new AlertChecker();
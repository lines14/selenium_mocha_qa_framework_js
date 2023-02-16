const DriverInit = require('./driver_init');
const dataProvider = require('../data_provider');

class BaseForm {
    constructor(pageLocator, pageName) {
        this.pageLocator = pageLocator;
        this.pageName = pageName;
        this.driver = DriverInit.getInstance(dataProvider.getConfigData().chrome);
    }
    async getUniqueElement() {
        return await this.driver.findElement(this.pageLocator);
    }
    async boolPageIsDisplayed() {
        const uniqueElement = await this.getUniqueElement();
        return await uniqueElement.isDisplayed();
    }
}

module.exports = BaseForm;
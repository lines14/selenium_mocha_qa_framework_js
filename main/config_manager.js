const configureData = require('../main/config_data.json');
const testData = require('../test/test_data.json');

class ConfigManager {
    getConfigData() {
        const path = JSON.parse(JSON.stringify(configureData));
        return path;
    }
    getTestData() {
        const dataList = JSON.parse(JSON.stringify(testData));
        return dataList;
    }
}

module.exports = new ConfigManager();
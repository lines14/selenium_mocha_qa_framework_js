const configureData = require('../main/config_data.json');
const testData = require('../test/test_data.json');

class ConfigManager {
    getConfigData() {
        const path = JSON.parse(JSON.stringify(configureData));
        return path;
    }
    getTestData() {
        const data = JSON.parse(JSON.stringify(testData));
        return data;
    }
}

module.exports = new ConfigManager();
var configureData = require('../main/config_data.json');
var testData = require('../test/test_data.json');

class DataProvider{

    constructor(){
        global.configureData = configureData;
        global.testData = testData;
    }
    getConfigData(){
        let path = JSON.parse(JSON.stringify(configureData));
        return path;
    }
    getTestData(){
        let data = JSON.parse(JSON.stringify(testData));
        return data;
    }

}

module.exports = new DataProvider();
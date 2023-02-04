var configureData = require('../main/config_data.json');
// var saveddata = require('../main/saved_data.json');
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
    // getSavedData(fileNumber){
    //     if (fileNumber === 1){
    //         let dat = JSON.parse(JSON.stringify(saveddata1));
    //         return dat;
    //     } else if (fileNumber === 2){
    //         let dat = JSON.parse(JSON.stringify(saveddata2));
    //         return dat;
    //     }
    // }
}

module.exports = new DataProvider();
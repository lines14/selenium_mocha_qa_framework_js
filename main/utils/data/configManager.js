import configData from '../../../resources/configData.json' assert { type: "json" };
import testData from '../../../resources/testData.json' assert { type: "json" };
import APICodes from '../API/APICodes.json' assert { type: "json" };
import APIEndpoints from '../../../resources/APIEndpoints.json' assert { type: "json" };
import APIConfigData from '../../../resources/APIConfigData.json' assert { type: "json" };
import DBConfigData from '../../../resources/DBConfigData.json' assert { type: "json" };
import path from "path";

class ConfigManager {
    static getConfigData() {
        return JSON.parse(JSON.stringify(configData));
    }

    static getTestData() {
        return JSON.parse(JSON.stringify(testData));
    }

    static getTestFile() {
        return path.join(path.resolve(), "test", "template.jpg");
    }

    static getStatusCode() {
        return JSON.parse(JSON.stringify(APICodes));
    }

    static getAPIEndpoint() {
        return JSON.parse(JSON.stringify(APIEndpoints));
    }

    static getAPIConfigData() {
        return JSON.parse(JSON.stringify(APIConfigData));
    }

    static getDBConfigData() {
        return JSON.parse(JSON.stringify(DBConfigData));
    }
}

export default ConfigManager;
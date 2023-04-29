const browserUtils = require('../main/driver/browser_utils');
const configManager = require('../main/utils/data/config_manager');

exports.mochaHooks = {
    async beforeAll() {
        await browserUtils.initTheDriver(configManager.getConfigData().browser);
    },
    async afterAll() {
        await browserUtils.quitDriver();
    }
}
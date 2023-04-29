const browserUtils = require('../main/driver/browser_utils');
const logger = require('../main/utils/log/logger');

exports.mochaHooks = {
    beforeAll() {
        browserUtils.initTheDriver();
    },
    async afterAll() {
        browserUtils.quitDriver();
        await logger.logToFile();
    }
}
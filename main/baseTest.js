import browserUtils from '../main/driver/browserUtils.js';
import logger from '../main/utils/log/logger.js';

export const mochaHooks = {
    beforeAll() {
        browserUtils.initTheDriver();
    },
    async afterAll() {
        browserUtils.quitDriver();
        await logger.logToFile();
    },
}
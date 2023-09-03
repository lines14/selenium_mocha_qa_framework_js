import BrowserUtils from '../main/driver/browserUtils.js';
import Logger from '../main/utils/log/logger.js';

export const mochaHooks = {
    beforeAll() {
        BrowserUtils.initTheDriver();
    },
    async afterAll() {
        BrowserUtils.quitDriver();
        await Logger.logToFile();
    },
}
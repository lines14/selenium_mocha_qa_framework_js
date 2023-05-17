import logger from '../log/logger.js';

class JSONValidator {
    async isJson(response) {
        logger.log(`[info] ▶ check response is json`);
        return typeof response === "object";
    }
}

export default new JSONValidator();
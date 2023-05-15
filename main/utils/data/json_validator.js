import logger from '../log/logger.js';

class JsonValidator {
    async isJson(response) {
        try {
            logger.log(`[info] ▶ check response is json`);
            return typeof response === "object";
        }
        catch (error) {
            return false;
        }
    }
}

export default new JsonValidator();
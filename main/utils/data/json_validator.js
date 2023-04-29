const logger = require('../log/logger');

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

module.exports = new JsonValidator();
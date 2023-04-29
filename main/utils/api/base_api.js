const axios = require('axios');
const logger = require('../log/logger');

class BaseApi {
    constructor(baseURL, log, timeout, headers) {
        this.axios = axios;
        log ? logger.log(`${log} ${baseURL}`) : log;
        this.axios.defaults.baseURL = baseURL;
        this.axios.defaults.timeout = timeout;
        this.axios.defaults.headers = headers;
    }

    async get(endpoint) {
        try {
            logger.log(`[info] ▶ get ${endpoint}:`);
            const response = await axios.get(endpoint);
            logger.log(`[info]   status code: ${response.status}`);
            return response;
        } catch (error) {
            logger.log(`[info]   status code: ${error.response.status}`);
            return error.response;
        }
    }

    async post(endpoint, params) {
        try {
            logger.log(`[info] ▶ post ${JSON.stringify(params)} to ${endpoint}:`);
            const response = await axios.post(`/${endpoint}`, params);
            logger.log(`[info]   status code: ${response.status}`);
            return response;
        } catch (error) {
            logger.log(`[info]   status code: ${error.response.status}`);
            return error.response;
        }
    }

    async put(endpoint, params) {
        try {
            logger.log(`[info] ▶ put ${JSON.stringify(params)} to ${endpoint}`);
            const response = await axios.put(`/${endpoint}`, params);
            logger.log(`[info]   status code: ${response.status}`);
            return response;
        } catch (error) {
            logger.log(`[info]   status code: ${error.response.status}`);
            return error.response;
        }
    }

    async patch(endpoint, params) {
        try {
            logger.log(`[info] ▶ patch ${JSON.stringify(params)} in ${endpoint}`);
            const response = await axios.patch(`/${endpoint}`, params);
            logger.log(`[info]   status code: ${response.status}`);
            return response;
        } catch (error) {
            logger.log(`[info]   status code: ${error.response.status}`);
            return error.response;
        }
    }

    async delete(endpoint) {
        try {
            logger.log(`[info] ▶ delete ${endpoint}`);
            const response = await axios.delete(endpoint);
            logger.log(`[info]   status code: ${response.status}`);
            return response;
        } catch (error) {
            logger.log(`[info]   status code: ${error.response.status}`);
            return error.response;
        }
    }
}

module.exports = BaseApi;
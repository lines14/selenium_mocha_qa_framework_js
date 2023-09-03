import axios from 'axios';
import Logger from '../log/logger.js';
import qs from 'qs';

class BaseAPI {
    constructor(baseURL, logString, timeout, headers) {
        if (logString) Logger.log(`${logString} ${baseURL}`);
        axios.defaults.baseURL = baseURL;
        axios.defaults.timeout = timeout;
        axios.defaults.headers = headers;
    }

    async get(endpoint) {
        try {
            Logger.log(`[info] ▶ get ${endpoint}:`);
            const response = await axios.get(endpoint);
            Logger.log(`[info]   status code: ${response.status}`);
            return response;
        } catch (error) {
            Logger.log(`[info]   status code: ${error.response.status}`);
            return error.response;
        }
    }

    async post(endpoint, params) {
        try {
            Logger.log(`[info] ▶ post ${JSON.stringify(params)} to ${endpoint}:`);
            const response = await axios.post(`/${endpoint}`, qs.stringify(params));
            Logger.log(`[info]   status code: ${response.status}`);
            return response;
        } catch (error) {
            Logger.log(`[info]   status code: ${error.response.status}`);
            return error.response;
        }
    }

    async put(endpoint, params) {
        try {
            Logger.log(`[info] ▶ put ${JSON.stringify(params)} to ${endpoint}`);
            const response = await axios.put(`/${endpoint}`, params);
            Logger.log(`[info]   status code: ${response.status}`);
            return response;
        } catch (error) {
            Logger.log(`[info]   status code: ${error.response.status}`);
            return error.response;
        }
    }

    async patch(endpoint, params) {
        try {
            Logger.log(`[info] ▶ patch ${JSON.stringify(params)} in ${endpoint}`);
            const response = await axios.patch(`/${endpoint}`, params);
            Logger.log(`[info]   status code: ${response.status}`);
            return response;
        } catch (error) {
            Logger.log(`[info]   status code: ${error.response.status}`);
            return error.response;
        }
    }

    async delete(endpoint) {
        try {
            Logger.log(`[info] ▶ delete ${endpoint}`);
            const response = await axios.delete(endpoint);
            Logger.log(`[info]   status code: ${response.status}`);
            return response;
        } catch (error) {
            Logger.log(`[info]   status code: ${error.response.status}`);
            return error.response;
        }
    }
}

export default BaseAPI;
import Logger from '../log/logger.js';

class JSONUtils {
    static async isJson(response) {
        typeof response !== "object" 
        ? Logger.log(`[error]▶ api response is ${typeof response} instead of json object!`) 
        : Logger.log('[info] ▶ api response is json object');

        return typeof response === "object" ? true : false;
    }

    static async createJson(dataSet, totalCount=1) {
        if (totalCount !== 1) Logger.log('    ▶ get json from table');
        const employeesList = [];
        for (let i = 0; i < totalCount; i++) {
            const employee = {};
            employee.firstName = dataSet[i][0];
            employee.lastName = dataSet[i][1];
            employee.age = dataSet[i][2];
            employee.email = dataSet[i][3];
            employee.salary = dataSet[i][4];
            employee.department = dataSet[i][5];
            employeesList.push(employee);
        }

        return employeesList.map((element) => JSON.stringify(element));
    }
}

export default JSONUtils;
const mysql = require('mysql2/promise');
const logger = require('../log/logger');

class DatabaseUtils {
    constructor(host, user, password, database) {
        logger.log(`[info] ▶ connect to ${database} database`);
        mysql.createConnection({
            host: host,
            user: user,
            password: password,
            database: database
        }).then(conn => this.connection = conn);
    }

    async closeConnection() {
        logger.log(`[info] ▶ close connection to database`);
        await this.connection.end();
    }

    async sqlQuery(query, values, log) {
        logger.log(log);
        const [rows] = await this.connection.query(query, [values]);
        return rows;
    }

    async sqlGet(tableName, target='*', conditions='', values=[]) {
        const valuesArray = values;
        const log = `[info] ▶ select data from ${tableName} table`;
        const query =`SELECT ${target} FROM ${tableName} ${conditions};`;

        return await this.sqlQuery(query, valuesArray, log);
    }

    async sqlAdd(tableName, dataObject) {
        const log = `[info] ▶ insert data to ${tableName} table`;
        const columnNames = Object.keys(dataObject);
        const values = Object.values(dataObject);
        const query = `INSERT INTO ${tableName} (${columnNames}) VALUES (?)`;
        
        return await this.sqlQuery(query, values, log);
    }

    async sqlRefresh(tableName, dataObject) {
        const log = `[info] ▶ replace data in ${tableName} table`;
        const columnNames = Object.keys(dataObject);
        const values = Object.values(dataObject);
        const query = `REPLACE INTO ${tableName} (${columnNames}) VALUES (?)`;
        
        await this.sqlQuery(query, values, log);
    }

    async sqlDelete(tableName, conditions='', values=[]) {
        const valuesArray = values;
        const log = `[info] ▶ delete data from ${tableName} table`;
        const query =`DELETE FROM ${tableName} ${conditions};`;

        await this.sqlQuery(query, valuesArray, log);
    }

    async sqlEdit(tableName, target='*', conditions='', values=[]) {
        const valuesArray = values;
        const log = `[info] ▶ update data in ${tableName} table`;
        const query =`UPDATE ${tableName} SET ${target} ${conditions};`;

        await this.sqlQuery(query, valuesArray, log);
    }
}

module.exports = DatabaseUtils;
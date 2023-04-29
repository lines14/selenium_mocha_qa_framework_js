const path = require("path");
const timeList = new Array();
const logList = new Array();
const fs = require('fs');
const moment = require('moment');

class Logger {
    log(step) {
        console.log(step);
        logList.push(` ${step}\n`);
        timeList.push(`${moment().format().slice(0, 19).replace('T', ' ')}`);
    }

    async logToFile() {
        const zip = (a, b) => a.map((k, i) => [k, b[i]]);
        const summaryList = zip(timeList, logList);
        const stream = fs.createWriteStream(path.join(__dirname, "..", "..", "..", "test", "log.txt"));

        stream.once('open', function() {
            summaryList.map(element => element.map(elem =>  stream.write(elem)));
            stream.end();
        });
    }

    async getTimings() {
        const timingsList = Object.assign([], timeList);
        return timingsList;
    }
}

module.exports = new Logger();
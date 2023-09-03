import path from "path";
import { createWriteStream } from 'fs';
import moment from 'moment';
const timeList = [];
const logList = [];

class Logger {
    static log(step) {
        console.log(step);
        logList.push(` ${step}\n`);
        const timeStamp = moment()
        .format()
        .slice(0, 19)
        .replace('T', ' ');

        timeList.push(`${timeStamp}`);
    }

    static async logToFile() {
        const zip = (a, b) => a.map((k, i) => [k, b[i]]);
        const summaryList = zip(timeList, logList);
        const stream = createWriteStream(path.join(path.resolve(), "test", "log.txt"));
        stream.once('open', () => {
            summaryList.forEach((element) => element.forEach((elem) => stream.write(elem)));
            stream.end();
        });
    }

    static async getTimings() {
        return [...timeList];
    }
}

export default Logger;
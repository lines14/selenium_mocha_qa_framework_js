import path from "path";
const timeList = [];
const logList = [];
import { createWriteStream } from 'fs';
import moment from 'moment';

class Logger {
    log(step) {
        console.log(step);
        logList.push(` ${step}\n`);
        timeList.push(`${moment().format().slice(0, 19).replace('T', ' ')}`);
    }

    async logToFile() {
        const zip = (a, b) => a.map((k, i) => [k, b[i]]);
        const summaryList = zip(timeList, logList);
        const stream = createWriteStream(path.join(path.resolve(), "test", "log.txt"));
        
        stream.once('open', function() {
            summaryList.map(element => element.map(elem =>  stream.write(elem)));
            stream.end();
        });
    }

    async getTimings() {
        return Object.assign([], timeList);
    }
}

export default new Logger();
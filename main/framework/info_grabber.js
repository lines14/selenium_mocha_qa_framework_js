const Label = require('./base_element_children/label');

class InfoGrabber {
    constructor() {
        this.allRows = new Label('//*[@id="app"]/div/div/div[2]/div[2]/div[2]/div[3]/div[1]/div[2]/div', 'all rows in list');
    }
    async tableRowsAll() {
        return await this.allRows.parseChildrenTextByCounter();
    }
}

module.exports = new InfoGrabber();
const BaseElement = require('../main/base_element');

class ResultPage {
    constructor() {
        this.resultPage = new BaseElement("//a[@id = 'sort_by_trigger']", 'result page');
        this.leftSearchForm = new BaseElement("//div[@class = 'searchbar_left']//input[@type = 'text']", 'left search form');
        this.firstItem = new BaseElement("//*[@id='search_resultsRows']//a//following-sibling::span[@class='title']", 'first item in list');
        this.allItems = new BaseElement("//*[@id='search_resultsRows']//a", 'all items from list');
    }
    async verifyResultPageOpened() {
        return await this.resultPage.boolIsDisplayed();
    }
    async verifySearchBoxValue() {
        return await this.leftSearchForm.getAttributeValue('value');
    }
    async verifyFirstNameInList() {
        return await this.firstItem.getText();
    }
    async parseResultPageElementsUnlimitedForNames() {
        let textList = await this.allItems.parseChildrenForText()
        let namesList = textList.map(element => element.split('\n')[0].toString());
        return namesList;
    }
}

module.exports = new ResultPage();
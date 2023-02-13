const BasePage = require('../main/basepage');

class ResultPage extends BasePage{

    static async verifyResultPageOpened(){
        return await this.verifyWebPageByDisplayedElement("//a[@id = 'sort_by_trigger']")
    }
    static async verifySearchBoxValue(){
        return await this.verifyWebElementAttributeValue("//div[@class = 'searchbar_left']//input[@type = 'text']", 'value');
    }
    static async verifyFirstNameInList(){
        return await this.verifyWebPageByCustomText("//*[@id='search_resultsRows']//a//following-sibling::span[@class='title']");
    }
    static async parseResultPageElementsUnlimitedForNames(){
        let textList = await this.parseTheChildElementsUnlimitedForText("//*[@id='search_resultsRows']//a");
        let namesList = textList.map(element => element.split('\n')[0].toString());
        return namesList;
    }
}

module.exports = ResultPage;
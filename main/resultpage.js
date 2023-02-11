const BasePage = require('../main/basepage');

class ResultPage extends BasePage{

    static async verifyResultPageOpened(){
        return await this.verifyWebPageByDisplayedElement("//a[@id = 'sort_by_trigger']")
    }
    static async verifySearchBoxValue(){
        return await this.verifyWebElementAttributeValue("//div[@class = 'searchbar_left']//input[@type = 'text']", 'value');
    }
    static async verifyFirstNameInList(){
        return await this.verifyWebPageByCustomText("//*[@id='search_resultsRows']//a[1]//following-sibling::span[@class='title']");
    }
    static async parseChildElementsUnlimited(path, childPath, attr){
        return await this.parseTheChildElementsUnlimited(path, childPath, attr);
    }
    static async parseChildElementsUnlimitedForText(){
        return await this.parseTheChildElementsUnlimitedForText("//*[@id='search_resultsRows']", "//a", "//following-sibling::span[@class='title']");
    }
    static async parseChildElements(path, childPath, maxCount, childSubPath, attr){
        return await this.parseTheChildElements(path, childPath, maxCount, childSubPath, attr);
    }
    static async parseChildElementsForText(path, childPath, maxCount, childSubPath){
        return await this.parseTheChildElementsForText(path, childPath, maxCount, childSubPath);
    }
    static async inputFormAndEnter(text){
        await this.enterTextByXpath("//input[@id = 'store_nav_search_term']", text)
    }
    
}

module.exports = ResultPage;
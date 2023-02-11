const BasePage = require('../main/basepage');

class ResultPage extends BasePage{

    static async verifyResultPageOpened(path){
        return await this.verifyWebPageByDisplayedElement(path)
    }
    static async verifySearchBoxValue(path, attr){
        return await this.verifyWebElementAttributeValue(path, attr);
    }
    static async verifyFirstNameInList(path){
        return await this.verifyWebPageByCustomText(path);
    }
    static async parseChildElementsUnlimited(path, childPath, attr){
        return await this.parseTheChildElementsUnlimited(path, childPath, attr);
    }
    static async parseChildElementsUnlimitedForText(path, childPath, childSubPath){
        return await this.parseTheChildElementsUnlimitedForText(path, childPath, childSubPath);
    }
    static async parseChildElements(path, childPath, maxCount, childSubPath, attr){
        return await this.parseTheChildElements(path, childPath, maxCount, childSubPath, attr);
    }
    static async parseChildElementsForText(path, childPath, maxCount, childSubPath){
        return await this.parseTheChildElementsForText(path, childPath, maxCount, childSubPath);
    }
    static async inputFormAndEnter(path, text){
        await this.enterTextByXpath(path, text)
    }
    
}

module.exports = ResultPage;
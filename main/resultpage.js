var Base = require ('../main/base');

class ResultPage extends Base{

    async verifyResultPageOpened(path){
        return await this.verifyWebPageByDisplayedElement(path)
    }
    async verifySearchBoxValue(path, attr){
        return await this.verifyWebElementAttributeValue(path, attr);
    }
    async verifyFirstNameInList(path){
        return await this.verifyWebPageByCustomText(path);
    }
    async parseChildElementsUnlimited(path, childPath, attr){
        return await this.parseTheChildElementsUnlimited(path, childPath, attr);
    }
    async parseChildElementsUnlimitedForText(path, childPath, childSubPath){
        return await this.parseTheChildElementsUnlimitedForText(path, childPath, childSubPath);
    }
    async parseChildElements(path, childPath, maxCount, childSubPath, attr){
        return await this.parseTheChildElements(path, childPath, maxCount, childSubPath, attr);
    }
    async parseChildElementsForText(path, childPath, maxCount, childSubPath){
        return await this.parseTheChildElementsForText(path, childPath, maxCount, childSubPath);
    }
    async inputFormAndEnter(path, text){
        await this.enterTextByXpath(path, text)
    }
    async driverQuit(){
        await this.quitDriver()
    }
    
}

module.exports = new ResultPage();
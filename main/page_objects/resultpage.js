const Element = require('../framework/base_element_children/element');
const InputForm = require('../framework/base_element_children/input_form');
const ListOfElements = require('../framework/base_element_children/list_of_elements');
const {By} = require('selenium-webdriver');

class ResultPage {
    constructor() {
        this.resultPage = new Element(By.xpath("//a[@id = 'sort_by_trigger']"), 'result page');
        this.leftSearchForm = new InputForm(By.xpath("//div[@class = 'searchbar_left']//input[@type = 'text']"), 'left search form');
        this.firstItem = new Element(By.xpath("//*[@id='search_resultsRows']//a//following-sibling::span[@class='title']"), 'first item in list');
        this.allItems = new ListOfElements(By.xpath("//*[@id='search_resultsRows']//a"), 'all items from list');
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
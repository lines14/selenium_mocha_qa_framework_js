const chai = require('chai');
const dataProvider = require('../main/data_provider');
const infoGrabber = require('../main/framework/info_grabber');
const resultPage = require('../main/page_objects/resultpage');
const browser = require('../main/framework/browser');
const headerSearchForm = require('../main/page_objects/header_search_form');

describe('Test scenario: Game search', function() {

    let twoNames;
    let firstModelsList;

    before(async function() {
        await browser.initTheDriver(dataProvider.getConfigData().browser);
    });

    it('Dota 2 page is open', async function() {
        await browser.go_to_url(dataProvider.getConfigData().url);
        await headerSearchForm.inputFormAndEnter(dataProvider.getTestData().firstGame);
        const isResultPage = await resultPage.verifyResultPageOpened();
        chai.assert.equal(isResultPage, true, 'Result page is not open');
    });

    it('Search box on first result page contains searched name', async function() {
        const value1 = await resultPage.verifySearchBoxValue();
        chai.assert.equal(value1, 'Dota 2', 'Search box on first result page not contains searched name');
    });

    it('The first name is equal to searched name', async function() {
        const name = await resultPage.verifyFirstNameInList();
        chai.assert.equal(name, 'Dota 2', 'The first name is not equal to searched name'); 
    });

    it('Search box on second result page contains searched name', async function() {
        firstModelsList = await infoGrabber.modelsCreator();
        twoNames = await infoGrabber.namesAll();
        const secondName = twoNames[1].toString();
        await headerSearchForm.inputFormAndEnter(secondName);
        const value2 = await resultPage.verifySearchBoxValue();
        chai.assert.equal(value2, secondName, 'Search box on second result page not contains searched name');
    });

    it('Result list contains 2 stored items from the previous search. All stored data are matched', async function() {
        const allListNames = await resultPage.parseResultPageElementsUnlimitedForNames();
        chai.assert.includeDeepMembers(allListNames, twoNames, 'Result list not contains 2 stored items from the previous search');
        secondModelsList = await infoGrabber.modelsCreator();
        chai.assert.equal(firstModelsList[0], secondModelsList[1], 'Stored data not matched');
    });

    after(async function() {
        await browser.quitDriver();
    });
    
});

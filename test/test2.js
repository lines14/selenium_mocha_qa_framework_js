// to run the tests you may execute console command "npm run test1 && npm run test2" if preinstalled "mocha" and "chai" modules

const chai = require('chai');
const DataProvider = require('../main/data_provider');
const InfoGrabber = require('../main/info_grabber');
const ResultPage = require('../main/resultpage');
const Browser = require('../main/browser');
const HeaderSearchField = require('../main/header_search_field');
// const PrivacyPage = require('../main/privacypage');

describe('Test scenario: Game search', function(){
   
    let twoNames;
    let firstModelsList;
    let secondModelsList;

    before(async function() {
        await Browser.initTheDriver(DataProvider.getConfigData().chrome);
    });

    it('Dota 2 page is open', async function(){
        await Browser.go_to_url(DataProvider.getConfigData().url);
        await HeaderSearchField.inputFormAndEnter(DataProvider.getTestData().firstGame);
        const isResultPage = await ResultPage.verifyResultPageOpened();
        chai.assert.equal(isResultPage, true, 'Result page is not open');
    });

    it('Search box on first result page contains searched name', async function(){
        const value1 = await ResultPage.verifySearchBoxValue();
        chai.assert.equal(value1, 'Dota 2', 'Search box on first result page not contains searched name');
    });

    it('The first name is equal to searched name', async function(){
        const name = await ResultPage.verifyFirstNameInList();
        chai.assert.equal(name, 'Dota 2', 'The first name is not equal to searched name'); 
        firstModelsList = await InfoGrabber.getAllModels()
    });

    it('Search box on second result page contains searched name', async function(){
        twoNames = await InfoGrabber.namesAll();
        const secondName = twoNames[1].toString();
        await HeaderSearchField.inputFormAndEnter(secondName);
        const value2 = await ResultPage.verifySearchBoxValue();
        chai.assert.equal(value2, secondName, 'Search box on second result page not contains searched name');
    });

    it('Result list contains 2 stored items from the previous search. All stored data are matched', async function(){
        const allListNames = await ResultPage.parseResultPageElementsUnlimitedForNames();
        chai.assert.includeDeepMembers(allListNames, twoNames, 'Result list not contains 2 stored items from the previous search');
        secondModelsList = await InfoGrabber.getAllModels()
        chai.assert.equal(firstModelsList[0], secondModelsList[0], 'Stored data not matched');
        console.log(firstModelsList)
        console.log(secondModelsList)
    });

    after(async function() {
        await Browser.quitDriver();
    });
    
});
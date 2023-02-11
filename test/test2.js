// to run the tests you may execute console command "npm run test1 && npm run test2" if preinstalled "mocha" and "chai" modules

const chai = require('chai');
const DataProvider = require('../main/data_provider');
const InfoGrabber = require('../main/info_grabber');
const HomePage = require('../main/homepage');
const ResultPage = require('../main/resultpage');
const Browser = require('../main/browser');
// const PrivacyPage = require('../main/privacypage');

describe('Test scenario: Game search', function(){
   
    let allSavedNames;
    let allSavedData1;

    before(async function() {
        await Browser.initTheDriver(DataProvider.getConfigData().browser);
    });

    it('Dota 2 page is open', async function(){
        await Browser.go_to_url(DataProvider.getConfigData().url);
        await HomePage.inputFormAndEnter(DataProvider.getConfigData().headerSearchInput, 'Dota 2')
        const isResultPage = await ResultPage.verifyResultPageOpened(DataProvider.getConfigData().resultsSorter);
        chai.assert.equal(isResultPage, true, 'Result page is not open');
    });

    it('Search box on first result page contains searched name', async function(){
        const value1 = await ResultPage.verifySearchBoxValue(DataProvider.getConfigData().leftSearchInput, 'value');
        chai.assert.equal(value1, 'Dota 2', 'Search box on first result page not contains searched name');
    });

    it('The first name is equal to searched name', async function(){
        const name = await ResultPage.verifyFirstNameInList(DataProvider.getConfigData().firstSearchResultLink);
        chai.assert.equal(name, 'Dota 2', 'The first name is not equal to searched name'); 
    });

    it('Search box on second result page contains searched name', async function(){
        allSavedNames = await InfoGrabber.namesAll();
        allSavedData1 = await InfoGrabber.combineAllData();
        const secondName = allSavedNames[1].toString();
        await ResultPage.inputFormAndEnter(DataProvider.getConfigData().headerSearchInput, secondName)
        const value2 = await ResultPage.verifySearchBoxValue(DataProvider.getConfigData().leftSearchInput, 'value');
        chai.assert.equal(value2, secondName, 'Search box on second result page not contains searched name');
    });

    it('Result list contains 2 stored items from the previous search. All stored data are matched', async function(){
        const allListNames = await ResultPage.parseChildElementsUnlimitedForText(DataProvider.getConfigData().resultsList, DataProvider.getConfigData().childLinks, DataProvider.getConfigData().childSubPath);
        chai.assert.includeDeepMembers(allListNames, allSavedNames, 'Result list not contains 2 stored items from the previous search');
        const allSavedData2 = await InfoGrabber.combineAllData();
        chai.assert.equal(allSavedData2.firstItem, allSavedData1.secondItem, 'Stored data not matched');
    });

    after(async function() {
        await Browser.quitDriver();
    });
    
});
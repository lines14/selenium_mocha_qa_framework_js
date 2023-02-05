// to run the tests you may execute console command "npm run test1 && npm run test2" if preinstalled "mocha" and "chai" modules

const chai = require('chai');
const dataprovider = require('../main/data_provider');
const infograbber = require('../main/info_grabber');
const homepage = require('../main/homepage');
const resultpage = require('../main/resultpage');
// const privacypage = require('../main/privacypage');

describe('Test scenario: Game search', function(){
   
    var allSavedNames;
    var allSavedData1;

    before(async function() {
        await homepage.driverInit('chrome');
    });

    it('Dota 2 page is open', async function(){
        await homepage.enter_url(dataprovider.getTestData().url);
        await homepage.inputFormAndEnter(dataprovider.getConfigData().headerSearchInput, 'Dota 2')
        let isResultPage = await resultpage.verifyResultPageOpened(dataprovider.getConfigData().resultsSorter);
        chai.assert.equal(isResultPage, true, 'Result page is not open');
    });

    it('Search box on first result page contains searched name', async function(){
        let value1 = await resultpage.verifySearchBoxValue(dataprovider.getConfigData().leftSearchInput, 'value');
        chai.assert.equal(value1, 'Dota 2', 'Search box on first result page not contains searched name');
    });

    it('The first name is equal to searched name', async function(){
        let name = await resultpage.verifyFirstNameInList(dataprovider.getConfigData().firstSearchResultLink);
        chai.assert.equal(name, 'Dota 2', 'The first name is not equal to searched name'); 
    });

    it('Search box on second result page contains searched name', async function(){
        allSavedNames = await infograbber.namesAll();
        allSavedData1 = await infograbber.combineAllData();
        // customize saveDataToFile() method in the ./main/info_grabber.js
        await infograbber.saveDataToFile();
        let secondName = allSavedNames[1].toString();
        await resultpage.inputFormAndEnter(dataprovider.getConfigData().headerSearchInput, secondName)
        let value2 = await resultpage.verifySearchBoxValue(dataprovider.getConfigData().leftSearchInput, 'value');
        chai.assert.equal(value2, secondName, 'Search box on second result page not contains searched name');
    });

    it('Result list contains 2 stored items from the previous search. All stored data are matched', async function(){
        let allListNames = await resultpage.parseChildElementsUnlimitedForText(dataprovider.getConfigData().resultsList, dataprovider.getConfigData().childLinks, dataprovider.getConfigData().childSubPath);
        chai.assert.includeDeepMembers(allListNames, allSavedNames, 'Result list not contains 2 stored items from the previous search');
        let allSavedData2 = await infograbber.combineAllData();
        chai.assert.equal(allSavedData2.firstItem, allSavedData1.secondItem, 'Stored data not matched');
    });

    after(async function() {
        await resultpage.driverQuit();
    });
    
});
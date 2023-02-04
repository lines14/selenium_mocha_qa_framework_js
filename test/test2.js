// to run the tests you may execute console command "npm run test1 && npm run test2" if preinstalled "mocha" and "chai" modules

const chai = require('chai');
const dataprovider = require('../main/data_provider');
const infograbber = require('../main/info_grabber');
const homepage = require('../main/homepage');
// const privacypage = require('../main/privacypage');
const resultpage = require('../main/resultpage');

describe('Test scenario: Game search', function(){
   
    var allSavedNames;
    var allSavedData1;

    before(async function() {
        await homepage.driverInit('chrome');
    });

    it('Dota 2 page is open', async function(){
        await homepage.enter_url(dataprovider.getTestData().url);
        await homepage.inputFormAndEnter('//input[@id = "store_nav_search_term"]', 'Dota 2')
        let isResultPage = await resultpage.verifyResultPageOpened('//a[@id = "sort_by_trigger"]');
        chai.assert.equal(isResultPage, true, 'Result page is not open');
    });

    it('Search box on first result page contains searched name', async function(){
        let value1 = await resultpage.verifySearchBoxValue('//div[@class = "searchbar_left"]//input[1]', 'value');
        chai.assert.equal(value1, 'Dota 2', 'Search box on first result page not contains searched name');
    });

    it('The first name is equal to searched name', async function(){
        let name = await resultpage.verifyFirstNameInList('//*[@id="search_resultsRows"]//a[1]//following-sibling::span');
        chai.assert.equal(name, 'Dota 2', 'The first name is not equal to searched name');
        // customize saveDataToFile() in the ./main/info_grabber.js
        await infograbber.saveDataToFile(); 
    });

    it('Search box on second result page contains searched name', async function(){
        allSavedData1 = await infograbber.combineAllData();
        allSavedNames = await infograbber.namesAll();
        let secondName = allSavedNames[1].toString();
        await resultpage.inputFormAndEnter('//input[@id = "store_nav_search_term"]', secondName)
        let value2 = await resultpage.verifySearchBoxValue('//div[@class = "searchbar_left"]//input[1]', 'value');
        chai.assert.equal(value2, secondName, 'Search box on second result page not contains searched name');
    });

    it('Result list contains 2 stored items from the previous search. All stored data are matched', async function(){
        let allListNames = await resultpage.parseChildElementsUnlimitedForText('//*[@id="search_resultsRows"]', '//a', '//div[2]//div[1]//span');
        chai.assert.includeDeepMembers(allListNames, allSavedNames, 'Result list not contains 2 stored items from the previous search');
        let allSavedData2 = await infograbber.combineAllData();
        chai.assert.equal(allSavedData2.firstItem, allSavedData1.secondItem, 'Stored data not matched');
    });

    after(async function() {
        await resultpage.driverQuit();
    });
    
});
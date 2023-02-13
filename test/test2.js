// to run the tests you may execute console command "npm run test1 && npm run test2" if preinstalled "mocha" and "chai" modules

const chai = require('chai');
const DataProvider = require('../main/data_provider');
const InfoGrabber = require('../main/info_grabber');
const ResultPage = require('../main/resultpage');
const Browser = require('../main/browser');
const HeaderSearchField = require('../main/header_search_field');
const Models = require ('../main/models');
// const PrivacyPage = require('../main/privacypage');

describe('Test scenario: Game search', function(){
   
    const firstModel = new Models();
    const secondModel = new Models();
    let twoNames;
    let firstModelsList;

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
    });

    it('Search box on second result page contains searched name', async function(){
        let platformsListAll = await InfoGrabber.platformsAll()
        firstModel.platforms = platformsListAll[0];
        secondModel.platforms = platformsListAll[1];
        let releaseDatesAll = await InfoGrabber.releaseDatesAll()
        firstModel.releaseDate = releaseDatesAll[0];
        secondModel.releaseDate = releaseDatesAll[1];
        let reviewSummarysAll = await InfoGrabber.reviewSummarysAll()
        firstModel.feedback = reviewSummarysAll[0];
        secondModel.feedback = reviewSummarysAll[1];
        let pricesAll = await InfoGrabber.pricesAll()
        firstModel.price = pricesAll[0];
        secondModel.price = pricesAll[1];
        twoNames = await InfoGrabber.namesAll();
        firstModel.name = twoNames[0];
        secondModel.name = twoNames[1];
        firstModelsList = [JSON.stringify(firstModel), JSON.stringify(secondModel)];

        const secondName = twoNames[1].toString();
        await HeaderSearchField.inputFormAndEnter(secondName);
        const value2 = await ResultPage.verifySearchBoxValue();
        chai.assert.equal(value2, secondName, 'Search box on second result page not contains searched name');
    });

    it('Result list contains 2 stored items from the previous search. All stored data are matched', async function(){
        const allListNames = await ResultPage.parseResultPageElementsUnlimitedForNames();
        chai.assert.includeDeepMembers(allListNames, twoNames, 'Result list not contains 2 stored items from the previous search');

        let platformsListAll = await InfoGrabber.platformsAll()
        firstModel.platforms = platformsListAll[0];
        secondModel.platforms = platformsListAll[1];
        let releaseDatesAll = await InfoGrabber.releaseDatesAll()
        firstModel.releaseDate = releaseDatesAll[0];
        secondModel.releaseDate = releaseDatesAll[1];
        let reviewSummarysAll = await InfoGrabber.reviewSummarysAll()
        firstModel.feedback = reviewSummarysAll[0];
        secondModel.feedback = reviewSummarysAll[1];
        let pricesAll = await InfoGrabber.pricesAll()
        firstModel.price = pricesAll[0];
        secondModel.price = pricesAll[1];
        twoNames = await InfoGrabber.namesAll();
        firstModel.name = twoNames[0];
        secondModel.name = twoNames[1];
        let secondModelsList = [JSON.stringify(firstModel), JSON.stringify(secondModel)];

        chai.assert.deepEqual(firstModelsList[0], secondModelsList[1], 'Stored data not matched');
    });

    after(async function() {
        await Browser.quitDriver();
    });
    
});
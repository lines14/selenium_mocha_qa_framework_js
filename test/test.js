// to run the tests you may execute console command "npm test" if preinstalled "mocha" and "chai" modules

const chai = require('chai');
let DataProvider = require('../main/data_provider');
let HomePage = require('../main/homepage');
let PrivacyPage = require('../main/privacypage');
let Browser = require('../main/browser');
let HeaderSearchField = require('../main/header_search_field');
let ResultPage = require('../main/resultpage');
let InfoGrabber = require('../main/info_grabber');
const Models = require ('../main/models');

describe('Test scenario: Privacy policy', function(){
   
    before(async function() {
        await Browser.initTheDriver(DataProvider.getConfigData().chrome);
    });

    it('Privacy policy page is open in the new tab', async function(){
        await Browser.go_to_url(DataProvider.getConfigData().url);
        await Browser.scrollToTheBottom();
        await HomePage.clickPrivacyPolicyButton();
        const tabsCount = await Browser.checkTheTabsCount();
        chai.assert.equal(tabsCount, 2, 'Privacy policy page is not open in the new tab');
    });

    it('Switch language elements list displayed. Supported languages: English, Spanish, French, German, Italian, Russian, Japanese, Portuguese, Brazilian', async function(){
        await Browser.switchDriverToTheAnotherTab(1);
        const listStatus = await PrivacyPage.verifyLanguagesListOnPrivacyPage();
        chai.assert.equal(listStatus, true, 'Switch language elements list is not displayed');
        const languagesList = await PrivacyPage.parseLanguages();
        chai.assert.equal(languagesList.map(a => a.slice(49, a.length-1)).toString(), DataProvider.getTestData().languagesList, 'Supported languages list is not complete');
    });

    it('Policy revision signed in the current year', async function(){
        const str = await PrivacyPage.checkPolicySignYear();
        const result = str.match(2023);
        chai.assert.equal(result[0], '2023', 'Policy revision signed not in the current year');
    });

    after(async function() {
        await Browser.quitDriver();
    });
    
});

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
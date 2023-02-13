// to run the tests you may execute console command "npm test" if preinstalled "mocha" and "chai" modules

const chai = require('chai');
const DataProvider = require('../main/data_provider');
const HomePage = require('../main/homepage');
const PrivacyPage = require('../main/privacypage');
const Browser = require('../main/browser');
const HeaderSearchField = require('../main/header_search_field');
const ResultPage = require('../main/resultpage');
const InfoGrabber = require('../main/info_grabber');

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
        await PrivacyPage.waitForLanguagesList();
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
        firstModelsList = await InfoGrabber.modelsCreator();
        twoNames = await InfoGrabber.namesAll();
        const secondName = twoNames[1].toString();
        await HeaderSearchField.inputFormAndEnter(secondName);
        const value2 = await ResultPage.verifySearchBoxValue();
        chai.assert.equal(value2, secondName, 'Search box on second result page not contains searched name');
    });

    it('Result list contains 2 stored items from the previous search. All stored data are matched', async function(){
        const allListNames = await ResultPage.parseResultPageElementsUnlimitedForNames();
        chai.assert.includeDeepMembers(allListNames, twoNames, 'Result list not contains 2 stored items from the previous search');
        secondModelsList = await InfoGrabber.modelsCreator();
        chai.assert.equal(firstModelsList[0], secondModelsList[1], 'Stored data not matched');
    });

    after(async function() {
        await Browser.quitDriver();
    });
    
});
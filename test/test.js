// to run the tests you may execute console command "npm test" if preinstalled "mocha" and "chai" modules

const chai = require('chai');
const dataProvider = require('../main/data_provider');
const homePage = require('../main/page_objects/homepage');
const privacyPage = require('../main/page_objects/privacypage');
const browser = require('../main/framework/browser');
const headerSearchForm = require('../main/page_objects/header_search_form');
const resultPage = require('../main/page_objects/resultpage');
const infoGrabber = require('../main/framework/info_grabber');

describe('Test scenario: Privacy policy && Test scenario: Game search', function() {
    let twoNames;
    let firstModelsList;

    before(async function() {
        await browser.initTheDriver(dataProvider.getConfigData().chrome);
    });

    it('Privacy policy page is open in the new tab', async function() {
        await browser.go_to_url(dataProvider.getConfigData().url);
        await browser.scrollToTheBottom();
        await homePage.clickPrivacyPolicyButton();
        const tabsCount = await browser.checkTheTabsCount();
        chai.assert.equal(tabsCount, 2, 'Privacy policy page is not open in the new tab');
    });

    it('Switch language elements list displayed. Supported languages: English, Spanish, French, German, Italian, Russian, Japanese, Portuguese, Brazilian', async function() {
        await browser.switchDriverToTheAnotherTab(1);
        await privacyPage.waitForLanguagesList();
        const listStatus = await privacyPage.verifyLanguagesListOnPrivacyPage();
        chai.assert.equal(listStatus, true, 'Switch language elements list is not displayed');
        const languagesList = await privacyPage.parseLanguages();
        chai.assert.equal(languagesList.map(a => a.slice(49, a.length-1)).toString(), dataProvider.getTestData().languagesList, 'Supported languages list is not complete');
    });

    it('Policy revision signed in the current year', async function() {
        const str = await privacyPage.checkPolicySignYear();
        const result = str.match(2023);
        chai.assert.equal(result[0], '2023', 'Policy revision signed not in the current year');
        await browser.quitDriver();
    });

    it('Dota 2 page is open', async function() {
        await browser.initTheDriver(dataProvider.getConfigData().chrome);
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
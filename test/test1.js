// to run the tests you may execute console command "npm run test1 && npm run test2" if preinstalled "mocha" and "chai" modules

const chai = require('chai');
const DataProvider = require('../main/data_provider');
const HomePage = require('../main/homepage');
const PrivacyPage = require('../main/privacypage');
const Browser = require('../main/browser');
// const HeaderSearchField = require('../main/header_search_field');
// const ResultPage = require('../main/resultpage');
// const InfoGrabber = require('../main/info_grabber');

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
// to run the tests you may execute console command "npm run test1 && npm run test2" if preinstalled "mocha" and "chai" modules

const chai = require('chai');
const dataProvider = require('../main/data_provider');
const homePage = require('../main/homepage');
const privacyPage = require('../main/privacypage');
const browser = require('../main/browser');
// const headerSearchField = require('../main/header_search_field');
// const resultPage = require('../main/resultpage');
// const infoGrabber = require('../main/info_grabber');

describe('Test scenario: Privacy policy', function(){
   
    before(async function() {
        await browser.initTheDriver(dataProvider.getConfigData().chrome);
    });

    it('Privacy policy page is open in the new tab', async function(){
        await browser.go_to_url(dataProvider.getConfigData().url);
        await browser.scrollToTheBottom();
        await homePage.clickPrivacyPolicyButton();
        const tabsCount = await browser.checkTheTabsCount();
        chai.assert.equal(tabsCount, 2, 'Privacy policy page is not open in the new tab');
    });

    it('Switch language elements list displayed. Supported languages: English, Spanish, French, German, Italian, Russian, Japanese, Portuguese, Brazilian', async function(){
        await browser.switchDriverToTheAnotherTab(1);
        await privacyPage.waitForLanguagesList();
        const listStatus = await privacyPage.verifyLanguagesListOnPrivacyPage();
        chai.assert.equal(listStatus, true, 'Switch language elements list is not displayed');
        const languagesList = await privacyPage.parseLanguages();
        chai.assert.equal(languagesList.map(a => a.slice(49, a.length-1)).toString(), dataProvider.getTestData().languagesList, 'Supported languages list is not complete');
    });

    it('Policy revision signed in the current year', async function(){
        const str = await privacyPage.checkPolicySignYear();
        const result = str.match(2023);
        chai.assert.equal(result[0], '2023', 'Policy revision signed not in the current year');
    });

    after(async function() {
        await browser.quitDriver();
    });
    
});
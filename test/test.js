// to run the test in multiple browsers you may execute console command "npm test" if preinstalled "mocha" and "chai" modules

const chai = require('chai');
const homepage = require('../main/homepage');
const privacypage = require('../main/privacypage');
const dataprovider = require('../main/data_provider');

describe('Test scenario: Privacy policy', function(){
   
    before(async function() {

        await homepage.driverInit('chrome');
    
    });

    // beforeEach(function(){

    // });

    it('Privacy policy page is open in the new tab', async function(){
        await homepage.enter_url(dataprovider.getTestData().url);
        await homepage.scrollToBottom();
        await homepage.clickPrivacyPolicyButton('//div[@id = "footer_text"]//div//a[1]');
        let tabsCount = await privacypage.checkTheTabsCount();
        chai.assert.equal(tabsCount, 2, 'Privacy policy page is not open in the new tab');
    });

    it('Switch language elements list displayed. Supported languages: English, Spanish, French, German, Italian, Russian, Japanese, Portuguese, Brazilian', async function(){
        await privacypage.switchDriverToAnotherTab(1);
        let listStatus = await privacypage.verifyLanguagesListOnPrivacyPage('//*[@id="languages"]');
        chai.assert.equal(listStatus, true, 'Switch language elements list is not displayed');
        let languagesList = await privacypage.parseChildElements('//*[@id="languages"]', '//a', 'href');
        chai.assert.equal(languagesList.map(a => a.slice(49, a.length-1)).toString(), dataprovider.getTestData().languagesList, 'Supported languages list is not complete');
    });

    // it('Policy revision signed in the current year.', async function(){
        
    // });

    // afterEach(function(){
        
    // });

    after(async function() {

        await privacypage.driverQuit();
    
    });
    
});
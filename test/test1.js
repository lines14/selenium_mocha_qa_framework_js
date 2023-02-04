// to run the tests you may execute console command "npm run test1 && npm run test2" if preinstalled "mocha" and "chai" modules

const chai = require('chai');
const dataprovider = require('../main/data_provider');
// const infograbber = require('../main/info_grabber');
const homepage = require('../main/homepage');
const privacypage = require('../main/privacypage');
// const resultpage = require('../main/resultpage');

describe('Test scenario: Privacy policy', function(){
   
    before(async function() {
        await homepage.driverInit('chrome');
    });

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
        let languagesList = await privacypage.parseChildElementsUnlimited('//*[@id="languages"]', '//a', 'href');
        chai.assert.equal(languagesList.map(a => a.slice(49, a.length-1)).toString(), dataprovider.getTestData().languagesList, 'Supported languages list is not complete');
    });

    it('Policy revision signed in the current year', async function(){
        let str = await privacypage.chechPolicySignYear('//div[@id = "newsColumn"]//i[contains(text(), "2023")]');
        let result = str.match(2023);
        chai.assert.equal(result[0], '2023', 'Policy revision signed not in the current year');
    });

    after(async function() {
        await privacypage.driverQuit();
    });
    
});
// to run the test in multiple browsers you may execute console command "npm test" if preinstalled "mocha" and "chai" modules

const chai = require('chai');
const dataprovider = require('../main/data_provider');
const infograbber = require('../main/info_grabber');
const homepage = require('../main/homepage');
const privacypage = require('../main/privacypage');
const resultpage = require('../main/resultpage');

// describe('Test scenario: Privacy policy', function(){
   
//     before(async function() {

//         await homepage.driverInit('chrome');
    
//     });

//     // beforeEach(function(){

//     // });

//     it('Privacy policy page is open in the new tab', async function(){
//         await homepage.enter_url(dataprovider.getTestData().url);
//         await homepage.scrollToBottom();
//         await homepage.clickPrivacyPolicyButton('//div[@id = "footer_text"]//div//a[1]');
//         let tabsCount = await privacypage.checkTheTabsCount();
//         chai.assert.equal(tabsCount, 2, 'Privacy policy page is not open in the new tab');
//     });

//     it('Switch language elements list displayed. Supported languages: English, Spanish, French, German, Italian, Russian, Japanese, Portuguese, Brazilian', async function(){
//         await privacypage.switchDriverToAnotherTab(1);
//         let listStatus = await privacypage.verifyLanguagesListOnPrivacyPage('//*[@id="languages"]');
//         chai.assert.equal(listStatus, true, 'Switch language elements list is not displayed');
//         let languagesList = await privacypage.parseChildElementsUnlimited('//*[@id="languages"]', '//a', 'href');
//         chai.assert.equal(languagesList.map(a => a.slice(49, a.length-1)).toString(), dataprovider.getTestData().languagesList, 'Supported languages list is not complete');
//     });

//     it('Policy revision signed in the current year', async function(){
//         let str = await privacypage.chechPolicySignYear('//div[@id = "newsColumn"]//i[contains(text(), "2023")]');
//         let result = str.match(2023);
//         chai.assert.equal(result[0], '2023', 'Policy revision signed not in the current year');
//     });

//     // afterEach(function(){
        
//     // });

//     after(async function() {

//         await privacypage.driverQuit();
    
//     });
    
// });

describe('Test scenario: Game search', function(){
   
    var allSavedNames;
    var allSavedData1;

    before(async function() {

        await homepage.driverInit('chrome');
    
    });

    // beforeEach(function(){

    // });

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
        // set sequence number of outgoing file as argument and customize grabInfo() in the ./main/info_grabber.js
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

    // afterEach(function(){
        
    // });

    after(async function() {

        await privacypage.driverQuit();
    
    });
    
});

// getISS().then(({ latitude, longitude }) => {
//     getGeoLocation(latitude, longitude);
//   });
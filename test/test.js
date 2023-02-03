// to run the test in multiple browsers you may execute sequential console commands "BROWSER='browser alias' npm test" if preinstalled "mocha" and "chai" modules

const chai = require('chai');
const homepage = require('../main/homepage');
const loginpage = require('../main/loginpage');
const dataprovider = require('../main/data_provider');

describe('Test scenario: Privacy policy', function(){
   
    before(async function() {

        await homepage.driverInit('chrome');
    
    });

    // beforeEach(function(){

    // });

    it('Privacy policy page is open in the new tab.', async function(){
        await homepage.enter_url(dataprovider.getTestData().url);
        // await loginpage.verifyLoginFormIsDisplayed("//*[text() = 'Privacy Policy']");
        
        await homepage.scrollToElement("//*[text() = 'Privacy Policy']");
        // await window.scrollBy(0, document.body.scrollHeight);
        // let returnedMainPageText = await homepage.verifyHomePageByCustomText(path.textSteam);
        // chai.assert.equal(returnedMainPageText.slice(returnedMainPageText.length -5, returnedMainPageText.length), 'Steam', 'Main page is not displayed');
        let result = await homepage.verifyHomePageByCustomText("//*[text() = 'Privacy Policy']");
        console.log(result)
        
    });

    // it('Switch language elements list displayed.\nSupported languages: English, Spanish, French, German, Italian, Russian, Japanese, Portuguese, Brazilian.', async function(){
        
    // });

    // it('Policy revision signed in the current year.', async function(){
        
    // });

    // afterEach(function(){
        
    // });

    after(async function() {

        await loginpage.driverQuit();
    
    });
    
});
// to run the test you may execute console command "npm test" if preinstalled "mocha" and "chai" modules

const chai = require('chai');
const {Builder, Browser, By, Key, until} = require('selenium-webdriver');
require('chromedriver');

describe('"Invalid login"', function () {
    let driver = new Builder().forBrowser(Browser.CHROME).build();
    it('Navigate to main page', async () => {
      try {
        await driver.get('https://yaroslaw.org/');
        let title = await driver.getTitle();
        chai.assert.equal(title, 'Главная', 'Main page is not displayed');
        //   await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
      } finally {
        await driver.quit();
      };
    });
    // it('Clock login button', function () {
    //     chai.assert(, 'Login page is not open');
    // });
    // it('Input random strings as credentials. Click sign in button', function () {
    //     chai.assert(, 'Loading element is not displayed');
    //     chai.assert(, 'Error text is not displayed (after loading element disappearing)');
    // });
});






// async function mainPageOpened() {
//     let driver = await new Builder().forBrowser(Browser.CHROME).build();
//     try {
//       await driver.get('https://yaroslaw.org/');
//       return await driver.getTitle();
//     //   await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
//     } finally {
//       await driver.quit();
//     };
//   };

// mainPageOpened()
// .then(function (res) {
//     console.log(res);
// });





// async function mainPageOpened() {
//     let driver = new Builder().forBrowser(Browser.CHROME).build();

//     try {
//         // await driver.manage().setTimeouts({implicit: 100000});
//         await driver.get('https://store.steampowered.com/');
//         return await driver.getTitle();
//     } finally {
//         await driver.quit();
//     };
//   };
// mainPageOpened()
// .then(res => console.log(res))
// .catch(err => console.error(err))







































// await driver.executeScript('return document.readyState') == 'complete')
// mainPageOpened().then(result => result = driver.getTitle());
// console.log(mainPageOpened());

// function FunctionWhichReturnsAPromise().then(mainPageOpened(result){console.log(result)})
   

// WebDriverWait(driver, 10).until(lambda driver: driver.executeScript('return document.readyState') == 'complete')






 //   await driver.wait(until.titleIs('webdriver - Google Search'), 1000);

// let driver = new Builder().forBrowser(Browser.CHROME).build();

// const documentInitialised = () =>
//     driver.executeScript('return initialised');

// driver.get('https://store.steampowered.com/');
// driver.wait(() => documentInitialised(), 10000);

// console.log(documentInitialised())

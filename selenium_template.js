const {Builder, Browser, By, Key, until} = require('selenium-webdriver');
require('chromedriver');

async function example() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    await driver.get('https://www.google.com/ncr');
    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
  } finally {
    await driver.quit();
  };
};
example();




// async function helloSelenium() {
//   let driver = await new Builder().forBrowser('chrome').build();

//   await driver.get('https://selenium.dev');

//   await driver.quit();
// }
// helloSelenium();




// const documentInitialised = () =>
//     driver.executeScript('return initialised');

// await driver.get('file:///race_condition.html');
// await driver.wait(() => documentInitialised(), 10000);
// const element = driver.findElement(By.css('p'));
// assert.strictEqual(await element.getText(), 'Hello from JavaScript!');




// let ele = await driver.wait(until.elementLocated(By.css('p')),10000);
// let foo = await ele.getText();
// assert(foo == "Hello from JavaScript");




// (async function(){

//   // Apply timeout for 10 seconds
//   await driver.manage().setTimeouts( { implicit: 10000 } );
  
//   // Navigate to url
//   await driver.get('http://somedomain/url_that_delays_loading');
  
//   let webElement = driver.findElement(By.id("myDynamicElement"));
  
//   }());



// const {Builder, By} = require('selenium-webdriver');

// (async function example() {
//     let driver = await new Builder().forBrowser('chrome').build();
//     await driver.get('https://www.google.com');
//     await  driver.findElement(By.css('[name="q"]')).sendKeys("webElement");

//     // Get attribute of current active element
//     let attr = await driver.switchTo().activeElement().getAttribute("title");
//     console.log(`${attr}`)
// })();



// await driver.findElement(By.name('q')).sendKeys('webdriver', Key.ENTER);


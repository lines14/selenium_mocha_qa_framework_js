// to run the test you may execute console command "npm test" if preinstalled "mocha" and "chai" modules

const chai = require('chai');
const {By, until} = require('selenium-webdriver');
const myDriver = require('./main.js');
const testData = require('./test_data.json');

before(function() {
  driverInstance = new myDriver().driverSet();
  data = JSON.parse(JSON.stringify(testData));
});

describe('"Test scenario: Invalid login"', function () {

  it('Navigate to main page', async () => {
    await driverInstance.get('https://store.steampowered.com/');
    let steamDownloader = await driverInstance.findElement(By.xpath('//div[@id="global_action_menu"]//a[@class="header_installsteam_btn_content"]')).getText();
    chai.assert.equal(steamDownloader.slice(steamDownloader.length -5, steamDownloader.length), 'Steam', 'Main page is not displayed');
  });

  it('Click login button', async () => {
    await driverInstance.findElement(By.xpath('//div[@id="global_action_menu"]//a[@class="global_action_link"]')).click();
    let loginPage = await driverInstance.findElement(By.xpath('//body[contains(@class, "login")]')).isDisplayed();
    chai.assert.equal(loginPage, true, 'Login page is not open');
  });

  it('Input random strings as credentials. Click sign in button', async () => {
    await driverInstance.wait(until.elementLocated(By.xpath('//input[@type="text"]')), 9000);
    await driverInstance.findElement(By.xpath('//input[@type="password"]')).sendKeys(data.password);
    await driverInstance.findElement(By.xpath('//input[@type="text"]')).sendKeys(data.login);
    await driverInstance.findElement(By.xpath('//button[@type="submit"]')).click();
    let loadingButton = await driverInstance.findElement(By.xpath("//button[@type='submit']")).isEnabled();
    await driverInstance.wait(until.elementIsEnabled(driverInstance.findElement(By.xpath('//button[@type="submit"]'))), 9000);
    let errorMessage = await driverInstance.findElement(By.xpath("//form//div[5]")).getText();

    chai.assert.equal(loadingButton, false, 'Loading element is not displayed');
    chai.assert.notEqual(errorMessage, '', 'Error text is not displayed (after loading element disappearing)');
  });
});

after(function() {
  driverInstance.quit();
});

// after(async () => driverInstance.quit());
// driver.manage().window().maximize();
// await driver.sleep(2000);
// await driver.manage().setTimeouts({implicit: 15000});
// await driver.manage().setTimeouts().setScriptTimeout(10, TimeUnit.SECONDS);
// await driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
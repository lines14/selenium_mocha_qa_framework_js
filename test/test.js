// to run the test you may execute console command "npm test" if preinstalled "mocha" and "chai" modules

const chai = require('chai');
const {Builder, Browser, By, Key, until} = require('selenium-webdriver');
require('chromedriver');

describe('"Test scenario: Invalid login"', function () {
  let driver = new Builder().forBrowser(Browser.CHROME).build();
  driver.manage().window().maximize();

  it('Navigate to main page', async () => {
    await driver.get('https://store.steampowered.com/');
    let steamDownloader = await driver.findElement(By.xpath('//div[@id="global_action_menu"]//a[@class="header_installsteam_btn_content"]')).getText();
    chai.assert.equal(steamDownloader.slice(steamDownloader.length -5, steamDownloader.length), 'Steam', 'Main page is not displayed');
  });

  it('Click login button', async () => {
    await driver.findElement(By.xpath('//div[@id="global_action_menu"]//a[@class="global_action_link"]')).click();
    let loginPage = await driver.findElement(By.xpath('//body[contains(@class, "login")]')).isDisplayed();
    chai.assert.equal(loginPage, true, 'Login page is not open');
  });

  it('Input random strings as credentials. Click sign in button', async () => {
    await driver.wait(until.elementLocated(By.xpath('//input[@type="text"]')), 9000);
    await driver.findElement(By.xpath('//input[@type="password"]')).sendKeys("kfdddd");
    await driver.findElement(By.xpath('//input[@type="text"]')).sendKeys("kffff");
    await driver.findElement(By.xpath('//button[@type="submit"]')).click();
    let loadingButton = await driver.findElement(By.xpath("//button[@type='submit']")).isEnabled();
    await driver.wait(until.elementIsEnabled(driver.findElement(By.xpath('//button[@type="submit"]'))), 9000);
    let errorMessage = await driver.findElement(By.xpath("//form//div[5]")).getText();

    chai.assert.equal(loadingButton, false, 'Loading element is not displayed');
    chai.assert.notEqual(errorMessage, '', 'Error text is not displayed (after loading element disappearing)');
    
  });
  after(async () => driver.quit());
});

// await driver.sleep(2000);
// await driver.manage().setTimeouts({implicit: 15000});
// await driver.manage().setTimeouts().setScriptTimeout(10, TimeUnit.SECONDS);
// await driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
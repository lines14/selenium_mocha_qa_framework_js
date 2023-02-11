const webdriver = require('selenium-webdriver');

const driverInit = (function(){

    function initDriver(browser){
        if (browser === 'chrome'){
            const chromeCapabilities = webdriver.Capabilities.chrome();
            const chromeOptions = {'args': ['--incognito']};
            chromeCapabilities.set("goog:chromeOptions", chromeOptions);
            const driver = new webdriver.Builder().forBrowser(browser).withCapabilities(chromeCapabilities).build();
            driver.manage().window().maximize();
            // driver.manage().setTimeouts({implicit: (100000)});
            Object.freeze(driver);
            return driver;
        } else {
            const driver = new webdriver.Builder().forBrowser(browser).build();
            driver.manage().window().maximize();
            Object.freeze(driver);
            return driver;
        }
    }

    let driver;
  
    return {
        getInstance: function(browser){
            if (driver == null) {
                driver = new initDriver(browser);
                // Hide the constructor so the returned object can't be new'd
                driver.constructor = null;
            }
            return driver;
        }
    }

  })

module.exports = driverInit();
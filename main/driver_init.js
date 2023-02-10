var webdriver = require('selenium-webdriver');

var driverInit = (function(){

    function initDriver(browser) {
        if (browser === 'chrome'){
            let chromeCapabilities = webdriver.Capabilities.chrome();
            let chromeOptions = {'args': ['--incognito']};
            chromeCapabilities.set("goog:chromeOptions", chromeOptions);
            let driver = new webdriver.Builder().forBrowser(browser).withCapabilities(chromeCapabilities).build();
            driver.manage().window().maximize();
            // driver.manage().setTimeouts({implicit: (100000)});
            Object.freeze(driver);
            return driver;
        } else {
            let driver = new webdriver.Builder().forBrowser(browser).build();
            driver.manage().window().maximize();
            Object.freeze(driver);
            return driver;
        }
        
    }

    var driver;
  
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
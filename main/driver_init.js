var webdriver = require('selenium-webdriver');

var DriverInit = (function(){

    function Driver(browser) {
        let driver = new webdriver.Builder().forBrowser(browser).build();
        driver.manage().window().maximize();
        // driver.manage().setTimeouts({implicit: (100000)});
        Object.freeze(driver);
        return driver;
    }

    var driver;
  
    return {
        getInstance: function(browser){
            if (driver == null) {
                driver = new Driver(browser);
                // Hide the constructor so the returned object can't be new'd
                driver.constructor = null;
            }
            return driver;
        }
    }

  })

module.exports = DriverInit();
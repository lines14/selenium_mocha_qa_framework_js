var webdriver = require('selenium-webdriver');
const {chromeOptions} = require('selenium-webdriver');

const SingletonFactory = (function(){
    function singletonClass() {
    }
    let driver = new webdriver.Builder().forBrowser('chrome').build();
    driver.manage().window().maximize();
    // driver.manage().setTimeouts({implicit: (100000)});

    Object.freeze(chromeOptions);
    Object.freeze(driver);

    return {
        getInstance: function(){
            if (driver == null) {
                driver = new singletonClass();
                // Hide the constructor so the returned object can't be new'd...
                driver.constructor = null;
            }
            return driver;
        }
   };
})

module.exports = SingletonFactory();
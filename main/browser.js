var driverinit = require ('../main/driver_init');

class Browser{

    async initTheDriver(browser){
        global.driver = await driverinit.getInstance(browser);
    }
    async go_to_url(theURL){
        await driver.get(theURL);
    }
    async scrollToTheBottom() {
        await driver.executeScript('window.scrollBy(0, document.body.scrollHeight);');
        await driver.executeScript('window.scrollBy(0, document.body.scrollHeight);');
    }
    async checkTheTabsCount(){
        let tabsCount = (await driver.getAllWindowHandles()).length;
        return tabsCount;
    }
    async switchDriverToTheAnotherTab(number){
        await driver.wait(async () => (await driver.getAllWindowHandles()).length === 2, 9000);
        var windows = await driver.getAllWindowHandles();
        await driver.switchTo().window(windows[number]);
    }
    async quitDriver(){
        await driver.quit();
    }
}

module.exports = Browser;
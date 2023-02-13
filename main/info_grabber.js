const BasePage = require ('../main/basepage');

class InfoGrabber extends BasePage{

    static async namesAll(){
        const twoNames = [];
        const namesAll = await this.parseTheChildElementsUnlimitedForText('//*[@id="search_resultsRows"]//a//div[2]/div[1]/span');
        twoNames.push(namesAll[0]);
        twoNames.push(namesAll[1]);
        return twoNames;
    }
    static async platformsAll(){
        const itemsCount = 2;
        const platformsListAll = [];
        let counter = 1;
        while (counter <= itemsCount){
            const platformsList = await this.parseTheChildElementsUnlimitedByCounter(`//*[@id="search_resultsRows"]//a[${counter}]//div[2]//div[1]//div//span`, 'class');
            platformsListAll.push(platformsList);
            counter += 1;
        }
        platformsListAll[0] = platformsListAll[0].toString().replace(/platform_img /g, "").split().toString();
        platformsListAll[1] = platformsListAll[1].toString().replace(/platform_img /g, "").split().toString();
        return platformsListAll;
    }
    static async releaseDatesAll(){
        const releaseDatesAll = await this.parseTheChildElementsUnlimitedForText('//*[@id="search_resultsRows"]//a//div[2]/div[2]');
        return releaseDatesAll;
    }
    static async reviewSummarysAll(){
        const reviewSummarysAll = await this.parseTheChildElementsUnlimitedForAttr('//*[@id="search_resultsRows"]/a/div[2]/div[3]/span', 'class');
        reviewSummarysAll[0] = reviewSummarysAll[0].toString().replace("search_review_summary ", "").split().toString();
        reviewSummarysAll[1] = reviewSummarysAll[1].toString().replace("search_review_summary ", "").split().toString();
        return reviewSummarysAll;
    }
    static async pricesAll(){
        const pricesAll = await this.parseTheChildElementsUnlimitedForText('//*[@id="search_resultsRows"]/a/div[2]/div[4]/div[2]');
        return pricesAll;
    }
}

module.exports = InfoGrabber;
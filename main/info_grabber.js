const BasePage = require ('../main/basepage');
const Models = require ('../main/models');
const itemsCount = 2;
const firstModel = new Models;
const secondModel = new Models;

class InfoGrabber extends BasePage{

    static async namesAll(){
        const namesAll = await this.parseTheChildElementsForText('//*[@id="search_resultsRows"]', '//a', itemsCount, '//div[2]/div[1]/span');
        firstModel.nameInToInstance = namesAll[0];
        secondModel.nameInToInstance = namesAll[1];
        return namesAll;
    }
    static async platformsAll(){
        const platformsListAll = [];
        let counter = 1;
        while (counter <= itemsCount){
            const platformsList = await this.parseTheChildElementsUnlimited(`//*[@id="search_resultsRows"]/a[${counter}]/div[2]/div[1]/div`, '//span', 'class');
            platformsListAll.push(platformsList);
            counter += 1;
        }
        platformsListAll[0] = platformsListAll[0].toString().replace(/platform_img /g, "").split().toString();
        platformsListAll[1] = platformsListAll[1].toString().replace(/platform_img /g, "").split().toString();
        firstModel.platformsInToInstance = platformsListAll[0];
        secondModel.platformsInToInstance = platformsListAll[1];
    }
    static async releaseDatesAll(){
        const releaseDatesAll = await this.parseTheChildElementsForText('//*[@id="search_resultsRows"]', '//a', itemsCount, '//div[2]/div[2]');
        firstModel.releaseDateInToInstance = releaseDatesAll[0];
        secondModel.releaseDateInToInstance = releaseDatesAll[1];
    }
    static async reviewSummarysAll(){
        const reviewSummarysAll = await this.parseTheChildElements('//*[@id="search_resultsRows"]', '//a', itemsCount, '//div[2]/div[3]/span', 'class');
        reviewSummarysAll[0] = reviewSummarysAll[0].toString().replace("search_review_summary ", "").split().toString();
        reviewSummarysAll[1] = reviewSummarysAll[1].toString().replace("search_review_summary ", "").split().toString();
        firstModel.feedbackInToInstance = reviewSummarysAll[0];
        secondModel.feedbackInToInstance = reviewSummarysAll[1];
    }
    static async pricesAll(){
        const pricesAll = await this.parseTheChildElementsForText('//*[@id="search_resultsRows"]', '//a', itemsCount, '//div[2]/div[4]/div[2]');
        firstModel.priceInToInstance = pricesAll[0];
        secondModel.priceInToInstance = pricesAll[1];
    }
    static async getAllModels(){
        await this.namesAll(itemsCount);
        await this.platformsAll(itemsCount);
        await this.releaseDatesAll(itemsCount);
        await this.reviewSummarysAll(itemsCount);
        await this.pricesAll(itemsCount);
        const modelsList = [firstModel, secondModel]
        return modelsList
    }
}

module.exports = InfoGrabber;
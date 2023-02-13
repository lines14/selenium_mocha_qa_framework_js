const BasePage = require ('../main/basepage');
const Models = require ('../main/models');
const firstModel = new Models;
const secondModel = new Models;

class InfoGrabber extends BasePage{

    static async namesAll(){
        const twoNames = [];
        const namesAll = await this.parseTheChildElementsUnlimitedForText('//*[@id="search_resultsRows"]//a//div[2]/div[1]/span');
        firstModel.nameInToInstance = namesAll[0];
        secondModel.nameInToInstance = namesAll[1];
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
        firstModel.platformsInToInstance = platformsListAll[0];
        secondModel.platformsInToInstance = platformsListAll[1];
    }
    static async releaseDatesAll(){
        const releaseDatesAll = await this.parseTheChildElementsUnlimitedForText('//*[@id="search_resultsRows"]//a//div[2]/div[2]');
        firstModel.releaseDateInToInstance = releaseDatesAll[0];
        secondModel.releaseDateInToInstance = releaseDatesAll[1];
    }
    static async reviewSummarysAll(){
        const reviewSummarysAll = await this.parseTheChildElementsUnlimitedForAttr('//*[@id="search_resultsRows"]/a/div[2]/div[3]/span', 'class');
        reviewSummarysAll[0] = reviewSummarysAll[0].toString().replace("search_review_summary ", "").split().toString();
        reviewSummarysAll[1] = reviewSummarysAll[1].toString().replace("search_review_summary ", "").split().toString();
        firstModel.feedbackInToInstance = reviewSummarysAll[0];
        secondModel.feedbackInToInstance = reviewSummarysAll[1];
    }
    static async pricesAll(){
        const pricesAll = await this.parseTheChildElementsUnlimitedForText('//*[@id="search_resultsRows"]/a/div[2]/div[4]/div[2]');
        firstModel.priceInToInstance = pricesAll[0];
        secondModel.priceInToInstance = pricesAll[1];
    }
    static async getAllModels(){
        await this.namesAll();
        await this.platformsAll();
        await this.releaseDatesAll();
        await this.reviewSummarysAll();
        await this.pricesAll();

        const modelsList = [firstModel, secondModel]
        return modelsList
    }
}

module.exports = InfoGrabber;
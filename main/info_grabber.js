const BaseElement = require('../main/base_element');
const Models = require ('../main/models');

class InfoGrabber {
    constructor() {
        this.allNames = new BaseElement("//*[@id='search_resultsRows']//a//following-sibling::span[@class='title']", 'all names in list');
        this.allPlatforms = new BaseElement("//*[@id='search_resultsRows']//a", 'all platforms in list');
        this.allDates = new BaseElement("//*[@id='search_resultsRows']//a//following-sibling::span[@class='search_released']", 'all dates in list');
        this.allSummaries = new BaseElement("//*[@id='search_resultsRows']/a/div[2]/div[3]/span", 'all summaries in list');
        this.allPrices = new BaseElement("//*[@id='search_resultsRows']//a//following-sibling::div[@class='search_price']", 'all prices in list');
    }
    async namesAll() {
        const twoNames = [];
        const namesAll = await this.allNames.parseChildrenForText();
        twoNames.push(namesAll[0]);
        twoNames.push(namesAll[1]);
        return twoNames;
    }
    async platformsAll() {
        const platformsListAll = await this.allPlatforms.parseChildrenByCounter('class');
        platformsListAll[0] = platformsListAll[0].toString().replace(/platform_img /g, "").split().toString();
        platformsListAll[1] = platformsListAll[1].toString().replace(/platform_img /g, "").split().toString();
        return platformsListAll;
    }
    async releaseDatesAll() {
        const releaseDatesAll = await this.allDates.parseChildrenForText();
        return releaseDatesAll;
    }
    async reviewSummarysAll() {
        const reviewSummarysAll = await this.allSummaries.parseChildrenForAttr('class');
        reviewSummarysAll[0] = reviewSummarysAll[0].toString().replace("search_review_summary ", "").split().toString();
        reviewSummarysAll[1] = reviewSummarysAll[1].toString().replace("search_review_summary ", "").split().toString();
        return reviewSummarysAll;
    }
    async pricesAll() {
        const pricesAll = await this.allPrices.parseChildrenForText();
        return pricesAll;
    }
    async modelsCreator() {
        const firstModel = new Models();
        const secondModel = new Models();

        const platformsListAll = await this.platformsAll()
        firstModel.platforms = platformsListAll[0];
        secondModel.platforms = platformsListAll[1];

        const releaseDatesAll = await this.releaseDatesAll()
        firstModel.releaseDate = releaseDatesAll[0];
        secondModel.releaseDate = releaseDatesAll[1];

        const reviewSummarysAll = await this.reviewSummarysAll()
        firstModel.feedback = reviewSummarysAll[0];
        secondModel.feedback = reviewSummarysAll[1];

        const pricesAll = await this.pricesAll()
        firstModel.price = pricesAll[0];
        secondModel.price = pricesAll[1];

        const twoNames = await this.namesAll();
        firstModel.name = twoNames[0];
        secondModel.name = twoNames[1];

        const modelsList = [JSON.stringify(firstModel), JSON.stringify(secondModel)];
        return modelsList;
    }
}

module.exports = new InfoGrabber();
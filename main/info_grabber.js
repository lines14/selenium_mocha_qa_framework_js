const BasePage = require ('../main/basepage');
const Models = require ('../main/models');

class InfoGrabber extends BasePage{

    static async namesAll(){
        const twoNames = [];
        const namesAll = await this.parseTheChildElementsUnlimitedForText("//*[@id='search_resultsRows']//a//following-sibling::span[@class='title']");
        twoNames.push(namesAll[0]);
        twoNames.push(namesAll[1]);
        return twoNames;
    }
    static async platformsAll(){
        const itemsCount = 2;
        const platformsListAll = [];
        let counter = 1;
        while (counter <= itemsCount){
            const platformsList = await this.parseTheChildElementsUnlimitedByCounter(`//*[@id="search_resultsRows"]//a[${counter}]//following-sibling::span[@class='platform_img']`, 'class');
            platformsListAll.push(platformsList);
            counter += 1;
        }
        platformsListAll[0] = platformsListAll[0].toString().replace(/platform_img /g, "").split().toString();
        platformsListAll[1] = platformsListAll[1].toString().replace(/platform_img /g, "").split().toString();
        return platformsListAll;
    }
    static async releaseDatesAll(){
        const releaseDatesAll = await this.parseTheChildElementsUnlimitedForText("//*[@id='search_resultsRows']//a//following-sibling::span[@class='search_released']");
        return releaseDatesAll;
    }
    static async reviewSummarysAll(){
        const reviewSummarysAll = await this.parseTheChildElementsUnlimitedForAttr("//*[@id='search_resultsRows']/a/div[2]/div[3]/span", 'class');
        reviewSummarysAll[0] = reviewSummarysAll[0].toString().replace("search_review_summary ", "").split().toString();
        reviewSummarysAll[1] = reviewSummarysAll[1].toString().replace("search_review_summary ", "").split().toString();
        return reviewSummarysAll;
    }
    static async pricesAll(){
        const pricesAll = await this.parseTheChildElementsUnlimitedForText("//*[@id='search_resultsRows']//a//following-sibling::div[@class='search_price']");
        return pricesAll;
    }
    static async modelsCreator(){
        const firstModel = new Models();
        const secondModel = new Models();

        const platformsListAll = await InfoGrabber.platformsAll()
        firstModel.platforms = platformsListAll[0];
        secondModel.platforms = platformsListAll[1];

        const releaseDatesAll = await InfoGrabber.releaseDatesAll()
        firstModel.releaseDate = releaseDatesAll[0];
        secondModel.releaseDate = releaseDatesAll[1];

        const reviewSummarysAll = await InfoGrabber.reviewSummarysAll()
        firstModel.feedback = reviewSummarysAll[0];
        secondModel.feedback = reviewSummarysAll[1];

        const pricesAll = await InfoGrabber.pricesAll()
        firstModel.price = pricesAll[0];
        secondModel.price = pricesAll[1];

        const twoNames = await InfoGrabber.namesAll();
        firstModel.name = twoNames[0];
        secondModel.name = twoNames[1];

        const modelsList = [JSON.stringify(firstModel), JSON.stringify(secondModel)];
        return modelsList;
    }
}

module.exports = InfoGrabber;
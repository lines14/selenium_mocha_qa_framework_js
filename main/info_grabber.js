const fs = require('fs');
const BasePage = require ('../main/basepage');
const itemsCount = 2;

class InfoGrabber extends BasePage{

    static async namesAll(){
        const namesAll = await this.parseTheChildElementsForText('//*[@id="search_resultsRows"]', '//a', itemsCount, '//div[2]/div[1]/span');
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
        return platformsListAll;
    }
    static async releaseDatesAll(){
        const releaseDatesAll = await this.parseTheChildElementsForText('//*[@id="search_resultsRows"]', '//a', itemsCount, '//div[2]/div[2]');
        return releaseDatesAll;
    }
    static async reviewSummarysAll(){
        const reviewSummarysAll = await this.parseTheChildElements('//*[@id="search_resultsRows"]', '//a', itemsCount, '//div[2]/div[3]/span', 'class');
        return reviewSummarysAll;
    }
    static async pricesAll(){
        const pricesAll = await this.parseTheChildElementsForText('//*[@id="search_resultsRows"]', '//a', itemsCount, '//div[2]/div[4]/div[2]');
        return pricesAll;
    }
    static async combineAllData(){
        const firstItem = [];
        const secondItem = [];
        let counter = 0;
        const dict = {};

        const names = await this.namesAll(itemsCount);
        const platforms = await this.platformsAll(itemsCount);
        const dates = await this.releaseDatesAll(itemsCount);
        const reviews = await this.reviewSummarysAll(itemsCount);
        const prices = await this.pricesAll(itemsCount);

        while (counter < itemsCount){
            if (counter === 0){
                firstItem.push(names[counter]);
                firstItem.push(platforms[counter].toString().replace(/platform_img /g, "").split());
                firstItem.push(dates[counter].toString().replace(",", "").split());
                firstItem.push(reviews[counter].toString().replace("search_review_summary ", "").split());
                firstItem.push(prices[counter]);
            } else {
                secondItem.push(names[counter]);
                secondItem.push(platforms[counter].toString().replace(/platform_img /g, "").split());
                secondItem.push(dates[counter].toString().replace(",", "").split());
                secondItem.push(reviews[counter].toString().replace("search_review_summary ", "").split());
                secondItem.push(prices[counter]);
            }
            counter += 1;
        }

        Object.assign(dict, {"firstItem":firstItem.toString(), "secondItem":secondItem.toString()})
        return dict;
    }
    static async saveDataToFile(){
        const jsonString = JSON.stringify(await this.combineAllData());

        fs.writeFile(`${__dirname}/saved_data.json`, jsonString, err => {
            if (err) {
                console.log('\tError writing file', err)
            } else {
                console.log('\tSuccessfully wrote file ./main/saved_data.json')
            }
        })
    }        
}

module.exports = InfoGrabber;
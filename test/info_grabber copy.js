const fs = require('fs');
var Base = require ('../main/base');
const resultpage = require('../main/resultpage');

class InfoGrabber extends Base{

    constructor(){
        super();
        let itemsCount = 2;
        global.itemsCount = itemsCount;
    }
    async namesAll(){
        let namesAll = await resultpage.parseChildElementsForText('//*[@id="search_resultsRows"]', '//a', itemsCount, '//div[2]/div[1]/span');
        return namesAll;
    }
    async platformsAll(){
        let platformsListAll = [];
        let counter = 1;
        while (counter <= itemsCount){
            let platformsList = await resultpage.parseChildElementsUnlimited(`//*[@id="search_resultsRows"]/a[${counter}]/div[2]/div[1]/div`, '//span', 'class');
            platformsListAll.push(platformsList);
            counter += 1;
        }
        return platformsListAll;
    }
    async releaseDatesAll(){
        let releaseDatesAll = await resultpage.parseChildElementsForText('//*[@id="search_resultsRows"]', '//a', itemsCount, '//div[2]/div[2]');
        return releaseDatesAll;
    }
    async reviewSummarysAll(){
        let reviewSummarysAll = await resultpage.parseChildElements('//*[@id="search_resultsRows"]', '//a', itemsCount, '//div[2]/div[3]/span', 'class');
        return reviewSummarysAll;
    }
    async pricesAll(){
        let pricesAll = await resultpage.parseChildElementsForText('//*[@id="search_resultsRows"]', '//a', itemsCount, '//div[2]/div[4]/div[2]');
        return pricesAll;
    }
    async saveDataToFile(fileNumber){
        let firstItem = [];
        let secondItem = [];
        let counter = 0;
        let dict = {};

        let names = await this.namesAll(itemsCount);
        let platforms = await this.platformsAll(itemsCount);
        let dates = await this.releaseDatesAll(itemsCount);
        let reviews = await this.reviewSummarysAll(itemsCount);
        let prices = await this.pricesAll(itemsCount);

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

        Promise.all([firstItem, secondItem]).then(function(values) {
            
            Object.assign(dict, {"firstItem":values[0].toString(), "secondItem":values[1].toString()})
            let jsonString = JSON.stringify(dict);

            fs.writeFile(`${__dirname}/saved_data${fileNumber}.json`, jsonString, err => {
                if (err) {
                    console.log('\tError writing file', err)
                } else {
                    console.log('\tSuccessfully wrote file ./main/saved_data.json')
                }
            })
        })

        // await (function delay(ms) {
        //     return new Promise(resolve => setTimeout(resolve, ms));
        // })(5000);
    }
        
}

module.exports = new InfoGrabber();
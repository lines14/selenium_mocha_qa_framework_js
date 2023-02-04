const fs = require('fs');
var list = [['kek', 'kak'], 'kok'];

function keker(){
    var list = ['kek', 'kok'];
    let firstItem = [];
    let secondItem = [];
    let counter = 0;
    let dict = {};

    while (counter < 2){
        if (counter === 1){
            firstItem.push(list[counter]);
        } else {
            secondItem.push(list[counter].toString().replace("the", "").split());
        }
        counter += 1;
    }
    console.log(firstItem)
    console.log(secondItem)


    Object.assign(dict, {"firstItem":firstItem.toString(), "secondItem":secondItem.toString()})
    let jsonString = JSON.stringify(dict);
    console.log(jsonString)


    // fs.writeFile(`${__dirname}/saved_data.json`, jsonString, err => {
    //     if (err) {
    //         console.log('Error writing file', err)
    //     } else {
    //         console.log('Successfully wrote file')
    //     }
    // })
}

keker()



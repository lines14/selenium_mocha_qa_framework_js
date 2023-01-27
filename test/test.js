// to run the test you may execute console command "npm test" if preinstalled "mocha", "chai" and "js-yaml" modules

const listOfSets = ['regular_users','admin_users'];

for (i in listOfSets) {
    const X = listOfSets[i];

    const chai = require('chai');
    const yaml = require('js-yaml');
    const fs = require('fs');

    const jsonFile = require(`/home/lines14/projects/a.lipatov/test/test data/${X}.json`);

    const fileContents = fs.readFileSync(`/home/lines14/projects/a.lipatov/test/test data/${X}.yaml`, 'utf8');
    const yamlFile = yaml.load(fileContents);

    describe('Validate user files:', function () {
        it(`${X}.json contains array of users. User has id, name and may have adress`, function () {
            chai.expect(jsonFile[0]).to.deep.include.all.keys(['id', 'name']);
        });
        it(`${X}.yaml contains array of users. User has id, name and may have adress`, function () {
            chai.expect(yamlFile[0]).to.deep.include.all.keys(['id', 'name']);
        });
        it(`all users listed in ${X}.json are included in ${X}.yaml`, function () {
            let yamlFileIds = [];
            let jsonFileIds = [];
            for (i in yamlFile) {
                for (j in yamlFile[i]) {
                    if (typeof yamlFile[i][j] == 'number') {
                        yamlFileIds.push(yamlFile[i][j])
                    };
                };
            };
            for (i in jsonFile) {
                for (j in jsonFile[i]) {
                    if (typeof jsonFile[i][j] == 'number') {
                        jsonFileIds.push(jsonFile[i][j])
                    };
                };
            };
            chai.assert.includeDeepMembers(yamlFileIds, jsonFileIds);
        });
    });
};


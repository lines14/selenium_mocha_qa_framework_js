const Employee = require ('./employee');

class ModelsGenerator {
    async modelsGenerator(dataSet, totalCount) {
        if (totalCount !== 1) {
            console.log('    ▶ check data in table')
        }
        let counter = 0;
        const employeesList = [];
        while (counter < totalCount) {
            const employee = new Employee();
            employee.firstName = dataSet[counter][0];
            employee.lastName = dataSet[counter][1];
            employee.age = dataSet[counter][2];
            employee.email = dataSet[counter][3];
            employee.salary = dataSet[counter][4];
            employee.department = dataSet[counter][5];
            employeesList.push(employee);
            counter += 1;
        }
        const strEmployeesList = employeesList.map(element => JSON.stringify(element));
        return strEmployeesList;
    }
}

module.exports = new ModelsGenerator();
//import cityList from './cities';

const faker = require("faker")
const fs = require("fs")

faker.locale = 'vi'

const randomStudentList = (cityList, numberOfStudents) => {
    if (numberOfStudents <= 0) return [];

    const studentList = [];

    // random data
    for (const city of cityList) {
        Array.from(new Array(numberOfStudents)).forEach(() => {
            const student = {
                id: faker.random.uuid(),
                name: faker.name.findName(),
                age: faker.datatype.number({ 'min': 18, 'max': 25 }),
                mark: faker.datatype.number({ 'min': 0, 'max': 10 }),
                gender: faker.name.gender(true),
                createdAt: Date.now(),
                updatedAt: Date.now(),
                city: city.code,
            };

            studentList.push(student);
        });
    }

    return studentList;
};

// IFFE
(() => {
    // random data
    //const cityList = JSON.parse('./cities.json')
    var cityList = JSON.parse(fs.readFileSync('cities.json', 'utf8'));
    const studentList = randomStudentList(cityList, 100);

    // prepare db object
    const db = [...studentList];

    // write db object to db.json
    fs.writeFile("students.json", JSON.stringify(db), () => {
        console.log("Generate data successfully");
    });
})();


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

const randomProductList = (numberOfProducts) => {
    if (numberOfProducts <= 0) return [];

    const productList = [];

    // random data
    Array.from(new Array(numberOfProducts)).forEach(() => {
        const product = {
            id: faker.random.uuid(),
            image: faker.image.technics(),
            name: faker.commerce.productName(),
            rate: faker.datatype.number({ 'min': 0, 'max': 5 }),
            price: faker.commerce.price(),
            discount: faker.datatype.number({ 'min': 0, 'max': 100 }),
            sold: faker.datatype.number({ 'min': 0, 'max': 100 }),
        };

        productList.push(product);
    });

    return productList;
};

// IFFE
// (() => {
//     // random data
//     //const cityList = JSON.parse('./cities.json')
//     var cityList = JSON.parse(fs.readFileSync('cities.json', 'utf8'));
//     var studentList = JSON.parse(fs.readFileSync('students.json', 'utf8'));
//     const productList = randomProductList(100);

//     // prepare db object
//     const db = {
//         cities: cityList,
//         students: studentList,
//         products: productList,
//     }

//     // write db object to db.json
//     fs.writeFile("db.json", JSON.stringify(db), () => {
//         console.log("Generate data successfully");
//     });
// })();

(() => {
    const productList = randomProductList(100);

    // prepare db object
    const db = {
        products: productList,
    }

    // write db object to db.json
    fs.writeFile("products.json", JSON.stringify(db), () => {
        console.log("Generate data successfully");
    });
})();

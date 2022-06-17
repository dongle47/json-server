const faker = require('faker')
const fs = require('fs')

faker.locale = 'vi'

const randomCategoryList = (n) => {
    if (n <= 0) {
        return []
    }
    const citiesList = []

    Array.from(new Array(n)).forEach(() => {
        const cities = {
            id: faker.datatype.uuid(),
            name: faker.commerce.department(),
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
        categoryList.push(cities)
    })
    return citiesList
}

(() => {
    const citiesList = randomcitiesList(4)
    const db = {
        categories: citiesList,
        products: [],
        profile: {
            name: "Po",
        }
    }
    fs.writeFile('db.json', JSON.stringify(db), () => {
        console.log("Generate data successfully =)))");
    });
})()
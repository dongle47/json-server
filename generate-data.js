
const faker = require("faker")
const fs = require("fs")

faker.locale = 'vi'

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function formatDate(date) {
    return [
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
        date.getFullYear(),
    ].join('/');
}

const imgRandom = [
    faker.image.abstract(),
    faker.image.animals(),
    faker.image.cats(),
    faker.image.city(),
    faker.image.fashion(),
    faker.image.food(),
    faker.image.nature(),
    faker.image.nightlife(),
    faker.image.transport(),
    faker.image.technics(),
    faker.image.sports(),
    faker.image.people(),
]

const ramdomImgList = (n) => {
    var imgList = []
    for (let i = 0; i < n; i++) {
        imgList.push(imgRandom[faker.datatype.number({ 'min': 0, 'max': 11 })])
    }
    return imgList
}

const randomProductList = (numberOfProducts) => {
    if (numberOfProducts <= 0) return [];

    const productList = [];

    const country = ['Việt Nam', 'Mỹ', 'Thái Lan']

    var detailProduct = () => {

        return {
            images: ramdomImgList(faker.datatype.number({ 'min': 3, 'max': 10 })),
            specifications: [
                {
                    name: 'origins',
                    display: 'Xuất xứ',
                    value: country[faker.datatype.number({ 'min': 0, 'max': 2 })]
                },
            ],
            description: faker.random.words(faker.datatype.number({ 'min': 30, 'max': 500 }))
        }
    }

    // random data
    Array.from(new Array(numberOfProducts)).forEach(() => {
        const product = {
            id: faker.datatype.uuid(),
            image: imgRandom[faker.datatype.number({ 'min': 0, 'max': 11 })],
            name: faker.commerce.productName(),
            rate: faker.datatype.number({ 'min': 0, 'max': 5 }),
            price: faker.datatype.number({ 'min': 1000, 'max': 10000000 }),
            discount: faker.datatype.number({ 'min': 0, 'max': 100 }),
            sold: faker.datatype.number({ 'min': 0, 'max': 100 }),
            details: detailProduct()
        };

        productList.push(product);
    });

    return productList;
};

const randomNotificationList = (numberOfNotifications) => {
    if (numberOfNotifications <= 0) return [];

    const typeNotification = [
        {
            id: 1,
            name: 'discount'
        },
        {
            id: 2,
            name: 'order'
        },
        {
            id: 3,
            name: 'system'
        }
    ]
    const notificationList = [];

    // random data
    Array.from(new Array(numberOfNotifications)).forEach(() => {
        const notification = {
            id: faker.random.uuid(),
            date: formatDate(faker.date.between('2020-01-01', '2022-01-01')),
            text: faker.random.words(faker.datatype.number({ 'min': 30, 'max': 60 })),
            type: typeNotification[faker.datatype.number({ 'min': 0, 'max': 2 })].name,
            link: ''
        };
        notificationList.push(notification);
    });

    return notificationList;
};

(() => {
    // var productList = JSON.parse(fs.readFileSync('./static-data/products.json', 'utf8'));
    var productList = randomProductList(100);

    const db = {
        products: productList,

    }

    fs.writeFile("db.json", JSON.stringify(db), () => {
        console.log("Generate data successfully");
    });
})();


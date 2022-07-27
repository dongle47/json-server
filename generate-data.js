
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

const randomCouponList = (numberOfCoupon) => {
    if (numberOfCoupon <= 0) return [];

    const imageLink = [
        'https://salt.tikicdn.com/cache/128x128/ts/upload/92/ad/57/0d9a096885400b7b4752b67afdc72898.png',
        'https://vcdn.tikicdn.com/cache/128x128/ts/seller/4f/bb/60/2797e4e553ea5b4e9b4f93ad63ccc110.jpg',
        'https://vcdn.tikicdn.com/cache/128x128/ts/seller/c2/61/91/6c9f5ffdc717a12ddbc00ba810f640af.jpg',
        'https://vcdn.tikicdn.com/cache/128x128/ts/seller/df/75/06/1079e41dccd9ca93b2ff28c40171e66a.jpg',
        'https://vcdn.tikicdn.com/cache/128x128/ts/seller/b4/11/e9/a70b080cf3c808d5812df2f52a5483ad.jpg',
        'https://vcdn.tikicdn.com/cache/128x128/ts/seller/7e/9f/64/e846fe20e9700e4404c06b6917bf66f4.jpg',
        'https://vcdn.tikicdn.com/cache/128x128/ts/seller/0a/9d/2a/543b4485d46bbdfe088312aee042da44.jpg',
    ]

    const couponList = [];

    // random data
    Array.from(new Array(numberOfCoupon)).forEach(() => {
        const coupon = {
            id: faker.random.uuid(),
            publisher: faker.company.companyName(),
            title: faker.random.words(faker.datatype.number({ 'min': 2, 'max': 4 })),
            subtitle: faker.random.words[faker.datatype.number({ 'min': 5, 'max': 10 })],
            expired: formatDate(faker.date.between('2020-01-01', '2022-01-01')),
            image: imageLink[faker.datatype.number({ 'min': 0, 'max': 6 })],
            link: ''

        };
        couponList.push(coupon);
    });

    return couponList;
};

const randomMyReviewList = (numberOfReview) => {
    if (numberOfReview <= 0) return [];

    const reviewList = [];

    // random data
    Array.from(new Array(numberOfReview)).forEach(() => {

        const randomImgList = (n) => {
            const imgList = []
            for (let i = 0; i < n; i++) {
                imgList.push(faker.image.abstract())
            }
            return imgList
        }

        const review = {
            id: faker.random.uuid(),
            productName: faker.commerce.productName(),
            productImg: faker.image.technics(),
            storeName: faker.company.companyName(),
            rating: faker.datatype.number({ 'min': 0, 'max': 5 }),
            content: faker.lorem.paragraph(),
            imgRate: randomImgList(faker.datatype.number({ 'min': 0, 'max': 5 }))

        };
        reviewList.push(review);
    });

    return reviewList;
};

const randomMyOrderList = (numberOfOrder) => {
    if (numberOfOrder <= 0) return [];

    const orderType = [
        {
            id: 1,
            name: 'Chờ thanh toán'
        },
        {
            id: 2,
            name: 'Đang xử lý'
        },
        {
            id: 3,
            name: 'Đang vận chuyển'
        },
        {
            id: 4,
            name: 'Đã giao'
        },
        {
            id: 5,
            name: 'Đã hủy'
        },
    ]

    const orderList = [];

    // random data
    Array.from(new Array(numberOfOrder)).forEach(() => {

        const order = {
            id: faker.random.uuid(),
            type: orderType[faker.datatype.number({ 'min': 0, 'max': 4 })],
            totalPrice: faker.datatype.number({ 'min': 100000, 'max': 10000000 }),
            products: randomProductList(faker.datatype.number({ 'min': 1, 'max': 5 }))

        };
        orderList.push(order);
    });

    return orderList;
};




(() => {

    const productList = randomProductList(100);

    const notificationList = randomNotificationList(30)

    const couponList = randomCouponList(40)

    const myReviewList = randomMyReviewList(10)

    const myOrderList = randomMyOrderList(10)

    const db = {
        products: productList,
        notifications: notificationList,
        coupons: couponList,
        myReview: myReviewList,
        myOrder: myOrderList,

    }

    fs.writeFile("db.json", JSON.stringify(db), () => {
        console.log("Generate data successfully");
    });
})();




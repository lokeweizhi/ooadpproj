// models/profileModel.js
var myDatabase = require('../controllers/database');
var sequelize = myDatabase.sequelize;
var Sequelize = myDatabase.Sequelize;

const Profile = sequelize.define('Profile', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    created: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    buyerOrSeller: {
        type: Sequelize.STRING,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        trim: true
    },
    content: {
        type: Sequelize.STRING,
        defaultValue: '',
        trim: true
    },
    serviceRating: { //as seller
        type: Sequelize.INTEGER,
    },
    priceRating: { // as seller
        type: Sequelize.INTEGER
    },
    buyerRating: {
        type: Sequelize.INTEGER
    },
    by: {
        type:Sequelize.STRING,
    },
    targetUsername: {
        type:Sequelize.STRING,
    },
    transactionId:{
        type: Sequelize.INTEGER
    }
    // user_id:{
    //     type: Sequelize.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: 'Users',
    //         key: 'id'
    //     }
    // }
});

// force: true will drop the table if it already exists
Profile.sync({ force: false, logging: console.log}).then(() => {
    // Table created
    console.log("profile table synced");
    Profile.upsert({
        id: 1,
        created: 'Sat Aug 04 2018 18:20:52 GMT+0800 (Malay Peninsula Standard Time)',
        buyerOrSeller: "Buyer",
        title: "Nice Purchase!",
        content: 'Bought many TYS textbooks beacuse the seller sells at a resonable price!',
        serviceRating: 5,
        priceRating: 5,
        buyerRating: 0,
        by: "JohannaJimeno",
        targetUsername: "linpeishan",
        transactionId: 1
    }),
    Profile.upsert({
        id: 2,
        created: 'Sun Aug 05 2018 17:19:50 GMT+0800 (Malay Peninsula Standard Time)',
        buyerOrSeller: "Seller",
        title: "Punctual Payment!",
        content: 'Receive my money on time.',
        serviceRating: 0,
        priceRating: 0,
        buyerRating: 5,
        by: "leeshangji",
        targetUsername: "linpeishan",
        transactionId: 2
    }),
    Profile.upsert({
        id: 3,
        created: 'Sat Aug 18 2018 12:19:00 GMT+0800 (Malay Peninsula Standard Time)',
        buyerOrSeller: "Buyer",
        title: "Love how the books are sold at a bargain price!",
        content: 'As stated on the price, I am impressed by its quality despite being dirt cheap.',
        serviceRating: 5,
        priceRating: 5,
        buyerRating: 0,
        by: "benjaminloke",
        targetUsername: "linpeishan",
        transactionId: 3
    }),
    Profile.upsert({
        id: 4,
        created: 'Sat Aug 04 2018 18:19:52 GMT+0800 (Malay Peninsula Standard Time)',
        buyerOrSeller: "Buyer",
        title: "Yayyyy!",
        content: 'Excited to buy from this seller again.',
        serviceRating: 5,
        priceRating: 5,
        buyerRating: 0,
        by: "JohannaJimeno",
        targetUsername: "linpeishan",
        transactionId: 4
    }),
    Profile.upsert({
        id: 5,
        created: 'Fri Aug 03 2018 20:19:52 GMT+0800 (Malay Peninsula Standard Time)',
        buyerOrSeller: "Buyer",
        title: "Cool",
        content: 'Excited to buy from this seller again.',
        serviceRating: 5,
        priceRating: 5,
        buyerRating: 0,
        by: "leeshangji",
        targetUsername: "linpeishan",
        transactionId: 5
    }),
    Profile.upsert({
        id: 6,
        created: 'Sat Aug 04 2018 18:19:52 GMT+0800 (Malay Peninsula Standard Time)',
        buyerOrSeller: "Buyer",
        title: "Friendly seller",
        content: 'I delayed the payment data by accident and the seller waited patiently for my updates.',
        serviceRating: 5,
        priceRating: 5,
        buyerRating: 0,
        by: "benjaminloke",
        targetUsername: "linpeishan",
        transactionId: 6
    })
    Profile.upsert({
        id: 7,
        created: 'Sat Aug 04 2018 18:19:52 GMT+0800 (Malay Peninsula Standard Time)',
        buyerOrSeller: "Buyer",
        title: "Fantastic purchase",
        content: 'Service was good but I feel that the price could be lower.',
        serviceRating: 5,
        priceRating: 5,
        buyerRating: 0,
        by: "linpeishan",
        targetUsername: "leeshangji",
        transactionId: 2
    })
    // Profile.upsert({
    //     id: 7,
    //     created: 'Sat Aug 04 2018 18:19:52 GMT+0800 (Malay Peninsula Standard Time)',
    //     buyerOrSeller: "Buyer",
    //     title: "Rudest seller ever",
    //     content: 'I was shocked to find out that she has high rating in her page. ',
    //     serviceRating: 1,
    //     priceRating: 1,
    //     buyerRating: 0,
    //     by: "benjaminloke",
    //     targetUsername: "linpeishan",
    //     transactionId: 7
    // }),
    // Profile.upsert({
    //     id: 8,
    //     created: 'Sat Aug 04 2018 18:19:52 GMT+0800 (Malay Peninsula Standard Time)',
    //     buyerOrSeller: "Buyer",
    //     title: "Friendly seller",
    //     content: 'I delayed the payment data by accident and the seller waited patiently for my updates.',
    //     serviceRating: 5,
    //     priceRating: 5,
    //     buyerRating: 0,
    //     by: "leeshangji",
    //     targetUsername: "benjaminloke",
    //     transactionId: 8
    // }),
    // Profile.upsert({
    //     id: 9,
    //     created: 'Sat Aug 04 2018 18:19:52 GMT+0800 (Malay Peninsula Standard Time)',
    //     buyerOrSeller: "Buyer",
    //     title: "Friendly seller",
    //     content: 'I delayed the payment data by accident and the seller waited patiently for my updates.',
    //     serviceRating: 5,
    //     priceRating: 5,
    //     buyerRating: 0,
    //     by: "leeshangji",
    //     targetUsername: "benjaminloke",
    //     transactionId: 9
    // }),
    // Profile.upsert({
    //     id: 10,
    //     created: 'Sat Aug 04 2018 18:19:52 GMT+0800 (Malay Peninsula Standard Time)',
    //     buyerOrSeller: "Buyer",
    //     title: "Friendly seller",
    //     content: 'I delayed the payment data by accident and the seller waited patiently for my updates.',
    //     serviceRating: 5,
    //     priceRating: 5,
    //     buyerRating: 0,
    //     by: "leeshangji",
    //     targetUsername: "benjaminloke",
    //     transactionId: 10
    // }),
    // Profile.upsert({
    //     id: 11,
    //     created: 'Sat Aug 04 2018 18:19:52 GMT+0800 (Malay Peninsula Standard Time)',
    //     buyerOrSeller: "Buyer",
    //     title: "Friendly seller",
    //     content: 'I delayed the payment data by accident and the seller waited patiently for my updates.',
    //     serviceRating: 5,
    //     priceRating: 5,
    //     buyerRating: 0,
    //     by: "leeshangji",
    //     targetUsername: "benjaminloke",
    //     transactionId: 11
    // }),
    // Profile.upsert({
    //     id: 12,
    //     created: 'Sat Aug 04 2018 18:19:52 GMT+0800 (Malay Peninsula Standard Time)',
    //     buyerOrSeller: "Buyer",
    //     title: "Meh purchase",
    //     content: 'Service was good but I feel that the price could be lower.',
    //     serviceRating: 4,
    //     priceRating: 4,
    //     buyerRating: 0,
    //     by: "benjaminloke",
    //     targetUsername: "leeshangji",
    //     transactionId: 12
    // }),
    // Profile.upsert({
    //     id: 13,
    //     created: 'Sat Aug 04 2018 18:19:52 GMT+0800 (Malay Peninsula Standard Time)',
    //     buyerOrSeller: "Buyer",
    //     title: "Meh purchase",
    //     content: 'Service was good but I feel that the price could be lower.',
    //     serviceRating: 4,
    //     priceRating: 4,
    //     buyerRating: 0,
    //     by: "benjaminloke",
    //     targetUsername: "leeshangji",
    //     transactionId: 13
    // }),
    // Profile.upsert({
    //     id: 14,
    //     created: 'Sat Aug 04 2018 18:19:52 GMT+0800 (Malay Peninsula Standard Time)',
    //     buyerOrSeller: "Buyer",
    //     title: "Meh purchase",
    //     content: 'Service was good but I feel that the price could be lower.',
    //     serviceRating: 4,
    //     priceRating: 4,
    //     buyerRating: 0,
    //     by: "benjaminloke",
    //     targetUsername: "leeshangji",
    //     transactionId: 14
    // }),
    // Profile.upsert({
    //     id: 15,
    //     created: 'Sat Aug 04 2018 18:19:52 GMT+0800 (Malay Peninsula Standard Time)',
    //     buyerOrSeller: "Buyer",
    //     title: "Meh purchase",
    //     content: 'Service was good but I feel that the price could be lower.',
    //     serviceRating: 4,
    //     priceRating: 4,
    //     buyerRating: 0,
    //     by: "benjaminloke",
    //     targetUsername: "leeshangji",
    //     transactionId: 15
    // }),
    // Profile.upsert({
    //     id: 16,
    //     created: 'Sat Aug 04 2018 18:19:52 GMT+0800 (Malay Peninsula Standard Time)',
    //     buyerOrSeller: "Buyer",
    //     title: "Meh purchase",
    //     content: 'Service was good but I feel that the price could be lower.',
    //     serviceRating: 4,
    //     priceRating: 4,
    //     buyerRating: 0,
    //     by: "benjaminloke",
    //     targetUsername: "leeshangji",
    //     transactionId: 16
    // })
});
//Sat Aug 04 2018 18:19:52 GMT+0800 (Malay Peninsula Standard Time)

module.exports = sequelize.model('Profile', Profile);
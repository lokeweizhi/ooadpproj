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
        created: 'Sat Aug 04 2018 18:19:52 GMT+0800 (Malay Peninsula Standard Time)',
        buyerOrSeller: "Buyer",
        title: "Nice Purchase!",
        content: 'Bought many TYS textbooks beacuse the seller sells at a resonable price!',
        serviceRating: 5,
        priceRating: 5,
        buyerRating: 0,
        by: "linpeishan",
        targetUsername: "JohannaJimeno"
    }),
    Profile.upsert({
        id: 2,
        created: 'Sat Aug 04 2018 18:19:52 GMT+0800 (Malay Peninsula Standard Time)',
        buyerOrSeller: "Buyer",
        title: "Unreasonable seller!",
        content: 'Was told that the books are brand new but it is obviously used. I am utterly disappointed with the seller.',
        serviceRating: 1,
        priceRating: 1,
        buyerRating: 0,
        by: "JohannaJimeno",
        targetUsername: "linpeishan"
    }),
    Profile.upsert({
        id: 3,
        created: 'Sat Aug 04 2018 18:19:52 GMT+0800 (Malay Peninsula Standard Time)',
        buyerOrSeller: "Buyer",
        title: "Friendly seller",
        content: 'I delayed the payment data by accident and the seller waited patiently for my updates.',
        serviceRating: 5,
        priceRating: 4,
        buyerRating: 0,
        by: "leeshangji",
        targetUsername: "benjaminloke"
    }),
    Profile.upsert({
        id: 4,
        created: 'Sat Aug 04 2018 18:19:52 GMT+0800 (Malay Peninsula Standard Time)',
        buyerOrSeller: "Buyer",
        title: "Meh purchase",
        content: 'Service was good but I feel that the price could be lower.',
        serviceRating: 5,
        priceRating: 2,
        buyerRating: 0,
        by: "benjaminloke",
        targetUsername: "leeshangji"
    }),
    Profile.upsert({
        id: 5,
        created: 'Sat Aug 04 2018 18:19:52 GMT+0800 (Malay Peninsula Standard Time)',
        buyerOrSeller: "Buyer",
        title: "Rudest seller ever",
        content: 'I was shocked to find out that she has high rating in her page. ',
        serviceRating: 5,
        priceRating: 5,
        buyerRating: 0,
        by: "benjaminloke",
        targetUsername: "linpeishan"
    });
});
//Sat Aug 04 2018 18:19:52 GMT+0800 (Malay Peninsula Standard Time)

module.exports = sequelize.model('Profile', Profile);
// models/offers.js
var myDatabase = require('../controllers/database');
var sequelize = myDatabase.sequelize;
var Sequelize = myDatabase.Sequelize;

const OffersModel = sequelize.define('Offers', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    sellerUsername: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.DECIMAL
    },
    listingTitle: {
        type: Sequelize.STRING
    },
    buyerUsername: {
        type: Sequelize.STRING
    },
});

OffersModel.sync({ force: false, logging: console.log}).then(() => {
    console.log("Offers table synced");
    OffersModel.upsert({
        id:1,
        sellerUsername: "benjaminloke",
        price: 5,
        listingTitle: "2017 N Level Practice Book",
        buyerUsername: "johannajimeno",
    });
    OffersModel.upsert({
        id:2,
        sellerUsername: "benjaminloke",
        price: 6,
        listingTitle: "2016 A Level TextBook",
        buyerUsername: "leeshangji",
    });
    OffersModel.upsert({
        id:3,
        sellerUsername: "johannajimeno",
        price: 4,
        listingTitle: "Social Studies Textbook",
        buyerUsername: "leeshangji",
    });
});

module.exports = sequelize.model('Offers', OffersModel);
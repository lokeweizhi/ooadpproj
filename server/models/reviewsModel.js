// models/reviewsModel.js
var myDatabase = require('../controllers/database');
var sequelize = myDatabase.sequelize;
var Sequelize = myDatabase.Sequelize;

const Reviews = sequelize.define('Reviews', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING
    },
    imageName: {
        type: Sequelize.STRING
    },
    averageSellerRating: { // for Sellers 
        type: Sequelize.DECIMAL(10,1)
    },
    totalServiceRatings: { // for Sellers
        type: Sequelize.DECIMAL(10,1)
    },
    totalPriceRatings: { // for Sellers
        type: Sequelize.DECIMAL(10,1)
    },
    averageBuyerRating: { // for Buyers
        type: Sequelize.DECIMAL(10,1)
    },
    sellerCount: {
        type: Sequelize.INTEGER
    },
    sellerCount5: {
        type: Sequelize.INTEGER
    },
    buyerCount: {
        type: Sequelize.INTEGER
    },
    verificationStatus: {
        type: Sequelize.STRING
    }
});

// force: true will drop the table if it already exists
Reviews.sync({force: false, logging:console.log}).then(()=>{
    console.log("reviews table synced");
    Reviews.upsert({
        id: 1,
        username: 'linpeishan',
        imageName: "animal-avian-bald-eagle-1131774.jpg",
        averageSellerRating: 1,
        totalServiceRatings: 0.5,
        totalPriceRatings: 0.5,
        averageBuyerRating: 0,
        sellerCount: 2,
        sellerCount5: 0,
        buyerCount: 0,
        verificationStatus: 'nope'
    });
    Reviews.upsert({
        id: 2,
        username: 'JohannaJimeno',
        imageName: "yo.jpg",
        averageSellerRating: 5,
        totalServiceRatings: 2.5,
        totalPriceRatings: 2.5,
        averageBuyerRating: 5,
        sellerCount: 2,
        sellerCount5: 2,
        buyerCount: 1,
        verificationStatus: 'nope'
    });
    Reviews.upsert({
        id: 3,
        username: 'benjaminloke',
        imageName: "human.png",
        averageSellerRating: 5,
        totalServiceRatings: 2.5,
        totalPriceRatings: 2.5,
        averageBuyerRating: 0,
        sellerCount: 5,
        sellerCount5: 5,
        buyerCount: 0,
        verificationStatus: 'verified'
    });
    Reviews.upsert({
        id: 4,
        username: 'leeshangji',
        imageName: "human2.png",
        averageSellerRating: 4.5,
        totalServiceRatings: 2.25,
        totalPriceRatings: 2.25,
        averageBuyerRating: 0,
        sellerCount: 6,
        sellerCount5: 5,
        buyerCount: 0,
        verificationStatus: 'verified'
    });
});


module.exports = sequelize.model('Reviews', Reviews);
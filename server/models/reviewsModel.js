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
    buyerCount: {
        type: Sequelize.INTEGER
    }
});

// force: true will drop the table if it already exists
Reviews.sync({force: false, logging:console.log}).then(()=>{
    console.log("reviews table synced");
    Reviews.upsert({
        id: 1,
        username: 'linpeishan',
        imageName: "animal-avian-bald-eagle-1131774.jpg",
        averageSellerRating: 0,
        totalServiceRatings: 0,
        totalPriceRatings: 0,
        averageBuyerRating: 0,
        sellerCount: 0,
        buyerCount: 0
    });
    Reviews.upsert({
        id: 2,
        username: 'JohannaJimeno',
        imageName: "yo.jpg",
        averageSellerRating: 0,
        totalServiceRatings: 0,
        totalPriceRatings: 0,
        averageBuyerRating: 0,
        sellerCount: 0,
        buyerCount: 0
    });
    Reviews.upsert({
        id: 3,
        username: 'benjaminloke',
        imageName: "human.png",
        averageSellerRating: 0,
        totalServiceRatings: 0,
        totalPriceRatings: 0,
        averageBuyerRating: 0,
        sellerCount: 0,
        buyerCount: 0
    });
    Reviews.upsert({
        id: 4,
        username: 'leeshangji',
        imageName: "human2.png",
        averageSellerRating: 0,
        totalServiceRatings: 0,
        totalPriceRatings: 0,
        averageBuyerRating: 0,
        sellerCount: 0,
        buyerCount: 0
    });
});


module.exports = sequelize.model('Reviews', Reviews);
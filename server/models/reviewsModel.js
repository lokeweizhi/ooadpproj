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
    averageRating: { //totalRatings, perRatings, numCount
        type: Sequelize.DECIMAL(10,1),
    },
    reviewCount: {
        type: Sequelize.INTEGER
    }
});

// force: true will drop the table if it already exists
Reviews.sync({force: false, logging:console.log}).then(()=>{
    console.log('========================================================')
    console.log("reviews table synced");
    console.log('========================================================')
    Reviews.upsert({
        id: 1,
        username: 'admin',
        imageName: "default-avatar.png",
        averageRating: 0,
        reviewCount: 0
    });
    Reviews.upsert({
        id: 2,
        username: 'linpeishan',
        imageName: "animal-avian-bald-eagle-1131774.jpg",
        averageRating: 5,
        reviewCount: 5
    });
    Reviews.upsert({
        id: 3,
        username: 'JohannaJimeno',
        imageName: "yo.jpg",
        averageRating: 0,
        reviewCount: 0
    });
    Reviews.upsert({
        id: 4,
        username: 'benjaminloke',
        imageName: "human.png",
        averageRating: 0,
        reviewCount:0
    });
    Reviews.upsert({
        id: 5,
        username: 'leeshangji',
        imageName: "human.png",
        averageRating: 0,
        reviewCount: 0
    });
});


module.exports = sequelize.model('Reviews', Reviews);
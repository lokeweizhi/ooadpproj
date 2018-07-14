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
    averageRating: { //totalRatings, perRatings, numCount
        type: Sequelize.DECIMAL(10,2),
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
        averageRating: 0
    });
    Reviews.upsert({
        id: 2,
        username: 'linpeishan',
        averageRating: 0
    });
    Reviews.upsert({
        id: 3,
        username: 'JohannaJimeno',
        averageRating: 0
    });
    Reviews.upsert({
        id: 4,
        username: 'benjaminloke',
        averageRating: 0
    });
    Reviews.upsert({
        id: 5,
        username: 'leeshangji',
        averageRating: 0
    });
});


module.exports = sequelize.model('Reviews', Reviews);
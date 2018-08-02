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
    buyerUsername: {
        type: Sequelize.STRING
    },
});

OffersModel.sync({ force: false, logging: console.log}).then(() => {
    console.log("Offers table synced");
});

module.exports = sequelize.model('Offers', OffersModel);
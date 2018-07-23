// models/transactions.js
var myDatabase = require('../controllers/database');
var sequelize = myDatabase.sequelize;
var Sequelize = myDatabase.Sequelize;

const TransactionsModel = sequelize.define('Transactions', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    amount: {
        type: Sequelize.DECIMAL,
    },
    contactName: {
        type: Sequelize.STRING
    },
    username: {
        type: Sequelize.STRING
    }
});

TransactionsModel.sync({ force: false, logging: console.log}).then(() => {
    console.log("Transactions table synced");
});

module.exports = sequelize.model('Transactions', TransactionsModel);
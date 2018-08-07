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
    },
    buyerStatus: {
        type: Sequelize.STRING
    },
    sellerStatus: {
        type: Sequelize.STRING
    },
});

TransactionsModel.sync({ force: false, logging: console.log}).then(() => {
    console.log("Transactions table synced");
    TransactionsModel.upsert({
        id: 1,
        amount: 100,
        contactName: 'linpeishan', // seller
        username: 'JohannaJimeno', // buyer
        buyerStatus: "completed", //buyer's review
        sellerStatus: "incomplete" // seller's review
    }),
    TransactionsModel.upsert({
        id: 2,
        amount: 100,
        contactName: 'leeshangji',
        username: 'linpeishan',
        buyerStatus: "completed",
        sellerStatus: "completed"
    }),
    TransactionsModel.upsert({
        id: 3,
        amount: 100,
        contactName: 'linpeishan',
        username: 'benjaminloke',
        buyerStatus: "completed",
        sellerStatus: "incomplete"
    }),
    TransactionsModel.upsert({
        id: 4,
        amount: 100,
        contactName: 'linpeishan', // seller
        username: 'JohannaJimeno', // buyer
        buyerStatus: "completed", //buyer's review
        sellerStatus: "incomplete" // seller's review
    }),
    TransactionsModel.upsert({
        id: 5,
        amount: 100,
        contactName: 'linpeishan',
        username: 'leeshangji',
        buyerStatus: "completed",
        sellerStatus: "incomplete"
    }),
    TransactionsModel.upsert({
        id: 6,
        amount: 100,
        contactName: 'linpeishan',
        username: 'benjaminloke',
        buyerStatus: "completed",
        sellerStatus: "incomplete"
    })
    ;
});

module.exports = sequelize.model('Transactions', TransactionsModel);
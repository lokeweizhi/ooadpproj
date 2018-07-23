// models/balances.js
var myDatabase = require('../controllers/database');
var sequelize = myDatabase.sequelize;
var Sequelize = myDatabase.Sequelize;

const BalanceModel = sequelize.define('Balances', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    balanceAmt: {
        type: Sequelize.DECIMAL,
    },
    username: {
        type: Sequelize.STRING
    }
});

BalanceModel.sync({ force: false, logging: console.log}).then(() => {
    console.log("Balances table synced");
});

module.exports = sequelize.model('Balances', BalanceModel);
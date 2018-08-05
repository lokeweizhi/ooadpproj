// models/notifications/js
var myDatabase = require('../controllers/database');
var sequelize = myDatabase.sequelize;
var Sequelize = myDatabase.Sequelize;

const NotificationsModel = sequelize.define('Notifications', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    msg: {
        type: Sequelize.STRING,
    },
    username: {
        type: Sequelize.STRING,
    },
    buyerUsername: {
        type: Sequelize.STRING,
    },
});

NotificationsModel.sync({ force: false, logging: console.log}).then(() => {
    console.log("Notifications table synced");
    NotificationsModel.upsert({
        id:1,
        msg: "Your offer has been accepted",
        username: "benjaminloke",
        buyerUsername: "johannajimeno"
    });
    NotificationsModel.upsert({
        id:2,
        msg: "Your offer has been rejected",
        username: "benjaminloke",
        buyerUsername: "johannajimeno"
    });
});

module.exports = sequelize.model('Notifications', NotificationsModel);
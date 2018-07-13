// models/contacts.js
var myDatabase = require('../controllers/database');
var sequelize = myDatabase.sequelize;
var Sequelize = myDatabase.Sequelize;

const ContactModel = sequelize.define('Contacts', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    contactName: {
        type: Sequelize.STRING,
    },
    username: {
        type: Sequelize.STRING
    }
});

ContactModel.sync({ force: false, logging: console.log}).then(() => {
    console.log("Contacts table synced");
});

module.exports = sequelize.model('Contacts', ContactModel);
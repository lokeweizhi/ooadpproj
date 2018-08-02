// models/profileModel.js
var myDatabase = require('../controllers/database');
var sequelize = myDatabase.sequelize;
var Sequelize = myDatabase.Sequelize;

const Profile = sequelize.define('Profile', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    created: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    buyerOrSeller: {
        type: Sequelize.STRING,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        trim: true
    },
    content: {
        type: Sequelize.STRING,
        defaultValue: '',
        trim: true
    },
    serviceRating: { //as seller
        type: Sequelize.INTEGER,
    },
    priceRating: { // as seller
        type: Sequelize.INTEGER
    },
    buyerRating: {
        type: Sequelize.INTEGER
    },
    by: {
        type:Sequelize.STRING,
    },
    targetUsername: {
        type:Sequelize.STRING,
    },
    // user_id:{
    //     type: Sequelize.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: 'Users',
    //         key: 'id'
    //     }
    // }
});

// force: true will drop the table if it already exists
Profile.sync({ force: false, logging: console.log}).then(() => {
    // Table created
    console.log("profile table synced");
});

module.exports = sequelize.model('Profile', Profile);
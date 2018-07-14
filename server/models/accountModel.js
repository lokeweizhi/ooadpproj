
//models/accountModel.js

var myDatabase = require('../controllers/database');
var sequelize = myDatabase.sequelize;
var Sequelize = myDatabase.Sequelize;

const AccountModel = sequelize.define('Accounts', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        trim: true
    },
    password: {
        type: Sequelize.STRING,

    },
    email: {
        type: Sequelize.STRING,
        trim: true
    },
    dateofbirth: {
        type: Sequelize.DATEONLY,
        
    }

});

//force : true will drop the table if it already exist

AccountModel.sync({ force:false, logging:console.log }).then(() => {
    //Table created
    console.log('Students table synced');
    AccountModel.upsert({
        id:1,
        username: "Nayeon",
        password: "Twice",
        email: "Twicetegram@gmail.com",
        dateofbirth: "2000-04-07",
    });
    AccountModel.upsert({
        id:2,
        username: "Irene",
        password: " Red Velvet",
        email: "RedVelvet @gmail.com",
        dateofbirth: "2000-04-07",
    });
    AccountModel.upsert({
        id:3,
        username: "Jennie",
        password: "BlackPink",
        email: "BlackPink @gmail.com",
        dateofbirth: "2000-04-07",
    });
});

module.exports = sequelize.model ('Accounts', AccountModel);
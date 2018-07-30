// models/users.js
var myDatabase = require('../controllers/database');
var sequelize = myDatabase.sequelize;
var Sequelize = myDatabase.Sequelize;

const Users = sequelize.define('Users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    accountType: {
        type: Sequelize.STRING
    },
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    username: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    phoneNumber: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    aboutMe: {
        type: Sequelize.STRING
    },
    location: {
        type: Sequelize.STRING
    },
    gender: {
        type: Sequelize.STRING
    },
    imageName: {
        type: Sequelize.STRING
    }
});

// force: true will drop the table if it already exists
Users.sync({force: false, logging:console.log}).then(()=>{
    console.log("users table synced");
    Users.upsert({
        id: 1,
        accountType: 'Admin',
        firstName: 'Main',
        lastName: 'Account',
        username: 'admin',
        email: 'admin@Adamire.com',
        phoneNumber: '62343535',
        password: '123456',
        aboutMe: "Hello, thank you for visiting this page. For more inquires, please email us at admin@Adamire.com!",
        location: "Singapore",
        gender: "Male",
        imageName: "default-avatar.png",
    });
    Users.upsert({
        id: 2,
        accountType: 'User',
        firstName: 'Peishan',
        lastName: 'Lim',
        username: 'linpeishan',
        email: 'PeiShan@Adamire.com',
        phoneNumber:'81234567',
        password: '123456',
        aboutMe: 'Hello, thank you for visiting this page.',
        location: "Singapore",
        gender: "Female",
        imageName: "animal-avian-bald-eagle-1131774.jpg",
    });
    Users.upsert({
        id: 3,
        accountType: 'User',
        firstName: 'Johanna',
        lastName: 'Jimeno',
        username: 'JohannaJimeno',
        email: 'Johanna@Adamire.com',
        phoneNumber:'81234567',
        password: '123456',
        aboutMe: 'Hello, thank you for visiting this page.',
        location: "Singapore",
        gender: "Female",
        imageName: "yo.jpg"
    });
    Users.upsert({
        id: 4,
        accountType: 'User',
        firstName: 'Benjamin',
        lastName: 'Loke',
        username: 'benjaminloke',
        email: 'Benjamin@Adamire.com',
        phoneNumber:'81234567',
        password: '123456',
        aboutMe: 'Hello, thank you for visiting this page.',
        location: "Singapore",
        gender: "Female",
        imageName: "human.png"
    });
    Users.upsert({
        id: 5,
        accountType: 'User',
        firstName: 'Shang Ji',
        lastName: 'Lee',
        username: 'leeshangji',
        email: 'Shangji@Adamire.com',
        phoneNumber:'81234567',
        password: '123456',
        aboutMe: 'Hello, thank you for visiting this page.',
        location: "Singapore",
        gender: "Female",
        imageName: "human.png"
    });
});

module.exports = sequelize.model('Users', Users);
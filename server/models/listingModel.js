var myDatabase = require('../controllers/database');
var sequelize = myDatabase.sequelize;
var Sequelize = myDatabase.Sequelize;

const ListingModel = sequelize.define('Listings', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        trim: true
    },
    img: {
        type: Sequelize.STRING,
    },
    group: {
        type: Sequelize.INTEGER
    },
    hobby: {
        type: Sequelize.STRING,
        trim: true
    },
    category: {
        type: Sequelize.STRING,
    },
    by: { // sorry for hogging your page, but I rlly need to add this to display your listings for my profile page
        type: Sequelize.STRING
    }
});

ListingModel.sync({ force: false, logging: console.log }).then(() => {
    //table created
    console.log("listings table synced");
    ListingModel.upsert({
        id:1,
        name: "2017 N Level Practice Book",
        group: 100,
        hobby: "Used",
        category: "Art & Design",
        by: "benjaminloke"
    });
    ListingModel.upsert({
        id:2,
        name: "2016 A Level Textbook",
        group: 32,
        hobby: "New",
        category: "Humanities",
        by: "benjaminloke"
    });
    ListingModel.upsert({
        id:3,
        name: "2018 A Level Exercise Books",
        group: 12,
        hobby: "New",
        category: "Maathematics",
        by: "benjaminloke"
    });
})

module.exports = sequelize.model('Listings', ListingModel);
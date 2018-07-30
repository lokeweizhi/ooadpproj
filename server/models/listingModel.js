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
    group: {
        type: Sequelize.INTEGER
    },
    hobby: {
        type: Sequelize.STRING,
        trim: true
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
        by: "benjaminloke"
    });
    ListingModel.upsert({
        id:2,
        name: "2016 A Level Textbook",
        group: 32,
        hobby: "New",
        by: "benjaminloke"
    });
    ListingModel.upsert({
        id:3,
        name: "Red Velvet Ernest Photocard",
        group: 12,
        hobby: "New",
        by: "benjaminloke"
    });
})

module.exports = sequelize.model('Listings', ListingModel);
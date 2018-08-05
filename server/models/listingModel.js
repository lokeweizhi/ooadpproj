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
    itemImage: {
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
        by: "benjaminloke",
        itemImage:"013440_131775336_thumbnail.jpg"
    });
    ListingModel.upsert({
        id:2,
        name: "2016 A Level Textbook",
        group: 32,
        hobby: "New",
        category: "Humanities",
        by: "benjaminloke",
        itemImage:"132433_152214455_thumbnail.jpg"
        
    });
    ListingModel.upsert({
        id:3,
        name: "2018 A Level Exercise Books",
        group: 12,
        hobby: "New",
        category: "Mathematics",
        by: "benjaminloke",
        itemImage:"135020_148470207_thumbnail.jpg"
    });
})

module.exports = sequelize.model('Listings', ListingModel);
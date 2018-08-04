var myDatabase = require('../controllers/database');
var sequelize = myDatabase.sequelize;
var Sequelize = myDatabase.Sequelize;

const MakeOffer = sequelize.define('MakeOffer',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING
    },
    offerprice: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
});

//force : true will drop the table if it already exisits
MakeOffer.sync({ force: false, logging: console.log}).then(() => {
    //Table created
    console.log("MakeOffer table created")
});

module.exports = sequelize.model('MakeOffer', MakeOffer)
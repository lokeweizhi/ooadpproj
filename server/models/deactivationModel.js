// models/deactivationModel.js
var myDatabase = require('../controllers/database');
var sequelize = myDatabase.sequelize;
var Sequelize = myDatabase.Sequelize;

const DeactivationRequest = sequelize.define('DeactivationRequest', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING
    },
    reasons: {
        type: Sequelize.STRING
    }
});

// force: true will drop the table if it already exists
DeactivationRequest.sync({force: false, logging:console.log}).then(()=>{
    console.log('========================================================')
    console.log("DeactivationRequest table synced");
    console.log('========================================================')
});

module.exports = sequelize.model('DeactivationRequest', DeactivationRequest);
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
DeactivationRequest.sync({force: false, logging:console.log}).then(()=>{
    console.log("DeactivationRequest table synced");
});

console.log("Deactivation Table Synced");
DeactivationRequest.upsert({
    id:1,
    username:"Peishan",
    reasons: " Not interested in using this website anymore",
});
DeactivationRequest.upsert({
    id:2,
    username: "Lee Shang Ji",
    reasons: " Inactive",
});
DeactivationRequest.upsert({
    id:3,
    username:"Joh",
    reasons: "Feel that other website offer better deals",
});


module.exports = sequelize.model('DeactivationRequest', DeactivationRequest);
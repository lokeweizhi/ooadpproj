var myDatabase = require('../controllers/database');
var sequelize = myDatabase.sequelize;
var Sequelize = myDatabase.Sequelize;

const ReportModel = sequelize.define('Reports', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
    },
    reasons: {
        type: Sequelize.STRING
    },
    by: {
        type: Sequelize.STRING
    }
});

ReportModel.sync({ force: false, logging: console.log}).then(() => {
    console.log("Report User table synced");
    ReportModel.upsert({
        id: 1,
        username: "linpeishan",
        reasons: "rude comments, irregular in replies",
        by: "JohannaJimeno"
    });
});

module.exports = sequelize.model('Reports', ReportModel);
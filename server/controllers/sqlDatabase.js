var Sequelize = require('sequelize');
var sequelizeTransforms = require('sequelize-transforms');

const sequelize = new Sequelize('itp211db','root','Shizamed1', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql',
    pool: {
        max:5,
        min:0,
        acquire:3000,
        idle:1000
    },
    operatorsAliases: false
});

const sequelizeInstance = new Sequelize('itp211db', 'root', 'Shizamed1', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql',

    pool: {
      max: 5,
      min: 0,
      acquire: 3000,
      idle: 1000
    },
    operatorsAliases: false
});



sequelizeInstance.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

sequelizeTransforms(sequelizeInstance);
sequelizeTransforms(sequelize);

module.exports.sequelizeInstance = sequelizeInstance;
module.exports.sequelize = sequelize;
module.exports.Sequelize = Sequelize;

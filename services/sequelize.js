const {Sequelize, DataTypes} = require('sequelize');
const {
    database,
    username,
    password,
    host,
    dialect
} = require('../config').db;

const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: dialect
});

//test connection
(async () => {
    try {
        await sequelize.authenticate();
        console.log('連接成功');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

module.exports = sequelize;
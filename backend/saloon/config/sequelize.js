const Sequelize = require('sequelize');
const StylistModel = require('../../saloon/model/stylist');

const sequelize = new Sequelize('saloon', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const Stylist = StylistModel(sequelize, Sequelize);

sequelize.sync({ force: false });

module.exports = {
    Stylist
}
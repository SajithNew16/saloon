const Sequelize = require('sequelize');
const StylistModel = require('../model/stylist');
const SaloonModel = require('../model/saloon');

const sequelize = new Sequelize('saloon', 'root', 'root', {
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
const Saloon = SaloonModel(sequelize, Sequelize);

sequelize.sync({ force: false });

module.exports = {
    Stylist,
    Saloon
}
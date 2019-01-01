const Sequelize = require('sequelize');
const StylistModel = require('../model/stylist');
const SaloonModel = require('../model/saloon');
const Sty_jobModel = require('../model/sty_job');
const BookingModel = require('../model/booking');
const WorkingModel = require('../model/working');
const UserModel = require('../model/user');

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
const StylistJob = Sty_jobModel(sequelize, Sequelize);
const Booking = BookingModel(sequelize, Sequelize);
const Working = WorkingModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);
// const UserStylist = sequelize.define('user_stylist', {});

// User.belongsToMany(UserStylist, { through: UserStylist, unique: false })

sequelize.sync({ force: false });

module.exports = {
    Stylist,
    Saloon,
    StylistJob,
    Booking,
    Working,
    User
}
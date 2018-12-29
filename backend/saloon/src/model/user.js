var Sequelize = require('sequelize');
module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        userId: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: type.STRING,
            unique: true
        },
        password: type.STRING,
        type: type.STRING,
    })
}


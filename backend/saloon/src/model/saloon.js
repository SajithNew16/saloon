var Sequelize = require('sequelize');
module.exports = (sequelize, type) => {
    return sequelize.define('saloon', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userName: type.STRING,
        password: type.STRING,
        email: {
            type: type.STRING,
            unique: true
        },
        type: type.STRING,
        saloonName: type.STRING,
        location: type.STRING
    })
}


var Sequelize = require('sequelize');
module.exports = (sequelize, type) => {
    return sequelize.define('stylist', {
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
        experience: {
            type: Sequelize.STRING,
            get() {
                return this.getDataValue('experience').split(';')
            },
            set(val) {
                this.setDataValue('experience', val.join(';'));
            },
        },
        type: type.STRING
    })
}


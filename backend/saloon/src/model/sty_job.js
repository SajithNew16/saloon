var Sequelize = require('sequelize');
module.exports = (sequelize, type) => {
    return sequelize.define('sty_job', {
        styJobId: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        styId: {
            type: type.INTEGER,
            foreignKey: true,
            references: {
                model: 'stylists',
                key: 'styId'
            }
        },
        salId: {
            type: type.INTEGER,
            foreignKey: true,
            references: {
                model: 'saloons',
                key: 'salId'
            }
        },
        task: type.STRING,
        saloonName: type.STRING,
        startValue: type.DATE,
        endValue: type.DATE
    })
}


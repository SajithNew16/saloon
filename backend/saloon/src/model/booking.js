var Sequelize = require('sequelize');
module.exports = (sequelize, type) => {
    return sequelize.define('booking', {
        styBookId: {
            type: type.INTEGER,
            primaryKey: true,
            foreignKey: true,
            references: {
                model: 'stylists',
                key: 'styId'
            }
        },
        salBookId: {
            type: type.INTEGER,
            primaryKey: true,
            foreignKey: true,
            references: {
                model: 'saloons',
                key: 'salId'
            }
        }
    })
}


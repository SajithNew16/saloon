var Sequelize = require('sequelize');
module.exports = (sequelize, type) => {
    return sequelize.define('working', {
        styworkId: {
            type: type.INTEGER,
            primaryKey: true,
            foreignKey: true,
            references: {
                model: 'stylists',
                key: 'styId'
            }
        },
        styJobWorkId: {
            type: type.INTEGER,
            primaryKey: true,
            foreignKey: true,
            references: {
                model: 'sty_jobs',
                key: 'styJobId'
            }
        }
    })
}


var Sequelize = require('sequelize');
module.exports = (sequelize, type) => {
    return sequelize.define('sty_job', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        saloonName: type.STRING,
        task: type.STRING,
        startValue: type.DATE,
        endValue: type.DATE
    })
}


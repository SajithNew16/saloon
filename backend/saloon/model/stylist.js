module.exports = (sequelize, type) => {
    return sequelize.define('stylist', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userName: type.STRING,
        password: type.STRING,
        email: type.STRING,
        experience: []
    })
}
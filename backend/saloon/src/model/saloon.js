var Sequelize = require("sequelize");
module.exports = (sequelize, type) => {
  return sequelize.define("saloon", {
    salId: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userName: type.STRING,
    saloonName: type.STRING,
    location: type.STRING,
    userId: {
      type: type.INTEGER,
      foreignKey: true,
      references: {
        model: "users",
        key: "userId"
      }
    }
  });
};

var Sequelize = require("sequelize");
module.exports = (sequelize, type) => {
  return sequelize.define("sty_job", {
    styJobId: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    styId: {
      type: type.INTEGER,
      foreignKey: true,
      references: {
        model: "stylists",
        key: "styId"
      }
    },
    task: type.STRING,
    saloonName: type.STRING,
    startValue: type.DATE,
    endValue: type.DATE
  });
};

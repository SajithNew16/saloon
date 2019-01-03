var Sequelize = require("sequelize");
module.exports = (sequelize, type) => {
  return sequelize.define("stylist", {
    styId: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userName: type.STRING,
    // experience: {
    //     type: Sequelize.STRING,
    //     get() {
    //         return this.getDataValue('experience').split(';')
    //     },
    //     set(val) {
    //         this.setDataValue('experience', val.join(';'));
    //     },
    // },
    chargesMan: type.INTEGER,
    userId: {
      type: type.INTEGER,
      foreignKey: true,
      references: {
        model: "users",
        key: "userId"
      }
    },
    email: {
      type: type.STRING,
      unique: true
    },
    startValue: type.DATE,
    endValue: type.DATE,
    acceptance: type.STRING
  });
};

var Sequelize = require("sequelize");
module.exports = (sequelize, type) => {
  return sequelize.define("event", {
    
    startValue: type.DATE,
    endValue: type.DATE
  });
};

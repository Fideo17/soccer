'use strict';
module.exports = (sequelize, DataTypes) => {
  const soccer = sequelize.define('soccer', {
    name: DataTypes.STRING,
    team: DataTypes.STRING,
    league: DataTypes.STRING,
    dtechnical: DataTypes.STRING
  }, {});
  soccer.associate = function(models) {
    // associations can be defined here
  };
  return soccer;
};
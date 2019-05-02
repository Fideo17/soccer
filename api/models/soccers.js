'use strict';
module.exports = (sequelize, DataTypes) => {
  const Soccers = sequelize.define('Soccers', {
     //id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    team: DataTypes.STRING,
    league: DataTypes.STRING,
    dtechnical: DataTypes.STRING
  }, {});
  Soccers.associate = function(models) {
    // associations can be defined here
  };
  return Soccers;
};
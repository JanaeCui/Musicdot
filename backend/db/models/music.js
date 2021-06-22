'use strict';
module.exports = (sequelize, DataTypes) => {
  const Music = sequelize.define('Music', {
    title: DataTypes.STRING,
    eventMusicUrl: DataTypes.STRING
  }, {});
  Music.associate = function(models) {
    // associations can be defined here
    Music.hasOne(models.Event, { foreignKey: 'musicId' });
  };
  return Music;
};

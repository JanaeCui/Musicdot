'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    eventImageUrl: DataTypes.STRING
  }, {});
  Image.associate = function(models) {
    // associations can be defined here
    Image.hasOne(models.Event, { foreignKey: 'imageId' });
  };
  return Image;
};

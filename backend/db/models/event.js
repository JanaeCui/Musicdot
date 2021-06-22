'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    hostId: DataTypes.INTEGER,
    venueId: DataTypes.INTEGER,
    imageId: DataTypes.INTEGER,
    musicId: DataTypes.INTEGER,
    category: DataTypes.STRING,
    title: DataTypes.STRING,
    date: DataTypes.DATE,
    price: DataTypes.INTEGER,
    capacity: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {});
  Event.associate = function(models) {
    // associations can be defined
    Event.belongsTo(models.User, { foreignKey: 'hostId' });
    Event.hasMany(models.Bookmark, { foreignKey: 'eventId' });
    Event.hasMany(models.Ticket, { foreignKey: 'eventId' });
    Event.belongsTo(models.Venue, { foreignKey: 'venueId' });
    Event.belongsTo(models.Image, { foreignKey: 'imageId', onDelete: 'CASCADE', hooks: true });
    Event.belongsTo(models.Music, { foreignKey: 'musicId', onDelete: 'CASCADE', hooks: true });

  };
  return Event;
};

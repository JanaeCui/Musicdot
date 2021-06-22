'use strict';

const db = require('../models');
const { User, Event} = db;

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const users = await User.findAll();
    const events = await Event.findAll();

    return queryInterface.bulkInsert('Bookmarks', [
      { userId: users[0].id, eventId: events[0].id, createdAt: new Date(), updatedAt: new Date() },
      { userId: users[0].id, eventId: events[4].id, createdAt: new Date(), updatedAt: new Date() },
      { userId: users[0].id, eventId: events[1].id, createdAt: new Date(), updatedAt: new Date() },
      { userId: users[0].id, eventId: events[6].id, createdAt: new Date(), updatedAt: new Date() },
      { userId: users[0].id, eventId: events[3].id, createdAt: new Date(), updatedAt: new Date() },
      { userId: users[0].id, eventId: events[5].id, createdAt: new Date(), updatedAt: new Date() },
      { userId: users[0].id, eventId: events[2].id, createdAt: new Date(), updatedAt: new Date() },
      { userId: users[0].id, eventId: events[7].id, createdAt: new Date(), updatedAt: new Date() },
      { userId: users[0].id, eventId: events[8].id, createdAt: new Date(), updatedAt: new Date() },
      { userId: users[0].id, eventId: events[9].id, createdAt: new Date(), updatedAt: new Date() },
    ]
    , {})
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Bookmarks', null, {});
  }
};

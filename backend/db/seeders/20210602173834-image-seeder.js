'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Images', [
      {eventImageUrl:'/images/eventCardPic1.png', createdAt: new Date(), updatedAt: new Date() },
      {eventImageUrl:'/images/eventCardPic2.png', createdAt: new Date(), updatedAt: new Date() },
      {eventImageUrl:'/images/eventCardPic3.png', createdAt: new Date(), updatedAt: new Date() },
      {eventImageUrl:'/images/eventCardPic4.png', createdAt: new Date(), updatedAt: new Date() },
      {eventImageUrl:'/images/eventCardPic5.png', createdAt: new Date(), updatedAt: new Date() },
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
    return queryInterface.bulkDelete('Images', null, {});
  }
};

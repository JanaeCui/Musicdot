'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Venues', [
      {name: "America", address: "Randall's Island, United State",city: "New York", state: "New York", zipCode: "10001",lat: "40.7128", lng: "74.0060" , createdAt: new Date(), updatedAt: new Date() },
      {name: "Asia", address: "Beijing, China",city: "Beijing", state: "Beijing", zipCode: "100001",lat: "39.9042", lng: "116.4074" , createdAt: new Date(), updatedAt: new Date() },
      {name: "Europe", address: "London, United Kingdom",city: "London", state: "London", zipCode: "EC1A",lat: "51.5074", lng: "0.1278" , createdAt: new Date(), updatedAt: new Date() },
      {name: "South America", address: "São Paulo, Brazil",city: "São Paulo", state: "Brazil", zipCode: "01000-000",lat: "23.5505", lng: "46.6333", createdAt: new Date(), updatedAt: new Date()  },
      {name: "America", address: "Randall's Island, United State",city: "New York", state: "New York", zipCode: "10001",lat: "40.7128", lng: "74.0060" , createdAt: new Date(), updatedAt: new Date() },
      {name: "Asia", address: "Beijing, China",city: "Beijing", state: "Beijing", zipCode: "100001",lat: "39.9042", lng: "116.4074" , createdAt: new Date(), updatedAt: new Date() },
      {name: "Europe", address: "London, United Kingdom",city: "London", state: "London", zipCode: "EC1A",lat: "51.5074", lng: "0.1278" , createdAt: new Date(), updatedAt: new Date() },
      {name: "South America", address: "São Paulo, Brazil",city: "São Paulo", state: "Brazil", zipCode: "01000-000",lat: "23.5505", lng: "46.6333" , createdAt: new Date(), updatedAt: new Date() },
      {name: "America", address: "Randall's Island, United State",city: "New York", state: "New York", zipCode: "10001",lat: "40.7128", lng: "74.0060" , createdAt: new Date(), updatedAt: new Date() },
      {name: "Asia", address: "Beijing, China",city: "Beijing", state: "Beijing", zipCode: "100001",lat: "39.9042", lng: "116.4074" , createdAt: new Date(), updatedAt: new Date() },
      {name: "Europe", address: "London, United Kingdom",city: "London", state: "London", zipCode: "EC1A",lat: "51.5074", lng: "0.1278" , createdAt: new Date(), updatedAt: new Date() },
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
    return queryInterface.bulkDelete('Venues', null, {});
  }
};

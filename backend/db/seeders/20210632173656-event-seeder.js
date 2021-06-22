'use strict';

const db = require('../models');
const { User, Venue, Image, Music } = db;

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const users = await User.findAll();
    const venues = await Venue.findAll();
    const images = await Image.findAll()
    const music = await Music.findAll();


    return queryInterface.bulkInsert('Events', [
    { hostId: users[0].id, venueId: venues[0].id, imageId: images[0].id, musicId: music[0].id,  category: "pop", title: "Coachella", date: "2020-04-15 09:05:02", price: "15", capacity: "50", description:"Selling out fast every year, the Indio desert becomes a fashionable hive of the coolest bands watched by trendy people and celebrities." , createdAt: new Date(), updatedAt: new Date() },
    { hostId: users[0].id, venueId: venues[1].id, imageId: images[2].id, musicId: music[0].id,  category: "pop", title: "Lollapalooza", date: "2021-07-15 19:05:02", price: "25", capacity: "150", description:"A wonderful gathering of music, dance, comedy and craft booths, Lollapalooza is another multi-genre delight which also provides a platform for political and non-profit artists and groups." , createdAt: new Date(), updatedAt: new Date() },
    { hostId: users[0].id, venueId: venues[2].id, imageId: images[0].id, musicId: music[0].id,  category: "rock", title: "South By South West", date: "2021-06-18 21:05:02", price: "15", capacity: "30", description:"Regarded as the ultimate trend-setter and launcher of careers, SXSW is an annual showcase of music, film and interactive highlights enjoyed through performances, showcases, talks, screenings and more." , createdAt: new Date(), updatedAt: new Date() },
    { hostId: users[0].id, venueId: venues[3].id, imageId: images[3].id, musicId: music[0].id,  category: "rock", title: "Pitchfork Music Festival", date: "2021-06-18 21:05:02", price: "15", capacity: "70", description:"Regarded as the ultimate trend-setter and launcher of careers, SXSW is an annual showcase of music, film and interactive highlights enjoyed through performances, showcases, talks, screenings and more." , createdAt: new Date(), updatedAt: new Date() },
    { hostId: users[0].id, venueId: venues[4].id, imageId: images[1].id, musicId: music[0].id,  category: "country", title: "Pitchfork Music Festival", date: "2022-07-15 12:05:02", price: "35", capacity: "170", description:"Organised by independently focused music source Pitchfork Media, this three day event is a music genre melting pot of rock, hip-hop, electronic, jazz, punk and any other genre and sub-genre you want to celebrate." , createdAt: new Date(), updatedAt: new Date() },
    { hostId: users[0].id, venueId: venues[5].id, imageId: images[2].id, musicId: music[0].id,  category: "country", title: "Lollapalooza", date: "2022-09-15 12:05:02", price: "35", capacity: "170", description:"Organised by independently focused music source Pitchfork Media, this three day event is a music genre melting pot of rock, hip-hop, electronic, jazz, punk and any other genre and sub-genre you want to celebrate." , createdAt: new Date(), updatedAt: new Date() },
    { hostId: users[0].id, venueId: venues[6].id, imageId: images[4].id, musicId: music[0].id,  category: "hip hop", title: "South By South West", date: "2021-08-18 11:05:02", price: "15", capacity: "50", description:"Regarded as the ultimate trend-setter and launcher of careers, SXSW is an annual showcase of music, film and interactive highlights enjoyed through performances, showcases, talks, screenings and more." , createdAt: new Date(), updatedAt: new Date() },
    { hostId: users[0].id, venueId: venues[7].id, imageId: images[1].id, musicId: music[0].id,  category: "hip hop", title: "South By South West", date: "2021-06-18 21:05:02", price: "30", capacity: "60", description:"Regarded as the ultimate trend-setter and launcher of careers, SXSW is an annual showcase of music, film and interactive highlights enjoyed through performances, showcases, talks, screenings and more." , createdAt: new Date(), updatedAt: new Date() },
    { hostId: users[0].id, venueId: venues[8].id, imageId: images[2].id, musicId: music[0].id,  category: "jazz", title: "Ultra Music Festival", date: "2022-04-18 23:05:02", price: "25", capacity: "60", description:"Aside from its two popular US events, this fairytale carnival experience has also visited Puerto Rico, Mexico and the UK." , createdAt: new Date(), updatedAt: new Date() },
    { hostId: users[0].id, venueId: venues[9].id, imageId: images[3].id, musicId: music[0].id,  category: "funk", title: "Electric Zoo", date: "2022-06-18 21:05:02", price: "45", capacity: "170", description:"Regarded as the ultimate trend-setter and launcher of careers, SXSW is an annual showcase of music, film and interactive highlights enjoyed through performances, showcases, talks, screenings and more." , createdAt: new Date(), updatedAt: new Date() },
    { hostId: users[0].id, venueId: venues[10].id, imageId: images[0].id, musicId: music[0].id,  category: "blues", title: "South By South West", date: "2021-06-18 21:05:02", price: "15", capacity: "30", description:"Regarded as the ultimate trend-setter and launcher of careers, SXSW is an annual showcase of music, film and interactive highlights enjoyed through performances, showcases, talks, screenings and more." , createdAt: new Date(), updatedAt: new Date() },

    ]
    ,{})
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
    return queryInterface.bulkDelete('Events', null, {});
  }
};

const express = require('express')
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const asyncHandler = require('express-async-handler');
const { Music, Event, Image, Venue, Bookmark, Ticket} = require('../../db/models');

router.get('/',requireAuth, asyncHandler(async (req, res) => {

    const events = await Event.findAll(
        {include: [Image,Venue, Music],
        order: [['updatedAt', 'DESC']]
        }
        );

    return res.json(events);
}));

//----------------------------------------------------------------------------------------------------
router.get('/:userId',requireAuth, asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const events = await Event.findAll(
        {include: [Image,Venue, Music],
        order: [['updatedAt', 'DESC']],
        where: {
            // eventId,
            hostId: userId
        }
        }
        );

        console.log("--------",events);

    return res.json(events);
}));

router.delete('/:id/myevents/:userId',requireAuth, asyncHandler(async function(req, res) {

    const userId = parseInt(req.params.userId, 10);
    const eventId = parseInt(req.params.id, 10);
    const isDeletedMyEvent = true;
    // const currentEvent = await Event.findOne({
    //     where: {
    //         eventId,
    //         hostId: userId
    //     }
    //   })

    const ticket = await Ticket.destroy({

        where: {
            eventId,
        }
    })

    const bookmark = await Bookmark.destroy({

        where: {
            eventId,
        }
    })
    //   if(!currentBookmark) {
        const event = await Event.destroy({

            where: {
                hostId: userId,
                id: eventId,
            }
        })
    // }



    res.json({isDeletedMyEvent, event});
})
);


router.post('/myEventUpload/:userId',requireAuth, asyncHandler(async function(req, res) {

    const userId = parseInt(req.params.userId, 10);
    const eventImageUrl = req.body.eventImageUrl;
    const venueName = req.body.venueName;
    const address = req.body.address;
    const city = req.body.city;
    const state =req.body.state;
    const zipCode = req.body.zipCode
    const lat = req.body.lat
    const lng = req.body.lng
    const musicTitle = req.body.musicTitle
    const eventMusicUrl = req.body.eventMusicUrl;
    const eventCategory =req.body.eventCategory;
    const eventTitle = req.body.eventTitle;
    const selectedDate =req.body.selectedDate;
    const price =req.body.price;
    const capacity = req.body.capacity;
    const description = req.body.description;



    const image = await Image.create({
        eventImageUrl
    })

    const venue = await Venue.create({

        name: venueName,
        address,
        city,
        state,
        zipCode,
        lat,
        lng
    })

    const music = await Music.create({
        title: musicTitle,
        eventMusicUrl
    })

    const event = await Event.create({
        hostId: userId,
        venueId: venue.id,
        imageId: image.id,
        musicId: music.id,
        category: eventCategory,
        title: eventTitle,
        date: selectedDate,
        price,
        capacity,
        description

    })
    event.setDataValue('Image', image);
    event.setDataValue('Music', music);
    event.setDataValue('Venue', venue);
    res.json(event);
})
);



router.put('/:id/myEventEdit/:userId',requireAuth, asyncHandler(async function(req, res) {
    const eventId = parseInt(req.params.id, 10);
    const userId = parseInt(req.params.userId, 10);
    const eventImageUrl = req.body.eventImageUrl;
    const venueName = req.body.venueName;
    const address = req.body.address;
    const city = req.body.city;
    const state =req.body.state;
    const zipCode = req.body.zipCode
    const lat = req.body.lat
    const lng = req.body.lng
    const musicTitle = req.body.musicTitle
    const eventMusicUrl = req.body.eventMusicUrl;
    const eventCategory =req.body.eventCategory;
    const eventTitle = req.body.eventTitle;
    const selectedDate =req.body.selectedDate;
    const price =req.body.price;
    const capacity = req.body.capacity;
    const description = req.body.description;



    const image = await Image.update({
        eventImageUrl
    },{where:{ eventImageUrl}})

    const venue = await Venue.update({

        name: venueName,
        address,
        city,
        state,
        zipCode,
        lat,
        lng
    },{where:{
        name: venueName,
        address,
        city,
        state,
        zipCode,
        lat,
        lng
    }})

    const music = await Music.update({
        title: musicTitle,
        eventMusicUrl
    },{where:{title: musicTitle,
        eventMusicUrl} })

    await Event.update({
        hostId: userId,
        venueId: venue.id,
        imageId: image.id,
        musicId: music.id,
        category: eventCategory,
        title: eventTitle,
        date: selectedDate,
        price,
        capacity,
        description

    }, { where: {id: eventId} } )

    const event = await Event.findOne({
        where: {
            id: eventId,
            hostId: userId,
        },
        include:[
            Image,
            Music,
            Venue
        ],
    })
    res.json(event);
})
);

//-----------------------------------------------------------------------------------------

router.post('/:id/bookmarks',requireAuth, asyncHandler(async function(req, res) {

    const eventId = parseInt(req.params.id, 10);
    const loggedUserId = req.body.userId;
    console.log("--------",loggedUserId);
    let bookmarkState = false


    // if (typeof window !== 'undefined') {
    //     localStorage.setItem("savedBookmarkState", true);
    // }
    const currentBookmark = await Bookmark.findOne({
      where: {
          eventId,
          userId: loggedUserId
      }
    })

    if(!currentBookmark) {
        const newBookmark = await Bookmark.build({
            userId: loggedUserId,
            eventId
        })
        // const newBookmark = await Bookmark.create(req.body);
        bookmarkState = true
        // res.locals.bookmarkId = true
        await newBookmark.save()
    }

    if (typeof window !== 'undefined') {
        localStorage.setItem("savedBookmarkState", false);
    }

    res.json({currentBookmark, bookmarkState})
})
);

router.delete('/:id/bookmarks',requireAuth, asyncHandler(async function(req, res) {
    console.log("guschen802deleteBookmarks")
    const eventId = parseInt(req.params.id, 10);
    // const userId = req.body.userId;
    // console.log("--------",loggedUserId);
    let bookmarkState = false


    // if (typeof window !== 'undefined') {
    //     localStorage.setItem("savedBookmarkState", true);
    // }
    const currentBookmark = await Bookmark.findOne({
      where: {

          eventId,
        //   userId: userId
      }
    })

    // if(!currentBookmark) {
        const newBookmark = await Bookmark.destroy({
            where: { eventId}
        })
        // const newBookmark = await Bookmark.create(req.body);
        bookmarkState = false
        // res.locals.bookmarkId = true
    // }

    if (typeof window !== 'undefined') {
        localStorage.setItem("savedBookmarkState", true);
    }

    res.json({currentBookmark, bookmarkState})
})
);

//----------------------------------------------------------------------------------------------
router.post('/:id/tickets',requireAuth, asyncHandler(async function(req, res) {

    const eventId = parseInt(req.params.id, 10);
    const loggedUserId = req.body.userId;
    console.log("--------",loggedUserId);
    // let ticketState = false

    // let count = 1;
    const currentTicket = await Ticket.findOne({

      where: {
          eventId,
          userId: loggedUserId
      }
    })

    // if(!currentTicket) {
        const newTicket = await Ticket.build({
            userId: loggedUserId,
            eventId
        })

        ticketState = true
        await newTicket.save()
    // }

    // if (typeof window !== 'undefined') {
    //     localStorage.setItem("savedTicketState", false);
    //     localStorage.setItem("counter", count++);
    // }

    res.json({currentTicket})
})
);

router.delete('/:id/tickets',requireAuth, asyncHandler(async function(req, res) {
    const eventId = parseInt(req.params.id, 10);
    const userId = req.body.userId;
    // console.log("--------",loggedUserId);
    // let ticketState = false


    // if (typeof window !== 'undefined') {
    //     localStorage.setItem("savedBookmarkState", true);
    // }
    const currentTicket = await Ticket.findOne({
      where: {
          eventId,
          userId: userId
      }
    })

    if(currentTicket) {
        const newTicket = await Ticket.destroy({
            where: { id: currentTicket.id}
        })
        // const newTicket = await Ticket.create(req.body);
        ticketState = false
        // res.locals.ticketId = true
    }

    // if (typeof window !== 'undefined') {
    //     localStorage.setItem("savedTicketState", true);
    // }

    res.json({currentTicket})
})
);



module.exports = router;

const express = require('express')
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const asyncHandler = require('express-async-handler');
const { Event, Image, Venue, Bookmark, Ticket} = require('../../db/models');

router.get('/',requireAuth, asyncHandler(async (req, res) => {

    const events = await Event.findAll(
        {include: [Image,Venue],
        order: [['updatedAt', 'DESC']]
        }
        );

    return res.json(events);
}));

router.get('/:userId',requireAuth, asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const events = await Event.findAll(
        {include: [Image,Venue],
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


router.post('/:id/tickets',requireAuth, asyncHandler(async function(req, res) {

    const eventId = parseInt(req.params.id, 10);
    const loggedUserId = req.body.userId;
    console.log("--------",loggedUserId);
    let ticketState = false

    let count = 1;
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

    if (typeof window !== 'undefined') {
        localStorage.setItem("savedTicketState", false);
        localStorage.setItem("counter", count++);
    }

    res.json({count, currentTicket, ticketState})
})
);

router.delete('/:id/tickets',requireAuth, asyncHandler(async function(req, res) {

    const eventId = parseInt(req.params.id, 10);
    const userId = req.body.userId;
    // console.log("--------",loggedUserId);
    let ticketState = false


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

    if (typeof window !== 'undefined') {
        localStorage.setItem("savedTicketState", true);
    }

    res.json({currentTicket, ticketState})
})
);



module.exports = router;

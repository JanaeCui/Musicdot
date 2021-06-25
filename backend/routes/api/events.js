const express = require('express')
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const asyncHandler = require('express-async-handler');
const { Event, Image, Venue, Bookmark} = require('../../db/models');

router.get('/',requireAuth, asyncHandler(async (req, res) => {

    const events = await Event.findAll(
        {include: [Image,Venue],
        order: [['updatedAt', 'DESC']]
        }
        );

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

module.exports = router;

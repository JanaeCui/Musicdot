const express = require('express')
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const asyncHandler = require('express-async-handler');
const { Event, User,Image, Bookmark} = require('../../db/models');

router.get('/',requireAuth, asyncHandler(async (req, res) => {


    const bookmarks = await Bookmark.findAll(
        {include: [{
            model: Event,
            include: [Image]
        }, User],
        order: [['updatedAt', 'DESC']]
        }
        );

    return res.json(bookmarks);
}));

router.post('/',requireAuth, asyncHandler(async function(req, res) {


     const bookmark = await Bookmark.create(req.body);

     return res.json(bookmark)
    // res.redirect(`/bookmarks`);
})
);

module.exports = router;

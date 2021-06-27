const express = require('express')
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const asyncHandler = require('express-async-handler');
const { Event, Music, Venue, User,Image, Bookmark} = require('../../db/models');

router.get('/:id',requireAuth, asyncHandler(async (req, res) => {

    const userId = parseInt(req.params.id, 10);

    const bookmarks = await Bookmark.findAll(
        {include: [{
            model: Event,
            include: [Image, Music, Venue]
        }, User],
        order: [['updatedAt', 'DESC']],
        where: {userId}
        }
        );

    return res.json(bookmarks);
}));

// router.post('/',requireAuth, asyncHandler(async function(req, res) {


//      const bookmark = await Bookmark.create(req.body);

//      return res.json(bookmark)
//     // res.redirect(`/bookmarks`);
//     })
// );


router.post('/isBookmarked', requireAuth, asyncHandler(async function(req, res) {

    const userId = req.body.userId;
    const eventId = req.body.eventId;
    const bookmark = await Bookmark.findOne({
        where: {userId, eventId}
    });
    let isBookmarked;
    if(bookmark){
        isBookmarked = true;
    }else{
        isBookmarked = false;
    }

    return res.json(isBookmarked);
   // res.redirect(`/bookmarks`);
   })

)


module.exports = router;

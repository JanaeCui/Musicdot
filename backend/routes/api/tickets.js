const express = require('express')
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const asyncHandler = require('express-async-handler');
const { Event,Music, Venue, User,Image, Ticket} = require('../../db/models');

router.get('/:id',requireAuth, asyncHandler(async (req, res) => {

    const userId = parseInt(req.params.id, 10);


    const tickets = await Ticket.findAll(
        {include: [{
            model: Event,
            include: [Image, Music, Venue]
        }, User],
        order: [['updatedAt', 'DESC']],
        where: {userId}
        }
        );

    return res.json(tickets);
}));



router.post('/count', requireAuth, asyncHandler(async function(req, res) {

    const userId = req.body.userId;
    const eventId = req.body.eventId;
    const tickets = await Ticket.findAll({
        where: {userId, eventId}
    });
    // let isTicketed;
    // if(tickets){
    //     isTicketed = true;
    // }else{
    //     isTicketed = false;
    // }

    const counter = tickets.length;
    return res.json(counter);
   // res.redirect(`/tickets`);
   })

)


module.exports = router;

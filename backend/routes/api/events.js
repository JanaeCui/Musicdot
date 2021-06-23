const express = require('express')
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const asyncHandler = require('express-async-handler');
const { Event, Image, Venue} = require('../../db/models');

router.get('/',requireAuth, asyncHandler(async (req, res) => {

    const events = await Event.findAll(
        {include: [Image,Venue],
        order: [['updatedAt', 'DESC']]
        }
        );

    return res.json(events);
  }));

module.exports = router;

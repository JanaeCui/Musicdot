// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const eventsRouter = require("./events.js");
const bookmarksRouter = require("./bookmarks.js")

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
});

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/events', eventsRouter);

router.use('/bookmarks', bookmarksRouter);



module.exports = router;

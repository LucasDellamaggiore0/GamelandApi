const {Router} = require('express');
const router = Router();
const gamesRoute = require('./games')
const genresRoute = require('./genres')
const platformsRoute = require('./platforms')
const gameRoute = require('./game')
const usersRoute = require('./users')
const authRoute = require('./auth')

router.use('/', gamesRoute )
router.use('/genres', genresRoute )
router.use('/platforms', platformsRoute )
router.use('/game', gameRoute)
router.use('/users', usersRoute)
router.use('/auth', authRoute)

module.exports = router;
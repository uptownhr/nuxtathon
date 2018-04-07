const router = require('express').Router(),
  middlewares = require('./lib/middlewares')

const public = require('./controllers/public')

router.use( middlewares.populateJWTUser )
router.use( middlewares.populateIpAddress)

/* public routes */
router.use( public )

/* protected routes */
router.use(middlewares.isAuthenticated)

module.exports = router
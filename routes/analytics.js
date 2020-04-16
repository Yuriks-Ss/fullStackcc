const express = require('express')
const controllers = require('../controlles/analytics')
const router = express.Router()
const passport = require('passport')

router.get('/overview', passport.authenticate('jwt', {session: false}), controllers.overview)
router.get('/analytics',passport.authenticate('jwt', {session: false}), controllers.analytics)

module.exports = router


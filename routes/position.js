const express = require('express')
const router = express.Router()
const passport = require('passport')
const controllers = require('../controlles/position')


router.get('/:category',passport.authenticate('jwt', {session: false}), controllers.getByCategoryId)
router.post('/', passport.authenticate('jwt', {session: false}), controllers.create)
router.patch('/:id', passport.authenticate('jwt', {session: false}), controllers.update)
router.delete('/:id',passport.authenticate('jwt', {session: false}), controllers.remove)

module.exports = router

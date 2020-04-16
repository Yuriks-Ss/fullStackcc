const express = require('express')
const controllers = require('../controlles/auth')
const router = express.Router()

//localhost:5000/api/auth/login *3000
router.post('/login', controllers.login)
router.post('/register', controllers.register)

module.exports = router

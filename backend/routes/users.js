//for using express
const express = require('express')
const { signinUser, signupUser } = require('../controllers/userController')
const router = express.Router()

//All routers for the users
router.post('/signin', signinUser)
router.post('/signup', signupUser)

module.exports = router

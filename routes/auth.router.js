const { verifySignUp } = require('../middleware')
const controller = require('../controllers/auth.controller')
const express = require('express');
const router = express.Router()

router.post('/signup', (req, res) => {
  controller.signUp(req, res)
})

router.post('/signin', controller.signIn)

module.exports = router
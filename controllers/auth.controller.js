const userService = require('../services/user.service')
const bcrypt = require('bcryptjs')

const signUp = (req, res) => {
  const password = req.body.password
  const newUser = {
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: bcrypt.hashSync(password, 8)
  }

  userService.signUp(newUser, res)
}

const signIn = (req, res) => {
  const emailPredicate = {
    where: {
      email: req.body.email
    }
  }
  const password = req.body.password

  userService.signIn(emailPredicate, password, res)
}

module.exports = {
  signUp,
  signIn
}

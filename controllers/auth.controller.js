const userService = require('../services/user.service')
const bcrypt = require('bcryptjs')

const signUp = async (req, res) => {
  const password = req.body.password
  const newUser = {
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: bcrypt.hashSync(password, 8)
  }

  userService.signUp(newUser).then(() =>
    res.status(200).json('User was registered successfully!'))
}

const signIn = async (req, res) => {
  const emailPredicate = {
    where: {
      email: req.body.email
    }
  }
  const password = req.body.password

  const auth = await userService.signIn(emailPredicate, password)

  res.status(200).json(auth)
}

module.exports = {
  signUp,
  signIn
}

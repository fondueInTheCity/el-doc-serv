const userService = require('../services/user.service')
const bcrypt = require('bcryptjs')

const signUp = async (req, res) => {
  try {
    const password = req.body.password
    const newUser = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: bcrypt.hashSync(password, 8)
    }

    await userService.signUp(newUser)

    res.status(200).json('User was registered successfully!')
  } catch (err) {
    res.status(500).json(err.message)
  }
}

const signIn = async (req, res) => {
  try {
    const emailPredicate = {
      where: {
        email: req.body.email
      }
    }
    const password = req.body.password

    const auth = await userService.signIn(emailPredicate, password)

    res.status(200).json(auth)
  } catch (err) {
    res.status(err.status || 500).json(err.message)
  }
}

module.exports = {
  signUp,
  signIn
}

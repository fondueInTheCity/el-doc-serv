const sftpService = require('./Sftp.service')
var jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('../config/auth.config')
const db = require("../models");
const User = db.users

const TOKEN_VALID_TIME = 86400

const signUp = async (newUser) => {
  const transaction = await db.sequelize.transaction()

  try {
    const user = await User.create(newUser, { transaction: transaction })
    await user.setRoles([1], { transaction: transaction })
    await sftpService.createDirectory(`./upload/users/${user.id}`)

    await transaction.commit()
  } catch (err) {
    await transaction.rollback

    throw err
  }
}

const signIn = async (emailPredicate, password) => {
  try {
    const user = await User.findOne(emailPredicate)

    if (!user) {
      throw { status: 404, message: 'User Not found.' }
    }

    const passwordIsValid = bcrypt.compareSync(
      password,
      user.password
    )

    if (!passwordIsValid) {
      throw { status: 401, message: 'Invalid Password!' }
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: TOKEN_VALID_TIME
    })

    const roles = await user.getRoles()
    const authorities = roles.map(role => role.name.toUpperCase())

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token
    }
  } catch (err) {
    throw err
  }
}

const getUserProfile = async (idCondition) => {
  try {
    return await User.findOne({ where: idCondition })
  } catch (err) {
    throw err
  }
}

module.exports = {
  signUp,
  signIn,
  getUserProfile
}

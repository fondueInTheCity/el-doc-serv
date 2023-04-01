const fileService = require('./file.service')
const sftpService = require('./Sftp.service')
var jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('../config/auth.config')
const db = require("../models");
const User = db.users
const Op = db.Sequelize.Op
const Sequelize = require("sequelize");

const signUp = async (newUser, res) => {
    const t = await db.sequelize.transaction()

    User.create(newUser)
      .then(user => {
        user.setRoles([1]).then(() => {
          sftpService.createDirectory(`./upload/users/${user.id}`, res).then(async () => {
            await t.commit()
            res.status(200).json({ message: 'User was registered successfully!' })
          })
        })
      })
      .catch(async err => {
        await t.rollback
        res.status(500).json({ message: err.message })
      })
}

const signIn = (emailPredicate, password, res) => {
    User.findOne(emailPredicate)
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: 'User Not found.' })
        }
  
        const passwordIsValid = bcrypt.compareSync(
          password,
          user.password
        )
  
        if (!passwordIsValid) {
          return res.status(401).json({
            accessToken: null,
            message: 'Invalid Password!'
          })
        }
  
        const token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400 // 24 hours
        })
  
        user.getRoles().then(roles => { 
          const authorities = roles.map(role => role.name.toUpperCase())

          res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
          })
        })
      })
      .catch(err => {
        res.status(500).json({ message: err.message })
      })
}

const getUserProfile = (idCondition, res) => {
  User.findOne({ where: idCondition })
      .then(data => {
          res.status(200).json(data);
      })
      .catch(err => {
          res.status(500).json({
              message:
                  err.message || "Some error occurred while retrieving users."
          });
      });
}

const addUserFile = async (userId, filename) => {
    await fileService.addUserFile(userId, filename)
}

module.exports = {
    signUp,
    signIn,
    getUserProfile,
    addUserFile
}

const userService = require('./user.service')

const signUp = (req, res) => {
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    })
      .then(user => {
        if (req.body.roles) {
          Role.findAll({
            where: {
              name: {
                [Op.or]: req.body.roles
              }
            }
          }).then(roles => {
            user.setRoles(roles).then(() => {
              res.send({ message: 'User was registered successfully!' })
            })
          })
        } else {
          user.setRoles([1]).then(() => {
            res.status(200).send({ message: 'User was registered successfully!' })
          })
        }
  
        sftpService.createDirectory(`./upload/users/${user.id}`)
      })
      .catch(err => {
        res.status(500).send({ message: err.message })
      })
  }

module.exports = {
    addUserFile
  }
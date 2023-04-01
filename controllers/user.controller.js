const db = require("../models");
const Op = db.Sequelize.Op;
const userService = require('../services/user.service')

const getUserProfile = (req, res) => {
    const id = +req.params.id;
    const idCondition = id ? { id: { [Op.eq]: `${id}` }} : null

    userService.addUserFile(idCondition, res)
}

exports.addUserFile = (req, res) => {
    userService.addUserFile(req.params.id, req.file.originalname)
    console.log(req.params.id, req.file.originalname)
    console.log(req.file, req.body)
    res.status(200).send({
        message: "Ok."
    })
    return
}

module.exports = {
    getUserProfile
}

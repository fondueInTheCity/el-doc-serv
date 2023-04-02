const db = require("../models");
const Op = db.Sequelize.Op;
const userService = require('../services/user.service')

const getUserProfile = async (req, res) => {
    const id = +req.params.id;
    const idCondition = id ? { id: { [Op.eq]: `${id}` } } : null

    const user = await userService.addUserFile(idCondition, res)

    res.status(200).json(user)
}

module.exports = {
    getUserProfile
}

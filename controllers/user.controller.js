const db = require("../models");
const Op = db.Sequelize.Op;
const userService = require('../services/user.service')

const getUserProfile = async (req, res) => {
    try {
        const id = +req.params.id;
        const idCondition = id ? { id: { [Op.eq]: `${id}` } } : null

        const user = await userService.addUserFile(idCondition, res)

        res.status(200).json(user)
    } catch (err) {
        res.status(err.status || 500).json(err.message)
    }
}

module.exports = {
    getUserProfile
}

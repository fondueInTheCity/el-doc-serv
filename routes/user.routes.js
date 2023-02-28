var express = require('express');
const users = require("../controllers/user.controller.js");
var router = express.Router();

router.post("/", users.create);
router.get("/", users.findAll);

module.exports = router;

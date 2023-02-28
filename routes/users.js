var express = require('express');
const db = require('../services/PostDB')
var router = express.Router();

/* GET users listing. */
router.get('/', db.getUsers);

module.exports = router;

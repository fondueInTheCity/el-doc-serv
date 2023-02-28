var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login', function(req, res) {
  res.json('answer');
});

module.exports = router;

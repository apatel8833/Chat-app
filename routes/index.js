var express = require('express');
var router = express.Router();
var socketIo = require("socket.io");
var socketapi = require("../socketapi")

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

module.exports = router;


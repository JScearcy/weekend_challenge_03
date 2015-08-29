var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var file = path.join(__dirname, '../models/shoutout.json');
  fs.readFile(file, function(err, data){
    res.send(JSON.parse(data));
  })
});

module.exports = router;

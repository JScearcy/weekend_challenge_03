var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

var file = path.join(__dirname, '../models/shoutout.json');
//on a GET request send the .json file data
router.get('/', function(req, res, next) {
  fs.readFile(file, function(err, data){
    if (err) throw err;
    res.send(JSON.parse(data));
  })
});
//on a PUT request - verify the data exists and then add it to the .json file
router.put('/', function(req, res, next) {
  var newShout = {
    name: req.body['0[name]'],
    shoutout: req.body['0[shoutout]'],
    id: req.body['0[id]']
  };
  fs.readFile(file, function(err, data){
    if (err) throw err;
    data = JSON.parse(data);
    data.push(newShout);
    data = JSON.stringify(data);
    fs.writeFile(file, data, function(){
      fs.readFile(file, function(err, newdata){
        res.send(JSON.parse(newdata));
      })
    })
  })
});

module.exports = router;

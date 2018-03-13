var express = require('express');
var app = express();
//app.use(app.router);
var router = express.Router();
//var multer = require('multer');
var Mdb = require('mongodb').Mdb,
    Server = require('mongodb').Server;
const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/test', function(err, database) {
  if (err) return console.log(err);
  Mdb = database;
});

var util = require('../../utils/util');
var InitMdb = require('../../utils/STT/InitMdb');
//var Query = require('../utils/query');

var Mdb = require('../../utils/STT/InitMdb').Mdb;

router.delete('/removefile/file/:filename', function(req, res) {
  var filename = req.params.filename;
  console.log("filename=" + filename);
  Mdb.collection('Boons').findOneAndDelete({
    "filename": filename
  }, function(err, file) {
  //  res.sendfile('');
  });

});

module.exports = router;

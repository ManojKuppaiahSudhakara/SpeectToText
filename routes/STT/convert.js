var express = require('express');
var app = express();
//app.use(app.router);
var router = express.Router();

var Mdb = require('mongodb').Mdb,
    Server = require('mongodb').Server;
const MongoClient = require('mongodb').MongoClient;
var ffmpeg = require('fluent-ffmpeg');
var fs = require('fs');

// var util = require('../../utils/util');
// var InitMdb = require('../../utils/STT/InitMdb');
// //var Query = require('../utils/query');
// var Mdb = require('../../utils/STT/InitMdb').Mdb;
// const path = require('path');

MongoClient.connect('mongodb://localhost:27017/test', function(err, database) {
  if (err) return console.log(err);
  Mdb = database;
});

router.get('/convertfile', function(req, res) {
  //var filename = req.query.q.trim();
  //var inputfile = db.collection('Boons').find('filename');
  var inputfile = "./public/uploads/" + '41390DS4089144716598.DSS';
var outputfile = "./public/converts/" + '41390DS4089144716598' + ".wav";
//var outputfile = db.collection(inputfile).insert('filename+".wav"');
  ffmpeg(fs.createReadStream(inputfile)).toFormat('wav')
    .on('error', function(err) {
      console.log('An error occured:' + err.message);
    }).on('progress', function(progress) {
      console.log('Processing:' + progress.targetSize + 'MB Converted');
    }).on('end', function() {
      console.log('Processing finished!');
    }).save(fs.createWriteStream(outputfile));

});

module.exports = router;

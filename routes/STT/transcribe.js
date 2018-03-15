var express = require('express');
//var app = express();
//app.use(app.router);
var router = express.Router();
const path = require('path');
var fs = require('fs');
var db = require('mongodb').db;
Server = require('mongodb').Server;
const MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart();
var ffmpeg = require('fluent-ffmpeg');
var multer = require('multer');
var GridFsStorage = require('multer-gridfs-storage');

var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
var speech_to_text = new SpeechToTextV1({
  username: "xxxxxxxxxxxxxxxxxxxxxxxxxx",
  password: "xxxxxxxxxxxxx"

});
var params = {
  model: 'en-US_BroadbandModel',
  model: 'en-US_NarrowbandModel',
  content_type: 'audio/mp3',
  content_type: 'audio/wav',
  content_type: 'audio/flac',
  continuous: true,
  interim_results: true,
  max_alternatives: 3,
  word_confidence: true,
  timestamps: true,
  keywords: ["A", "B", "C"],
  keywords_threshold: 0.01,
  word_alternatives_threshold: 0.01
};
//url (/transcribe/41390DS4089144716598.dss)
var db = require('../../utils/STT/InitMdb').db;
router.get('/transcribefile', function(req, res) {
//  var filename = req.query.q.trim();
 //console.log("filename = " + filename);

      var recognizeStream = speech_to_text.createRecognizeStream(params);
    var inputfile = "./public/converts/" + '41390DS4089144716598.DSS.wav';
    var outputfile = "./public/downloads/" + '41390DS4089144716598.DSS'+ ".txt";
    var output = "/downloads/" + '41390DS4089144716598.DSS' + ".txt";
      fs.createReadStream(inputfile).pipe(recognizeStream);
      recognizeStream.pipe(fs.createWriteStream(outputfile));
      recognizeStream.setEncoding('utf8');
      res.json({
          "output": output
      });
});

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
module.exports = router;

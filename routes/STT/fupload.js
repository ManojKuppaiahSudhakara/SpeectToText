var express = require('express');
var app = express();
//app.use(app.router);
var router = express.Router();
//var multer = require('multer');
var db = require('mongodb').db;
Server = require('mongodb').Server;
const MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart();
var fs = require('fs');
var multer = require('multer');
var GridFsStorage = require('multer-gridfs-storage');
//MongoClient.connect('mongodb://admin:KLJZKROTSWESWOBK@sl-us-south-1-portal.7.dblayer.com:22999,sl-us-south-1-portal.8.dblayer.com:22999/ITBOONS8?authSource=admin&ssl=true');
var mongo = require('mongodb');
var Grid = require('gridfs-stream');
var GridStore = require('mongodb').GridStore;
var db = require('../../utils/STT/InitMdb').db;
//var gridStore = new GridStore(db, "Tfiles", "w");

var mongodb;
var gfs = require('gridfs-stream');
var storage = GridFsStorage({
 url : "mongodb://admin:KLJZKROTSWESWOBK@sl-us-south-1-portal.7.dblayer.com:22999,sl-us-south-1-portal.8.dblayer.com:22999/ITBOONS8?authSource=admin&ssl=true",
//url : "mongodb://localhost:27017/test",
gfs : gfs,
file: (req, file) => {
   return {
     filename: file.originalname,
     bucketName: 'Bfiles'
   };

 }
 //root name for collection to store files into
});
//
var upload = multer({ //multer settings for single upload
        storage: storage
    }).single('filename');
//
 router.post('/upload',  function(req, res) {
   upload(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
             res.json({error_code:0,err_desc:null});
        });
  });


router.get('/upload', function(req, res){
  mongodb.collection("Bfiles.files").find().toArray(function(err,docs){
if(err){
res.send(err);
} else{
res.send(docs);
}
});
});


module.exports.db = db;
module.exports = router;
// require("cf-deployment-tracker-client").track();

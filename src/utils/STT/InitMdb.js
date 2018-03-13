var bodyParser = require('body-parser');
var express = require('express');
var app = express();
//app.use(app.router);
var router = express.Router();
//var multer = require('multer');
var db = require('mongodb').db;
Server = require('mongodb').Server;
const MongoClient = require('mongodb').MongoClient;
var methodOverride = require('method-override');
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart();
var fs = require('fs');
 var mongo = require('mongodb');
 var Grid = require('gridfs-stream');
    var multer = require('multer');
    var GridFsStorage = require('multer-gridfs-storage');
GridStore = require('mongodb').GridStore;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
}));

const util = require('util')
// and so is assert
const assert = require('assert');

// We want to extract the port to publish our app on
//var port = process.env.PORT || 8080;
// Then we'll pull in the database client library
//var MongoClient = require("mongodb").MongoClient;

var cfenv = require('cfenv');
var appenv = cfenv.getAppEnv();

//var fs = require("fs");
//var db = require('mongodb').db,
//  Server = require('mongodb').Server;
//const MongoClient = require('mongodb').MongoClient;

// Within the application environment (appenv) there's a services object
var services = appenv.services;

// The services object is a map named by service so we extract the one for MongoDB
var mongodb_services = services["compose-for-mongodb"];
//console.log("we are here");

if (!process.env.VCAP_SERVICES) {
  // Now lets get cfenv and ask it to parse the environment variable
  //console.log("inside vcaps");
  // get info from local vcap-local.json
  var env = JSON.parse(fs.readFileSync("vcap-local.json", "utf-8"));

  for (var service in env) {
    console.log("inside for" + JSON.stringify(env[service]));
    //find the IoT Service


    if (service === "compose-for-mongodb") {
      console.log("env" + env["compose-for-mongodb"]);
      mongodb_services = env["compose-for-mongodb"];
      break;
    }
  }
}


// This check ensures there is a services for MongoDB databases
assert(!util.isUndefined(mongodb_services), "Must be bound to compose-for-mongodb services");

// We now take the first bound MongoDB service and extract it's credentials object
var credentials = mongodb_services[0].credentials;
//
// Within the credentials, an entry ca_certificate_base64 contains the SSL pinning key
// We convert that from a string into a Buffer entry in an array which we use when
// connecting.
var ca = [new Buffer(credentials.ca_certificate_base64, 'base64')];

// This is a global variable we'll use for handing the MongoDB client around
var db; //= MongoClient.connection.db;;
//var mongoDriver = MongoClient.mongo;
//var storage;

// This is the MongoDB connection. From the application environment, we got the
// credentials and the credentials contain a URI for the database. Here, we
// connect to that URI, and also pass a number of SSL settings to the
// call. Among those SSL settings is the SSL CA, into which we pass the array
// wrapped and now decoded ca_certificate_base64,
MongoClient.connect(credentials.uri, {
    mongos: {
      ssl: true,
      sslValidate: true,
      sslCA: ca,
      poolSize: 1,
      reconnectTries: 1
    }
  },
  function(err, db) {
    if (err) {} else {
      console.log(err);
      console.log("type of=", typeof(db));
      console.log("success connection")
      db = db.db("DATABASE");
}
})

// // //require("cf-deployment-tracker-client").track();
// // module.exports = Initdb;
module.exports.db = db;

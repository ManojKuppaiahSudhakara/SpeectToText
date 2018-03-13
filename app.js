var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var someTime = require('unix-time');
var error = require('./src/app/utils/Error');
var config = require('./routes/config');
var db = require('./utils/Initdb');
var InitMdb = require('./utils/STT/InitMdb');
var index = require('./routes/index');
var api_routes = require('./routes/api');
var fupload_routes = require('./routes/STT/fupload');
var delete_routes =require('./routes/STT/delete');
var convert_routes =require('./routes/STT/convert');
var transcribe_routes =require('./routes/STT/transcribe');
var app = express();

var http_host = (process.env.VCAP_APP_HOST || '0.0.0.0');
var http_port = (process.env.PORT || 7000);

app.set('port', http_port);
app.set('host',http_host);

// view engine setup
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//use favicon
app.use(favicon(__dirname + '/src/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// add session to store the api-key and auth token in the session
app.use(session({secret: 'iotfCloud123456789',saveUninitialized: true,
                 resave: true}));
app.use(require('stylus').middleware(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'src')));


app.use('/config', config);
app.use('/api/v1',index);
app.use('/api/v0002',api_routes);
app.use('/fupload', fupload_routes);
app.use('/delete', delete_routes );
app.use('/convert', convert_routes);
app.use('/transcribe', transcribe_routes);


if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var server = app.listen(app.get('port'), app.get('host'), function() {
  console.log('Express server listening on ' + server.address().address + ':' + server.address().port);
});

module.exports = app;

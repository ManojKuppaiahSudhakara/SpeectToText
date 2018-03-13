
var util = {};

var https = require('https');
var querystring = require('querystring');


var pwd = {
   "demo1":"airosense123",
   "demo2":"airosense234",
   "aditya":"aditya123",
   "neha":"neha123",
   "rajeev":"rajeev123",
   "laksh": "laksh123"
};

util.itb_login = function (username, password){
  console.log('login verification');

  for (var uname in pwd) {
      var value = pwd[uname];
      console.log('login username :' + uname +' value =' + value + ' usergiven=' + password);
      if ((value === password) && (uname === username) ) {
          console.log('login success property =' + username + ' value=' + password);
          return 1;
      }
  }

  console.log('login failure property=' + username + ' value=' + password);
  return 0;
};

module.exports = util;

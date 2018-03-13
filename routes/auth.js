/*******************************************************************************
* Copyright (c) 2014 IBM Corporation and other Contributors.
*
* All rights reserved. This program and the accompanying materials
* are made available under the terms of the Eclipse Public License v1.0
* which accompanies this distribution, and is available at
* http://www.eclipse.org/legal/epl-v10.html
*
* Contributors:
* IBM - Initial Contribution
*******************************************************************************/

var express = require('express');
var router = express.Router();
var util = require('../utils/util');

//login page after a login failure
router.get('/loginfail', function(req, res) {
  res.render('loginfail', { title: 'SpeechToText Login failed, please retry' });
});


router.post('/login', function(req, res) {

  var idToken = randomToken.generate(16)
  console.log(idToken);

  console.log("Logged in using username : "+req.body.username);
  req.session.username = req.body.username;
  req.session.password = req.body.password;
  req.session.idToken = idToken

  console.log("auth: username="+ req.session.username + " password=" + req.session.password);
  console.log("idToken" + req.session.idToken);
  let loginresult = util.itb_login(req.session.username,req.session.password);

  if(loginresult === 1){

       console.log("auth: Login success= "+loginresult);
       res.send({id_token: idToken, userInfo: req.body.username, result : "SUCCESS"});

  }
  else {
    console.log("auth: Login failure=" + loginresult);
    res.status(401).send({ error: 'Invalid credentials' });
  }

});

// Logout the user, then redirect to the home page.
router.post('/logout', function(req, res) {
  req.session.destroy();
  res.redirect('/login');
});

router.get('/logout', function(req, res) {
  req.session.destroy();
  res.redirect('/login');

});

module.exports = router;

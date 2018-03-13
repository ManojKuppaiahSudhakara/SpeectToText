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

//var api_routes = require('./api');
var fupload_routes = require('./STT/fupload');
var convert_routes = require('./STT/convert');
var transcribe_routes = require('./STT/transcribe')
//var dashboard_routes = require('./dashboard');
var auth_routes = require('./auth');
var util = require('../utils/util');
//var fileupload_routes = require('./fileupload');

//all requests come here to validate the if api key is present
//else redirect to login
router.use(function(req, res, next) {

	//set this header, so that there is no browser caching when destroying the session.
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

  console.log("index: api key="+ req.session.api_key + " auth token=" + req.session.auth_token);

	next();
});

//manage login routes
router.use('/',auth_routes);
module.exports = router;

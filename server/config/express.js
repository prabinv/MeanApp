var bodyParser = require('body-parser'),
	express = require('express'),
	morgan  = require('morgan'),
	stylus = require('stylus'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	passport = require('passport');


module.exports = function(app, config) {
	function compile(str, path) {
		return stylus(str).set('filename', path);
	}
	// express configuration
	app.set('views', config.rootPath + '/server/views');
	app.set('view engine', 'jade');
	app.use(morgan());
	app.use(cookieParser());
	app.use(bodyParser());
	app.use(session({secret: 'multi vision uniconrns'}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(stylus.middleware(
		{
			src: config.rootPath + '/public',
			compile: compile
		}
	));
	app.use(express.static(config.rootPath + '/public'));
};
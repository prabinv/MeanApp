var express = require('express'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	configureExpress = require('./server/config/express'),
	configSettings = require('./server/config/config'),
	mongooseConfig = require('./server/config/mongoose'),
	mongoose = require('mongoose'),
	routesConfig = require('./server/config/routes');

var env = process.env.NODE_ENV || 'development';

var app = express();

var config = configSettings[env];

configureExpress(app, config);

mongooseConfig(config);

var User = mongoose.model('User');
passport.use(new LocalStrategy(
	function(username, password, done) {
		User.findOne({userName: username}).exec(function(err, user) {
			console.log('user ' , user);
			if (user && user.authenticate(password)) {
				return done(null, user);
			} else {
				return done(null, false);
			}

		});
	}
));

passport.serializeUser(function(user, done) {
	if(user) {
		done(null, user._id);
	}
});

passport.deserializeUser(function(id, done) {
	User.findOne({_id: id}).exec(function(err, user) {
		if (user) {
			return done(null, user);
		} else {
			return done(null, false);
		}

	});
});

routesConfig(app);

app.listen(config.port);
console.log('Listening on port ' + config.port);
var passport = require('passport');

exports.authenticate = function(req, res, next) {
	var auth = passport.authenticate('local', function(err, user) {
		
		if(err) {
			next(err);
		}

		if(!user) {
			res.send({success: false});
		}

		req.logIn(user, function(err) {
			if(err) next(err);
			res.send({success:true, user: user});
		});
	});

	auth(req, res, next);
};
var auth = require('./auth'),
	mongoose = require('mongoose');

module.exports = function(app) {
	var User = mongoose.model('User');
	app.get('/api/users', auth.requiresApiLogin, auth.requiresRole('admin'), function (req, res) {
		User.find({}).exec(function (err, collection) {
			res.send(collection);
		});
	});

	app.get('/partials/:folder/:partialPath', function(req, res) {
		res.render('../../public/app/' + req.params.folder + '/' + req.params.partialPath);
	});

	app.post('/login', auth.authenticate);
	
	app.post('/logout', function(req, res) {
		req.logout();
		res.send();
	});

	app.get('*', function(req, res) {
		res.render('index', {
			bootstrappedUser: req.user
		});
	});
};

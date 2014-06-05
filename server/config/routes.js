var auth = require('./auth'),
	users = require('../controllers/users');

module.exports = function(app) {
	app.get('/api/users', auth.requiresApiLogin, auth.requiresRole('admin'), users.getUsers);
	app.post('/api/users', users.createUser);

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

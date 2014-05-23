var auth = require('./auth');

module.exports = function(app) {
	app.get('/partials/:folder/:partialPath', function(req, res) {
		res.render('../../public/app/' + req.params.folder + '/' + req.params.partialPath);
	});

	app.post('/login', auth.authenticate);

	app.get('*', function(req, res) {
		res.render('index');
	});
};

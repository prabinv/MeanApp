var bodyParser = require('body-parser'),
	express = require('express'),
	stylus = require('stylus'),
	morgan  = require('morgan');

var env = process.env.NODE_ENV || 'development';

var app = express();

function compile(str, path) {
	return stylus(str).set('filename', path);
}

// express configuration
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(morgan());
app.use(bodyParser());
app.use(stylus.middleware(
	{
		src: __dirname + '/public',
		compile: compile
	}
));
app.use(express.static(__dirname + '/public'));

app.get('/partials/:partialPath', function(req, res) {
	res.render('partials/' + req.params.partialPath);
});

app.get('*', function(req, res) {
	res.render('index');
});

var port = process.env.PORT || 3030;
app.listen(port);

console.log('Listening on port ' + port);
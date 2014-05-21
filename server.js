var bodyParser = require('body-parser'),
	express = require('express'),
	mongoose = require('mongoose'),
	morgan  = require('morgan'),
	stylus = require('stylus');

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

if (env === 'development') {
	mongoose.connect('mongodb://localhost/multivision');
} else {
	mongoose.connect('mongodb://mvadmin:multivision@ds047468.mongolab.com:47468/multivision');
}

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error....'));
db.once('open', function callback() {
	console.log('multivision db opened');
});

app.get('/partials/:partialPath', function(req, res) {
	res.render('partials/' + req.params.partialPath);
});

app.get('*', function(req, res) {
	res.render('index');
});

var port = process.env.PORT || 3030;
app.listen(port);

console.log('Listening on port ' + port);
var express = require('express'),
	passportConfig = require('./server/config/passport'),
	configureExpress = require('./server/config/express'),
	configSettings = require('./server/config/config'),
	mongooseConfig = require('./server/config/mongoose'),
	routesConfig = require('./server/config/routes');

var env = process.env.NODE_ENV || 'development';

var app = express();

var config = configSettings[env];

configureExpress(app, config);

mongooseConfig(config);

passportConfig();

routesConfig(app);

app.listen(config.port);
console.log('Listening on port ' + config.port);
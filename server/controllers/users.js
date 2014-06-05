var encryption = require('../utilities/encryption');

exports.getUsers = function (req, res) {
    var User = require('mongoose').model('User');
    User.find({}).exec(function (err, collection) {
        res.send(collection);
    });
};

exports.createUser = function(req, res) {
    var User = require('mongoose').model('User');
    var userData = req.body;
    userData.username = userData.username.toLowerCase();
    userData.salt = encryption.createSalt();
    userData.hashed_pwd = encryption.hashPwd(userData.salt, userData.password);
    User.create(userData, function(err, user) {

        if (err) {
            if(err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate user name');
            }
            res.status(400);
            return res.send({reason: err.toString()});
        }
        req.logIn(user, function(err) {
            if(err) {
                return next(err);
            }
            res.send(user);
        });
    });
};
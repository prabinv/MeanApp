var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    firstName: { type: String, required:'{PATH} is required' },
    lastName: { type: String, required:'{PATH} is required' },
    username: {
        type: String,
        required:'{PATH} is required',
        unique: true
    },
    salt: { type: String, required:'{PATH} is required' },
    hashed_pwd: { type: String, required:'{PATH} is required' },
    roles: [String]
});

userSchema.methods = {
    authenticate: function(passwordToMatch) {
        return encryption.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    }
};

var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
    User.find({}).exec(function(err, collection) {
        if(collection.length === 0) {
            var salt, hash;
            salt = encryption.createSalt();
            hash = encryption.hashPwd(salt, 'joe');
            User.create({firstName: 'Joe', lastName: 'Smith', username: 'joe', salt: salt, hashed_pwd: hash, roles: ["admin"]});
            salt = encryption.createSalt();
            hash = encryption.hashPwd(salt, 'jane');
            User.create({firstName: 'Jane', lastName: 'Doe', username: 'jane', salt: salt, hashed_pwd: hash, roles: []});
            salt = encryption.createSalt();
            hash = encryption.hashPwd(salt, 'dwang');
            User.create({firstName: 'David', lastName: 'Wang', username: 'dwang', salt: salt, hashed_pwd: hash});
        }
    });
}

exports.createDefaultUsers = createDefaultUsers;
const {mongoose} = require('../db/mongoose');

var User = mongoose.model('User', {
    email: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
});

module.exports = { User };
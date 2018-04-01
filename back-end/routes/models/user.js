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
    location: {
        type: String
    },
    country: {
        type: String
    },
    img: {
        data: Buffer, 
        contentType: String
    }, 
    phone: {
        type: Number
    }
});

module.exports = { User };
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
    dob: {
        type: String
    },
    location: {
        type: String
    },
    country: {
        type: String
    },
    phone: {
        type: Number
    },
    img: {
        data: Buffer, 
        contentType: String
    }
});

module.exports = { User };
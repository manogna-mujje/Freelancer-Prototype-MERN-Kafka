const {mongoose} = require('../db/mongoose');

var Bid = mongoose.model('Bid', {
    bidder: {
        type: String
    },
    bidAmount: {
        type: Number
    },
    biddingProjectName: {
        type: String
    }
});

module.exports = { Bid };
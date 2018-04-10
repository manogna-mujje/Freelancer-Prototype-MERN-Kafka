// Add MongoDB connections
const MongoClient = require('mongodb').MongoClient;
var mongoURL = 'mongodb://localhost:27017/Freelancer';

export const collection = MongoClient.connect(mongoURL, function (err, db) {
    if(err) {
      console.log("Unable to connect to MongoDB");
    } else {
      console.log("Connected to MongoDB");
      return db.collection('freelancer')
    }
});
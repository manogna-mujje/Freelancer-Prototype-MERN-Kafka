

// Add additional topic handlers
var login = require('./services/login');
var signup = require('./services/signup');
var profileUpdate = require('./services/update-profile');
var postProject = require('./services/post-project');
var postBid = require('./services/post-bid');
var showProjects = require('./services/projects');
var bids = require('./services/bids');
var projectDetails = require('./services/projectDetails');
var postBid = require('./services/post-bid');
var persistedLogin = require('./services/persisted-login.js');
var hire = require('./services/hire');
var payment = require('./services/payment');
var withdrawl = require('./services/withdrawl');
var payTransfer = require('./services/pay-transfer');
var txnHistory = require('./services/transaction-history');
var myBids = require('./services/myBids');
var myProjects = require('./services/myProjects')


// Add MongoDB connections
const MongoClient = require('mongodb').MongoClient;

// Local MongoDB connection
// var mongoURL = 'mongodb://localhost:27017/Freelancer';

// Cloud MongoDB connection on  mLab
 var mongoURL = 'mongodb://admin:password@ds139342.mlab.com:39342/freelancer';

var collection;

console.log('Mongo Connection:')
console.log(collection);
MongoClient.connect(mongoURL, function (err, db) {
    if(err) {
      console.log("Unable to connect to MongoDB");
    } else {
      console.log("Connected to MongoDB");
      collection = db.collection('freelancer');
    }
});

var connection =  new require('./kafka/Connection');
var consumer = connection.getConsumer('Authentication');
var producer = connection.getProducer();


// Add additional topics
consumer.addTopics(['profileUpdate', 'showProjects', 'postProject', 'hire','postBid', 'payment', 'withdrawl', 'payTransfer','anyRequest'], function (err, added) {
    if(err) {
        console.log(`AddTopics Error: ${err}`);
    } else if(added){
        console.log(`Topics added: ${added}`);
    }});

console.log('Kafka backend server is running');


consumer.on('error', function (err) {
    console.log(`Error: ${err}`);
})

// consumer.pause();



// consumer.on('offsetOutOfRange', function (err) {
//     console.log(`Offset Error: ${JSON.stringify(err)}`);
// })
// Handle OffsetOutOfRange
var kafka = require('kafka-node');
var Client = kafka.Client;
var Offset = kafka.Offset;
var client = new Client('localhost:2181');
var offset = new Offset(client);

let topic = 'Authentication' || 'profileUpdate'|| 'showProjects'|| 'postProject'||'hire' || 'postBid' || 'payment'|| 'withdrawl'|| 'payTransfer' || 'anyRequest';

consumer.on('offsetOutOfRange', function (topic) {
    console.log('offsetOutOfRange Error')
    topic.maxNum = 2;
    offset.fetch([topic], function (err, offsets) {
      if (err) {
        return console.error(err);
      }
      var min = Math.min.apply(null, offsets[topic.topic][topic.partition]);
      consumer.setOffset(topic.topic, topic.partition, min);
    });
  });
  

// consumer.close(true, ()=>{
//     console.log('loginConsumer closed!')
// });

consumer.on('message',  (message) => {
    console.log('Received message on Topic ');
    console.log(`data: ${message.value}`)
    var data = JSON.parse(message.value);
    let handler;
    console.log(data.replyTo);
    switch(data.replyTo.slice(0, -9)) {
        case 'Authentication':
            if(data.data.action === 'login'){
                handler = login;
            } else if(data.data.action === 'signup') {
                handler = signup;
            } else {
                handler = persistedLogin;
            }
            break;
        case 'profileUpdate':
            handler = profileUpdate;
            break;
        case 'postProject':
            handler = postProject;
            break;
        case 'postBid':
            handler = postBid;
            break;
        case  'showProjects':
            handler = showProjects;
            break;
        case  'hire':
            handler = hire;
            break;
        case 'anyRequest':
            if(data.data.action === 'show-project-details'){
                handler = projectDetails;
            } else if(data.data.action === 'view-txn-history'){
                handler = txnHistory;
            } else if(data.data.action === 'my-bids'){
                handler = myBids;
            } else if(data.data.action === 'my-projects'){
                handler = myProjects;
            } else {
                handler = bids;
            }
            break;
        case 'postBid':
            handler = postBid;
            break;
        case 'payment':
            handler = payment;
            break;
        case 'withdrawl':
            handler = withdrawl;
            break;
        case 'payTransfer':
            handler = payTransfer;
            break;
        case 'Logs':
            //
            break;
    }
    setTimeout(()=>{
        handler.handle_request(data.data, collection, function(err,res){
            console.log('after handle: %o',res);
            var payloads = [
                { 
                    topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId: data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                if(err){
                    console.log(err);
                } else {
                    console.log('Data sent by Producer: ');
                    console.log(data);
                }
            });
            return;
        });
    }, 700);
        
});

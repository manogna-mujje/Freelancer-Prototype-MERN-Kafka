var connection =  new require('./kafka/Connection');
var consumer = connection.getConsumer('Authentication');
var producer = connection.getProducer();


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


// Add MongoDB connections
const MongoClient = require('mongodb').MongoClient;
var mongoURL = 'mongodb://localhost:27017/Freelancer';

var collection;

MongoClient.connect(mongoURL, function (err, db) {
    if(err) {
      console.log("Unable to connect to MongoDB");
    } else {
      console.log("Connected to MongoDB");
      collection = db.collection('freelancer');
    }
});

// consumer.commit(function(err, data) {
//     if(err)
//         console.log(err);
//     console.log(data);
// });

// Add additional topics
consumer.addTopics(['profileUpdate', 'showProjects', 'postProject', 'hire','postBid', 'anyRequest'], function (err, added) {
    if(err) {
        console.log(`AddTopics Error: ${err}`);
    } else if(added){
        console.log(`Topics added: ${added}`);
    }});

console.log('Kafka backend server is running');


setTimeout(()=>{
    console.log(consumer.ready);
},1000)

consumer.on('error', function (err) {
    console.log(`Error: ${err}`);
})

// consumer.pause();



consumer.on('offsetOutOfRange', function (err) {
    console.log(`Offset Error: ${JSON.stringify(err)}`);
})

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
            } else {
                handler = bids;
            }
            break;
        case 'postBid':
            handler = postBid;
            break;
        case 'Logs':
            //
            break;
    }

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
});

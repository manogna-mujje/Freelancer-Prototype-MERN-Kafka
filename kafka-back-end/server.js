var connection =  new require('./kafka/Connection');
var consumer = connection.getConsumer('Admission');
var producer = connection.getProducer();
var login = require('./services/login');
var signup = require('./services/signup');
var profile = require('./services/profile');

// var admission = require('./topics/topic');

consumer.addTopics([{ topic: 'update-profile', offset: 0 }], function (err, added) {
    if(err) {
        console.log(`addTopics Error: ${err}`);
    } 
    console.log(`Topics added: ${added}`);
    }, true);

console.log('Kafka backend server is running');
consumer.on('message', function (message) {
    console.log('Received message on Topic ');
    var data = JSON.parse(message.value);
    let handler;
    console.log(data.replyTo);
    switch(data.replyTo.slice(0, -9)) {
        case 'Admission':
            // topic.topic(data, 'Admission');
            if(data.data.action === 'login'){
                handler = login;
            } else {
                handler = signup;
            }
            break;
        case 'update-profile':
            handler = profile;
            break;
        case 'Logs':
            //
            break;
    }
    handler.handle_request(data.data, function(err,res){
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

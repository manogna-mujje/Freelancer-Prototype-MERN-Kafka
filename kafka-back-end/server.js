var connection =  new require('./kafka/Connection');
var login = require('./services/login');
var signup = require('./services/signup');

var consumer = connection.getConsumer('Admission');
var producer = connection.getProducer();

console.log('Kafka backend server is running');
consumer.on('message', function (message) {
    console.log('Received message on Admission Topic ');
    var data = JSON.parse(message.value);
    console.log(data.data.action);
    let handler;
    if(data.data.action === 'login'){
        handler = login;
    } else {
        handler = signup;
    }
    handler.handle_request(data.data, function(err,res){
        console.log('after handle: %o',res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

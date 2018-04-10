var kafka = require('kafka-node');

function ConnectionProvider() {
    this.getConsumer = function(topic_name) {
        if (!this.kafkaConsumerConnection) {
            this.client = new kafka.Client("localhost:2181");
            this.kafkaConsumerConnection = new kafka.Consumer(this.client,
                [ { topic: topic_name, partition: 0 }], {fromOffset: false, autoCommit: true}
                );
            // offset = new kafka.Offset(this.client);
            this.client.on('ready', function () { console.log('Kafka backend client ready!') })
            // offset.fetch([
            //     { topic: 'Admission', partition: 0, time: Date.now(), maxNum: 1 }
            // ], function (err, data) {
            //     if(err)
            //         console.log(err);
            //     // data
            //     console.log(data);
            // });
        }
        return this.kafkaConsumerConnection;
    };

    //Code will be executed when we start Producer
    this.getProducer = function() {

        if (!this.kafkaProducerConnection) {
            this.client = new kafka.Client("localhost:2181");
            var HighLevelProducer = kafka.HighLevelProducer;
            this.kafkaProducerConnection = new HighLevelProducer(this.client);
            //this.kafkaConnection = new kafka.Producer(this.client);
            console.log('Kafka backend producer ready');
        }
        return this.kafkaProducerConnection;
    };
}
exports = module.exports = new ConnectionProvider;
var kafka = require('kafka-node');

function ConnectionProvider() {
    this.getConsumer = function(topic_name) {
        console.log('Consumer Connection status:');
        console.log(this.kafkaConsumerConnection);
        // if (!this.kafkaConsumerConnection) {
            console.log('Consumer if block');
            this.client = new kafka.Client("localhost:2181");
            this.kafkaConsumerConnection = new kafka.Consumer(this.client,
                [ { topic: topic_name, partition: 0 }], {fromOffset: false, autoCommit: true} );
            this.client.on('ready', function () { console.log('Backend client ready!') })
        // }
        return this.kafkaConsumerConnection;
    };

    //Code will be executed when we start Producer
    this.getProducer = function(topic_name) {

        // if (!this.kafkaProducerConnection) {
            this.client = new kafka.Client("localhost:2181");
            var HighLevelProducer = kafka.HighLevelProducer;
            this.kafkaProducerConnection = new HighLevelProducer(this.client);
            //this.kafkaConnection = new kafka.Producer(this.client);
            console.log('Backend producer ready');
        // }
        return this.kafkaProducerConnection;
    };
}
exports = module.exports = new ConnectionProvider;
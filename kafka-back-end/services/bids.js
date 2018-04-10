// var {Bid} = require('./models/bid');

function handle_request(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    Bid.find({
        projectName: msg.projectName
    }).then((docs) => {
        console.log(docs);
        // res.status(200).send(docs);
        res.code = 200;
        res.value = docs;
    }).catch((err) => {
        res.code = 400;
        res.value = err;
    })
    setTimeout(()=>{
        callback(null, res);
      }, 500);
}



exports.handle_request = handle_request;
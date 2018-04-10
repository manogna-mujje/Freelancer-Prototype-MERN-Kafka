
function handle_request(msg, collection, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    collection.find({username: msg.username}).toArray((err, doc) => {
      if (err) {
        console.log(err);
        res.code = "400";
        res.value = "Failed Login";
        return;
      }
      if(msg.username == doc[0].username && msg.password == doc[0].password)
          res.code = "200";
          res.user = doc[0];
          res.value = "Success Login";
    })
      setTimeout(()=>{
        console.log(`res: ${JSON.stringify(res)}`)
        callback(null, res);
      }, 500);
}

exports.handle_request = handle_request;
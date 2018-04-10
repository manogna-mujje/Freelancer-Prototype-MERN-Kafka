function handle_request(msg, collection, callback){
    console.log('PERSISTED_LOGIN HANDLE REQUEST');
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    collection.find({_id: msg.id}).toArray((err, doc) => {
      if (err) {
        console.log(err);
        res.code = "400";
        res.value = "Failed Persisted Login";
        return;
      }
      if(doc )
          res.code = "200";
          res.value = doc;
    })
      setTimeout(()=>{
        console.log(`res: ${JSON.stringify(res)}`)
        callback(null, res);
      }, 500);
}

exports.handle_request = handle_request;
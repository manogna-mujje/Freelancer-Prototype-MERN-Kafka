function handle_request(msg, collection, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    collection.findOneAndUpdate(
    { username: msg.username}, 
    { $inc: 
      {
        amount: parseInt(msg.amount)
      },
      $currentDate: { lastAdded: true }
    }, (err, doc) => {
      if(err) {
        res.code = 400;
        res.value = err;
      }
      console.log(doc);
      res.code = 200;
      res.value = 'Amount credited successfully';
    });
      setTimeout(()=>{
        callback(null, res);
      }, 500);
}

exports.handle_request = handle_request;

function handle_request(msg, collection, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    collection.findOneAndUpdate(
    { username: msg.user }, 
    { $set: {
      location : msg.location, 
      country : msg.country, 
      firstName : msg.firstName, 
      lastName : msg.lastName, 
      phone : msg.phone
      }
    }, {
      upsert: false
    }, (err, doc) => {
      if(err) {
        res.code = 400;
        res.value = err;
      }
      res.code = 200;
      res.value = 'Profile updated';
    });
      setTimeout(()=>{
        callback(null, res);
      }, 500);
}

exports.handle_request = handle_request;
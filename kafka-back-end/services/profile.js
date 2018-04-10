var {User} = require('./models/user');

function handle_request(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    User.findOne({ username: msg.user },
     (err, doc) => {
      if(err) {
        res.code = 400;
        res.value = err;
      }
      res.code = 200;
      res.value = 'Profile updated';
    })
      setTimeout(()=>{
        callback(null, res);
      }, 500);
}

exports.handle_request = handle_request;
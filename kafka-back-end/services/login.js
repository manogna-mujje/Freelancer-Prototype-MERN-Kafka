var {User} = require('./models/user');
var {Project} = require('./models/project');
var {Bid} = require('./models/bid');

function handle_request(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    User.find({username: msg.username}).then((doc) => {
        console.log(doc[0].username);
        if(msg.username == doc[0].username && msg.password == doc[0].password){
            res.code = "200";
            res.value = "Success Login";
        }
        else{
            res.code = "401";
            res.value = "Failed Login";
        }
      });
      setTimeout(()=>{
        callback(null, res);
      }, 500);
}

exports.handle_request = handle_request;
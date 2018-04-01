var {User} = require('./models/user');
var {Project} = require('./models/project');
var {Bid} = require('./models/bid');

function handle_request(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    // User.insert({username: msg.username, password: msg.password}).then((doc) => {
    //     console.log(doc[0]);
    //     res = doc[0];
    //   });
    var newUser = new User({
        username: msg.username,
        password: msg.password
    });
    newUser.save().then((doc) => {
        // res.status(200).send(doc);
        res.code = "200";
        res.value = "Success Signup";
    }, (e) => {
        // res.status(400).send(e);
        res.code = "401";
        res.value = "Failed Signup";
    });
      setTimeout(()=>{
        callback(null, res);
      }, 500);
}

exports.handle_request = handle_request;
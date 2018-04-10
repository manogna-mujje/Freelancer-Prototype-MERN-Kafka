
function handle_request(msg, collection, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    collection.insert({
        username: msg.username,
        password: msg.password
    }, function(err, doc){
        console.log(doc);
        if(err){
            res.code = 401;
            res.value = "Failed Signup";
            return;
        } else if(doc){
            console.log(doc);
            res.code = 200;
            res.value = "Success Signup";
        }
    });
    setTimeout(()=>{
        callback(null, res);
    }, 500);
}

exports.handle_request = handle_request;
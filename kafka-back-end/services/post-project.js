
function handle_request(msg, collection, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    var newProject = {
        name: msg.name,
        description: msg.description,
        skills: msg.skills,
        budget: msg.budget,
        owner: msg.owner,
        status: "open"
      };
      collection.update(
        { username: msg.user }, 
        { $push: {
            postedProjects: {
                $each: [ newProject ]
            }
          }
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
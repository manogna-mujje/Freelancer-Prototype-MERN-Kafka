
function handle_request(msg, collection, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    console.log(msg.employer);    
      collection.update(
            { username: msg.employer, "postedProjects.name": msg.project}, 
            { $push : 
                {
                   "postedProjects.$.hired": 
                  { 
                    "freelancer": msg.freelancer, 
                    "bidAmount": msg.bidAmount
                  }
                },
                $set : 
                {
                    "postedProjects.$.status" : "closed"
                }
            },
            (err, doc) => {
                console.log(`Post-Bid Data - ${doc}`);
                if(err) {
                    res.code = 400;
                    res.value = err;
                }
                res.code = 200;
                res.value = 'Freelancer hired successfully';
                }
        );
  
      setTimeout(()=>{
        callback(null, res);
      }, 500);
    }
  
  exports.handle_request = handle_request;

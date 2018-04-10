
function handle_request(msg, collection, callback){
  var res = {};
  console.log("In handle request:"+ JSON.stringify(msg));
  console.log(msg.employer);
  // collection.update({username: msg.employer, "postedProjects.name": "Build a large-scale Fandango Website"}, {$set : {"postedProjects.$.bids": {"bidder": "test", "bidAmount": 1000}}})
    collection.update(
      {username: msg.employer, "postedProjects.name": msg.projectName}, 
      { $push : 
          {
             "postedProjects.$.bids" : 
            { 
              "bidder": msg.bidder, 
              "bidAmount": msg.bidAmount 
            }
          }
      },
      (err, doc) => {
        console.log(`Post-Bid Data - ${doc}`);
        if(err) {
          res.code = 400;
          res.value = err;
        }
        res.code = 200;
        res.value = 'Bid posted successfully';
      }
    );

    setTimeout(()=>{
      callback(null, res);
    }, 500);
  }

exports.handle_request = handle_request;
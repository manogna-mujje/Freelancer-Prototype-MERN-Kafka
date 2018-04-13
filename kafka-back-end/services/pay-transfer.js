
function handle_request(msg, collection, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    console.log(msg.employer);    
      collection.update(
            { username: msg.employer, "postedProjects.name": msg.project}, 
            { $set : 
                {
                   "postedProjects.$.paymentStatus": "done",
                   "postedProjects.$.status": "closed"
                }
            },
            (err, doc) => {
                console.log(`Transaction Data - ${doc}`);
                if(err) {
                    res.code = 400;
                    res.value = err;
                    return;
                }
                res.code = 200;
                res.value = 'Payment done successfully';
                console.log('Payment done successfully');
                }
        );
        
    let projects = 'assignedProjects.'+msg.project+'.paymentStatus';
    var result = {};
      console.log(projects);
      collection.update(
        { username: msg.freelancer }, 
        { $set: 
            {
                [projects]: "done"
            }
        }, 
        (err, doc) => {
          if(err) {
            result.code = 400;
            result.value = err;
            return;
          }
          result.code = 200;
          result.value = 'Profile updated';
          console.log('Freelancer profile updated');
          console.log(`Transaction Data - ${doc}`);
        });

        setTimeout(()=>{
            if(res.code === 200 && result.code === 200 ){
              callback(null, res);
            }
          }, 500);
    }
  
  exports.handle_request = handle_request;


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
                    "postedProjects.$.status" : "hired"
                }
            },
            (err, doc) => {
                console.log(`Employer project status Data - ${doc}`);
                if(err) {
                    res.code = 400;
                    res.value = err;
                    result;
                }
                res.code = 200;
                res.value = 'Freelancer hired successfully';
                console.log('Employer hired freelancer successfully');
                }
                
        );

    var result = {};
      let projects = 'assignedProjects.'+msg.project;
      collection.update(
        { username: msg.freelancer }, 
        { $set: {
          [projects] : {
              project: msg.project,
              employer: msg.employer,
              bidAmount: msg.bidAmount
            }
          }
        }, (err, doc) => {
          console.log(`Freelancer project status Data - ${doc}`);
          if(err) {
            result.code = 400;
            result.value = err;
            result;
          }
          result.code = 200;
          result.value = 'Profile updated';
          console.log('Freelancer profile updated');
        });

        
          setTimeout(()=>{
            if(res.code === 200 && result.code === 200 ){
              callback(null, res);
            }
          }, 500);
    }
  
  exports.handle_request = handle_request;

function handle_request(msg, collection, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    console.log(-parseInt(msg.amount))
    collection.update(
        { username: msg.username}, 
        { $inc: 
          {
            amount: -parseInt(msg.amount)
          },
           $currentDate: { lastWithdrawn: true }
        },(err, doc) => {
            if(err) {
              res.code = 400;
              res.value = err;
            }
            console.log(doc);
            res.code = 200;
            res.value = 'Amount debited successfully';
          });
            setTimeout(()=>{
              callback(null, res);
            }, 500);
      }
      
      exports.handle_request = handle_request;

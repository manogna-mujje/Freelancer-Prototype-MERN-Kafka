function handle_request(msg, collection, callback){
    var res = {},  value = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    collection.find({'postedProjects.name': msg.project}, {'postedProjects.$.name' : 1}).toArray((err, docs) => {
        if(err) {
            res.code = 400;
            res.value = 'Unable to fetch Projects';
            return;
        }
        console.log(`Query docs: ${JSON.stringify(docs)}`);
        docs[0].postedProjects.forEach((item)=>{
            if(item.name ===  msg.project) {
                res.value = {
                    amount: item.hired[0].bidAmount,
                    freelancer: item.hired[0].freelancer,
                    lastTransferred: item.lastTransferred
                }
            }
        })
        res.code = 200;
    })
    setTimeout(()=>{
        callback(null, res);
      }, 500);
}


exports.handle_request = handle_request;
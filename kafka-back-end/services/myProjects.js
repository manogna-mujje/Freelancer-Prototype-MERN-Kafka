function handle_request(msg, collection, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg.project));
    collection.find({  
        username : msg.username
        }).toArray((err, docs) => {
        if(err) {
            res.code = 400;
            res.value = 'Unable to fetch my bids';
            return;
        }
        console.log('DATABASE RESPOSNE: ');
        console.log(`Query docs: ${JSON.stringify(docs[0].postedProjects)}`);
        
        res.code = 200;
        res.value = docs[0].postedProjects;
    })
    setTimeout(()=>{
        callback(null, res);
      }, 500);
}


exports.handle_request = handle_request;
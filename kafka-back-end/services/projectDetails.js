function handle_request(msg, collection, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    collection.find({'postedProjects.name': msg.project}, {'postedProjects.$.name' : 1}).toArray((err, docs) => {
        if(err) {
            res.code = 400;
            res.value = 'Unable to fetch Projects';
            return;
        }
        console.log(`Query docs: ${JSON.stringify(docs)}`);
        res.code = 200;
        res.value = docs[0];
    })
    setTimeout(()=>{
        callback(null, res);
      }, 500);
}


exports.handle_request = handle_request;
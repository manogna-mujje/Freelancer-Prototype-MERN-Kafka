function handle_request(msg, collection, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    collection.find({'postedProjects.name': 'Lorem Ipsum'}).toArray((err, docs) => {
        if(err) {
            res.code = 400;
            res.value = 'Unable to fetch Projects';
            return;
        }
        res.code = 200;
        res.value = docs[0].postedProjects;
    })
    setTimeout(()=>{
        callback(null, res);
      }, 500);
}


exports.handle_request = handle_request;
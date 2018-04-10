
function handle_request(msg, collection, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    collection.find({postedProjects:{$exists: true}}, {postedProjects : 1}).toArray((err, docs) => {
        if(err) {
            res.code = 400;
            res.value = 'Unable to fetch Projects';
            return;
        }
        console.log(docs);
        var projects = [];
        docs.forEach(function(element) {
            console.log(element.postedProjects);
            projects = projects.concat(element.postedProjects);
          });

          console.log(projects);
        // res.status(200).send(docs);
        res.code = 200;
        res.value = (projects);
    })
    setTimeout(()=>{
        callback(null, res);
      }, 500);
}


exports.handle_request = handle_request;
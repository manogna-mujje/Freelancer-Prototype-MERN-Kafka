function handle_request(msg, collection, callback){
    var res = {
        value: []
    };
    console.log("In handle request:"+ JSON.stringify(msg.project));
    collection.find({  
        'postedProjects.bids.bidder' : msg.username
        }).toArray((err, docs) => {
        if(err) {
            res.code = 400;
            res.value = 'Unable to fetch my bids';
            return;
        }
        console.log(`Query docs: ${JSON.stringify(docs)}`);
    
        docs.forEach((doc)=> {
            doc.postedProjects.forEach((project)=>{
                project.bids.forEach((bid)=>{
                    if(bid.bidder === msg.username){
                        res.value.push(project);
                    }
                })
            })
        })

        res.code = 200;
    })
    setTimeout(()=>{
        callback(null, res);
      }, 500);
}


exports.handle_request = handle_request;
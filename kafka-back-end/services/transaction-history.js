function handle_request(msg, collection, callback){
    var res = {
        outValue:  [],
        inValue:  [],
        outAmount: 0,
        inAmount: 0
    };
    console.log("In handle request:"+ JSON.stringify(msg));
    collection.find({$and: [{username: msg.username, 'postedProjects.lastTransferred' : {$exists : true}}]}).toArray((err, docs) => {
        if(err) {
            res.outCode = 400;
            res.outValue = 'Unable to fetch Projects';
            return;
        }
        console.log(`Query docs: ${JSON.stringify(docs)}`);
        docs.forEach(function(doc) {
            doc.postedProjects.forEach((item)=>{
                if('lastTransferred' in item){
                    res.outAmount = res.outAmount + item.hired[0].bidAmount;
                    res.outValue.push({
                        project: item.name,
                        amount: item.hired[0].bidAmount,
                        freelancer: item.hired[0].freelancer,
                        lastTransferred: item.lastTransferred
                    }) 
                }
            })
        });
        res.outCode = 200;
    })

    collection.find({username: msg.username}).toArray((err, docs) => {
        if(err) {
            res.inCode = 400;
            res.inValue = 'Unable to fetch Projects';
            return;
        }
        console.log(`Query docs: ${JSON.stringify(docs)}`);
        let obj = docs.assignedProjects;
        for (var docKey in docs) {
            if (docs.hasOwnProperty(docKey)) {
                console.log('I AM A VERY GOOD GIRL...VINNANAVA MR.....MY DEAR BROTHER');
                console.log(typeof(docs[docKey]));
                console.log(docs[docKey].assignedProjects);
                let projects = docs[docKey].assignedProjects;
                for(var key in projects){
                    if (projects.hasOwnProperty(key)) {
                        res.inAmount = res.inAmount + projects[key].bidAmount;
                        res.inValue.push({
                            project: projects[key].project,
                            amount: projects[key].bidAmount,
                            employer: projects[key].employer,
                            lastTransferred: projects[key].lastTransferred
                        }) 
                    }
                }
            }
        }
        
        res.inCode = 200;
    })

    setTimeout(()=>{
        if(res.inCode === 200 && res.outCode === 200 ){
            res.code = 200;
          callback(null, res);
        }
      }, 500);
}


exports.handle_request = handle_request;
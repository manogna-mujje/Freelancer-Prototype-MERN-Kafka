var express = require('express');
var path = require("path");
var {User} = require('./models/user');
var {Project} = require('./models/project');
var {Bid} = require('./models/bid');
var passport = require('passport');
require('./passport-login')(passport);
var router = express.Router();
var kafka = require('./kafka/client');
var {sendEmail} = require('./email') ;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Server is alive! 1.0');
});

/* Sign up */
router.post('/signup', function(req, res, next){
    kafka.make_request('Authentication', {
    "action": 'signup', 
    "email": req.body.email,
    "username": req.body.username,
    "password": req.body.password
  }, function(err,results){
    console.log('In Kafka: %o', results);
    if(err){
        res.status(500).send();
    } else {
      if(results.code == 200){
        res.status(200).send('Signup successful');
      } else {
        res.status(400).send('Signup failed');
      }
    }
  });
});

/* Login Account */
router.post('/login', function(req, res, next){
  passport.authenticate('login', function(err, user) {
    console.log('Login Response: %o', user);
    if(err) {
        res.status(500).send();
    }
    if(!user) {
        res.status(400).send('Login failed');
    } else {
      req.logIn(user, (err)=> {
        if(err)
          return next(err);
      });
     return res.status(200).send('Login successful');
    }
})(req, res);
});


/* Update a user profile */
router.post('/updateProfile', function(req, res, next){
  console.log('Update profile hit');
  if(!req.isAuthenticated()){
    res.status(401).send('Login unauthorized');
  }
  kafka.make_request('profileUpdate',{
    "user": req.session.passport.user.username,
    "location" : req.body.location, 
    "country" : req.body.country, 
    "firstName" : req.body.firstName, 
    "lastName" : req.body.lastName, 
    "phone" : req.body.phone
  }, function(err,results){
    console.log('In Kafka: %o', results);
    if(err){
      res.send(err).status(results.code);
    }
    else
    {
      res.send(results).status(results.code);
    }
  });
});


/* Upload a profile picture */
router.post('/upload', function(req, res, next){
  console.log('Upload API hit');
  let imageFile = req.files.file;
  imageFile.mv(path.join(`${__dirname}`, '..' , 'public' , `${req.session.passport.user.username}` + '.jpg'), function(err) {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({file: `public/${req.body.filename}.jpg`});
  });
});


/* Post a new Project */
router.post('/postProject', function(req, res, next){
  console.log('Post Project hit');
  kafka.make_request('postProject',{
      "user": req.session.passport.user.username,
      "name": req.body.title,
      "description": req.body.description,
      "skills": req.body.skills,
      "budget": req.body.budget,
      "owner": req.session.passport.user.username
  }, function(err,results){
    console.log('In Kafka: %o', results);
    if(err){
      res.send(err).status(results.code);
    }
    else
    {
      res.send(results).status(results.code);
    }
  });
});

/* Post a new Bid */
router.post('/postBid', function(req, res, next){
  console.log('Post Bid hit');
  console.log(`Checking Owner: ${req.body.employer}`);
  kafka.make_request('postBid',{
    bidder: req.session.passport.user.username,
    bidAmount: req.body.bidAmount,
    projectName: req.body.project,
    employer: req.body.employer,
    bidderEmail: req.body.freelancerEmail
}, function(err,results){
  console.log('In Kafka: %o', results);
    if(err){
      res.send(err).status(results.code);
    }
    else
    {
      res.send(results).status(results.code);
    }
  });
});

/* List all Projects */
router.get('/showProjects', function(req, res, next){
  console.log('Show Projects API hit');
  if (req.isAuthenticated()) {
    kafka.make_request('showProjects',{}, function(err,results){
    console.log('In Kafka: %o', results);
      if(err){
        res.send(err).status(results.code);
      }
      else
      {
        res.send(results.value).status(results.code);
      }
    });
  } 
});

/* List all Bids for a particular project */
router.post('/showBids', function(req, res, next){
  console.log('Show Bids API hit');
  kafka.make_request('anyRequest',{
    action: 'show-bid-details',
    project : req.body.project
  }, function(err,results){
    console.log('In Kafka: %o', results);
      if(err){
        res.send(err).status(results.code);
      }
      else
      {
        res.send(results).status(results.code);
      }
    });
});

/* Retrieve a profile */
router.get('/profile', checkAuth(), function(req, res, next){
    console.log('PROFILE API HIT');
    console.log(req.session.passport.user);
    res.json({user : req.session.passport.user}).status(200);
});

/* Show Project Details */
router.post('/showProjectDetails', function(req, res, next) {
  console.log('Show Project Details API hit.');
  console.log(req.session);
  console.log(req.body.project);
  if (req.isAuthenticated()) {
    kafka.make_request('anyRequest',{
      action: 'show-project-details',
      username: req.session.passport.user.username,
      project : req.body.project
    }, function(err,results){
      console.log('In Kafka: %o', results.value);
        if(err){
          res.send(err).status(results.code);
        }
        else
        {
        /* Convert RowDataPacket into JSON object */
        var string=JSON.stringify(results.value);
        var json =  JSON.parse(string);
        console.log(JSON.stringify(json));
          res.json({
            list: JSON.stringify(json)
          });
        }
      });
  }
}
);

/* Check Session API */
router.get('/checkSession', function(req, res, next){
  console.log('Check Session API hit.')
  if(req.isAuthenticated()) {
    console.log('Session existing')
    res.status(200).json({user: req.session.passport.user});
  }
  else {
    console.log('Error: Session ended')
    throw ('Session already ended.');
    // res.status(400);
  }
});

/* Logout */
router.get('/logout', function(req, res, next) {
  console.log('Logout API hit.');
  if (req.isAuthenticated()) {
    req.logOut();
    req.session.destroy();
    res.status(200).send('Logout success');
  } else {
    res.status(400).send('Already logged out.');
  }
});

/* Hire a freelancer */
router.post('/hireFreelancer', function(req, res, next){
  console.log('Hire freelancer API hit');
  kafka.make_request('hire',{
    freelancer: req.body.freelancer,
    project: req.body.project,
    bidAmount: req.body.bidAmount,
    employer: req.session.passport.user.username
}, function(err,results){
  console.log('In Kafka: %o', results);
    if(err){
      res.send(err).status(results.code);
    }
    else
    {
      sendEmail(req.body.bidderEmail, req.body.project, req.body.freelancer);
      res.send(results).status(results.code);
    }
  });
});

/* Credit Account */
router.post('/creditAccount', function(req, res, next){
  console.log('Credit Account API hit');
  kafka.make_request('payment',{
    username: req.session.passport.user.username,
    amount: req.body.amount
}, function(err,results){
  console.log('In Kafka: %o', results);
    if(err){
      res.send(err).status(results.code);
    }
    else
    {
      res.send(results).status(results.code);
    }
  });
});

/* Debit Account */
router.post('/debitAmount', function(req, res, next){
  console.log('Debit Account API hit');
  console.log(`DEBIT amount: ${req.body.amount}`);
  kafka.make_request('withdrawl',{
    username: req.session.passport.user.username,
    amount: req.body.amount
}, function(err,results){
    if(err){
      res.send(err).status(results.code);
    }
    else
    {
      res.send(results).status(results.code);
    }
  });
});

/* Make Payment */
router.post('/makePayment', function(req, res, next){
  console.log('Make Payment API hit');
  kafka.make_request('payTransfer',{
    employer: req.session.passport.user.username,
    project: req.body.project,
    amount: req.body.amount,
    freelancer: req.body.freelancer
}, function(err,results){
  console.log('In Kafka: %o', results);
    if(err){
      res.send(err).status(results.code);
    }
    else
    {
      res.send(results).status(results.code);
    }
  });
});

/* View Transaction History */
router.get('/viewTransactionHistory', function(req, res, next){
  console.log('View Transaction History API hit');
  if (req.isAuthenticated()) {
    kafka.make_request('anyRequest',{
      action: 'view-txn-history',
      username: req.session.passport.user.username
    }, function(err,results){
    console.log('In Kafka: %o', results);
      if(err){
        res.send(err).status(results.code);
      }
      else
      {
        res.send(results).status(results.code);
      }
    });
  } 
});

/* Get all my Bids */
router.get('/myBids', function(req, res, next){
  console.log('Get all my Bids API hit');
  if (req.isAuthenticated()) {
    kafka.make_request('anyRequest',{
      action: 'my-bids',
      username: req.session.passport.user.username
    }, function(err,results){
    console.log('In Kafka: %o', results);
      if(err){
        res.send(err).status(results.code);
      }
      else
      {
        res.send(results.value).status(results.code);
      }
    });
  } 
});

/* Get all my projects */
router.get('/myProjects', function(req, res, next){
  console.log('Get all my projects API hit');
  if (req.isAuthenticated()) {
    kafka.make_request('anyRequest',{
      action: 'my-projects',
      username: req.session.passport.user.username
    }, function(err,results){
    console.log('In Kafka: %o', results);
      if(err){
        res.send(err).status(results.code);
      }
      else
      {
        res.send(results.value).status(results.code);
      }
    });
  } 
});

function checkAuth() {
    return(req, res, next) => {
      if(req.isAuthenticated()) {
        return next();
      }
      throw ('Session doesn\'t exist.')
    }
}

module.exports = router;


//  ---------------------------------------------------------------------------------------------

/* Signup API without Kafka */

// var newUser = new User({
  //   email: req.body.email,
  //   username: req.body.username,
  //   password: req.body.password
  // });
  // newUser.save().then((doc) => {
  //   res.status(200).send(doc);
  // }, (e) => {
  //   res.status(400).send(e);
  // });

  /* Upload Image to database API  */

  // var imgPath = '/Users/Mango/Desktop/fall.jpg';
  // var fs = require('fs');

  // User.findOne({username: req.session.user}, (err, doc) => {
  //   if(doc) {
  //     doc.img.data = req.files.file.data;
  //     doc.img.contentType = 'image/jpg';
  //     doc.save()
  //     .then((doc) => {
  //       console.log(doc);
  //       res.status(200).send(doc);
  //     }, (e) => {
  //       res.status(400).send(e);
  //     });
  //   } else if(err) {
  //     console.log(err);
  //   }
  // })


  /* Back up */

  // User.findOne({username: req.session.user}, (err, doc) => {
  //   console.log(`Existing Document: ` + `${doc}`);
  //   console.log(`Requested Body: ` + `${JSON.stringify(req.body)}`);
  //   console.log(`country: ` + `${JSON.stringify(req.body.country)}`);
  //   doc.location = req.body.location,
  //   doc.country = req.body.country,
  //   doc.firstName = req.body.firstName,
  //   doc.lastName = req.body.lastName,
  //   doc.phone = req.body.phone,
  //   console.log(`About to update Document: ` + `${doc.location}`);

  //   // // console.log(req);
  //   // doc.img.data = req.files.picture,
  //   // doc.img.contentType = 'image/jpg';
  //   doc.save().then((doc) => {
  //     console.log(`Updated Document: ` + `${doc.location}`);
  //     res.status(200).send(doc);
  //   }, (e) => {
  //     res.status(400).send(e);
  //   });
  // })


  // var newUser = new User({
  //   // email: req.body.email,
  //   firstName: req.body.firstName,
  //   lastName: req.body.lastName,
  //   location: req.body.location,
  //   country: req.body.country,
  //   phone: req.body.phone
  // });
  // newUser.img.data = fs.readFileSync(imgPath);
  // newUser.img.contentType = 'image/jpg';
  // newUser.save().then((doc) => {
  //   res.status(200).send(doc);
  // }, (e) => {
  //   res.status(400).send(e);
  // });
  //  ---------------------------------------------------------------------------------------------
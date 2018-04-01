var express = require('express');
var {User} = require('./models/user');
var {Project} = require('./models/project');
var {Bid} = require('./models/bid');
var passport = require('passport');
require('./passport-login')(passport);
require('./passport-signup')(passport);
var imgPath = '/Users/Mango/Desktop/fall.jpg';
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Server is alive! 1.0');
});

/* Sign up */
router.post('/signup', function(req, res, next){
  passport.authenticate('signup', function(err, user) {
    console.log('Signup Response: %o', user);
    if(err) {
        res.status(500).send();
    }
    if(!user) {
        res.status(400).send('Signup failed');
    } else {
      return res.status(200).send('Signup successful');
    }
})(req, res);
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
      req.session.user = user.username;
      console.log("Session initilized by "+ req.session.user);
      return res.status(200).send('Login successful');
    }
})(req, res);
});

/* Update a user profile */
router.post('/updateProfile', function(req, res, next){
  console.log(req.session);
  console.log(req.session.user);
  // console.log(`Input Country: ` + `${JSON.stringify(req.body.country)}`);
  User.findOneAndUpdate(
    { username: req.session.user  }, 
    { $set: {
      location : req.body.location, 
      country : req.body.country, 
      firstName : req.body.firstName, 
      lastName : req.body.lastName, 
      phone : req.body.phone
      }
    }, (err, doc) => {
      if(err) {
        res.status(400).send(err);
      }
      // console.log(`Updated Document: ` + `${doc}`);
      res.status(200).send(doc);
    } )


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
// ------------------------------------------------------------------------------- //

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
});


/* Upload a file */
router.post('/upload', function(req, res, next){
  console.log('Upload API hit');
  console.log(req.session);
  console.log(req.session.user);
  console.log('read file:');
  console.log(req.files.file);
  User.findOne({username: req.session.user}, (err, doc) => {
    if(doc) {
      doc.img.data = req.files.file.data;
      doc.img.contentType = 'image/jpg';
      doc.save().then((doc) => {
        console.log(doc);
        res.status(200).send(doc);
      }, (e) => {
        res.status(400).send(e);
      });
    } else if(err) {
      console.log(err);
    }
  })
});



/* Post a new Project */
router.post('/addProject', function(req, res, next){
  var newProject = new Project({
    name: req.body.name,
    description: req.body.description,
    skillsRequired: req.body.skills,
    budget: req.body.budget
  });
  newProject.save().then((doc) => {
    res.status(200).send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

/* Post a new Bid */
router.post('/addBid', function(req, res, next){
  var newBid = new Bid({
    bidder: req.body.bidder,
    bidAmount: req.body.bidAmount,
    biddingProjectName: req.body.biddingProjectName
  });
  newBid.save().then((doc) => {
    res.status(200).send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

/* List all Projects */
router.get('/allProjects', function(req, res, next){
  Project.find().then((docs) => {
    console.log(docs);
    res.status(200).send(docs);
  })
});

/* List all Bids for a particular project */
router.get('/allBids', function(req, res, next){
  Bid.findOne({ biddingProjectName: req.body.projectName }, (err, docs) => {
    if(err) {
      return res.send(err);
    }
    res.status(200).send(docs);
  })
});

/* Retrieve a profile */
router.get('/profile', function(req, res, next){
  User.findOne({ username: req.session.user }, (err, doc) => {
    if(err) {
      return res.send(err);
    }
    res.contentType(doc.img.contentType);
    res.status(200).send(doc.img.data);
  })
});

/* Check Session API */

router.get('/checkSession', function(req, res, next){
  console.log('Session API hit.')
  console.log(req.session);
  if(req.session && req.session.user) {
    console.log('Session existing')
    res.status(200).json({user: req.session.user});
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
  console.log(req.session);
  if (req.session && req.session.user) {
    req.session.destroy();
    console.log(req.session);
    res.status(200).send('Logout success');
  } else {
    res.status(400).send('Already logged out.');
  }
 
});

module.exports = router;

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
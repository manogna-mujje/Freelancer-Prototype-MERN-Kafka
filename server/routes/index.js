var express = require('express');
var {User} = require('./models/user');
var {Project} = require('./models/project');
var {Bid} = require('./models/bid');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Server is alive! 1.0');
});

/* Add a new User */
router.post('/addUser', function(req, res, next){
  var newUser = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  });
  newUser.save().then((doc) => {
    res.status(200).send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
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
router.post('/allBids', function(req, res, next){
  Bid.findOne({ biddingProjectName: req.body.projectName }, (err, docs) => {
    if(err) {
      return res.send(err);
    }
    res.status(200).send(docs);
  })
});

module.exports = router;
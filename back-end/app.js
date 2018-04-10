var express = require('express');
var path = require('path');
var logger = require('morgan');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var passport = require('passport');
var index = require('./routes/index');
var session = require("express-session");
var mongoSessionURL = "mongodb://localhost:27017/sessions";
var mongoStore = require("connect-mongo")(session);
var fs = require('fs');

const cors = require('cors');

var fileUpload = require('express-fileupload')

var app = express();


app.set('port', process.env.PORT || 3001);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());

app.use(session({
  secret: "CMPE273_passport",
  resave: false,
  //Forces the session to be saved back to the session store, even if the session was never modified during the request
  saveUninitialized: false, //force to save uninitialized session to db.
  //A session is uninitialized when it is new but not modified.
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 6 * 1000,
  store: new mongoStore({
      url: mongoSessionURL
  })
}));

app.use(passport.initialize());
app.use(passport.session());

//Cross-Origin connection
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
});

app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));

app.use(fileUpload());
app.use('/public', express.static(__dirname + '/public'));
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
 
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

http.createServer(app).listen(app.get('port'), function() {
  console.log('Server is up and running at port ' + app.get('port'));
});

module.exports = app;
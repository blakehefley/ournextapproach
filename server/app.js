var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./database');

var app = express();

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(favicon(path.join(__dirname, '../client/app', 'favicon.ico')));

/**
 * Development Settings
 */
if (app.get('env') === 'development') {
  
  // This will change in production since we'll be using the dist folder
  // This covers serving up the index page
  app.use(express.static(path.join(__dirname, '../client/.tmp')));
  app.use(express.static(path.join(__dirname, '../client/app')));
  app.use(favicon(path.join(__dirname, '../client/app', 'favicon.ico')));

}

/**
 * Production Settings
 */
if (app.get('env') === 'production') {

  // changes it to use the optimized version for production
  app.use(express.static(path.join(__dirname, '/dist')));
  app.use(favicon(path.join(__dirname, '/dist', 'favicon.ico')));

}

/**
 * Routes
 */
var router = require('./router')(app);

// Error Handling
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
});

module.exports = app;

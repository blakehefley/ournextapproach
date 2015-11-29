var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, '../client/app', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());


// catch 404 and forward to error handle
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(express.static(path.join(__dirname, '../client/.tmp')));
  app.use(express.static(path.join(__dirname, '../client/app')));
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

if (app.get('env') === 'production') {
   app.use(express.static(path.join(__dirname, '/dist')));
   app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
		message: err.message,
		error: err
	});
	});
}
// production error handler
// no stacktraces leaked to user
var router = require('.router')(app);

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
});

module.exports = app;

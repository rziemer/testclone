var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var echoRouter = require('./routes/echo');
var deleteRouter = require('./routes/delete');
var insertRouter = require('./routes/insert');
// The line below is incorrect
var updateRouter = require('./routes/updateentry');
// It should read: var updateRouter = require('./routes/update');
// as it needs to match the name of the routes javascript file for the update
//
// As such this causes a build error which prevents 'npm start' from executing
//


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/echo', echoRouter);
app.use('/delete', deleteRouter);
app.use('/insert', insertRouter);
app.use('/update', updateRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
